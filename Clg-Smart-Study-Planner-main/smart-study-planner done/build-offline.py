"""Bundle this app's local ES modules into one classic script for file:// use."""

from __future__ import annotations

import json
import re
import sys
from pathlib import Path, PurePosixPath


ROOT = Path(sys.argv[1]).resolve() if len(sys.argv) > 1 else Path(__file__).resolve().parent
SRC = ROOT / "src"

IMPORT_RE = re.compile(
    r'''(?m)^[ \t]*import\s+(?P<clause>[\s\S]*?)\s+from\s+(?P<quote>["'])(?P<spec>[^"']+)(?P=quote)\s*;[ \t]*(?:\r?\n)?'''
)
STAR_RE = re.compile(
    r'''(?m)^[ \t]*export\s+\*\s+from\s+(?P<quote>["'])(?P<spec>[^"']+)(?P=quote)\s*;[ \t]*(?:\r?\n)?'''
)
NAMED_REEXPORT_RE = re.compile(
    r'''(?m)^[ \t]*export\s*\{(?P<names>[\s\S]*?)\}\s*from\s*(?P<quote>["'])(?P<spec>[^"']+)(?P=quote)\s*;[ \t]*(?:\r?\n)?'''
)
LOCAL_EXPORT_LIST_RE = re.compile(r"(?m)^[ \t]*export\s*\{(?P<names>[\s\S]*?)\}\s*;[ \t]*(?:\r?\n)?")
EXPORT_DECL_RE = re.compile(
    r"(?m)^export[ \t]+(?:(?:async[ \t]+)?(?:const|let|var|function|class))[ \t]+(?P<name>[A-Za-z_$][\w$]*)"
)
EXPORT_PREFIX_RE = re.compile(r"(?m)^([ \t]*)export[ \t]+(?=(?:async[ \t]+)?(?:const|let|var|function|class)\b)")


def js(value: str) -> str:
    return json.dumps(value, ensure_ascii=True)


def names_from_clause(clause: str) -> list[tuple[str, str]]:
    clause = clause.strip()
    result: list[tuple[str, str]] = []
    named = re.search(r"\{([\s\S]*?)\}", clause)
    if named:
        for part in named.group(1).split(","):
            part = part.strip()
            if not part:
                continue
            bits = re.split(r"\s+as\s+", part)
            result.append((bits[0].strip(), bits[-1].strip()))
        clause = (clause[: named.start()] + clause[named.end() :]).strip().strip(",").strip()
    namespace = re.fullmatch(r"\*\s+as\s+([A-Za-z_$][\w$]*)", clause)
    if namespace:
        result.append(("*", namespace.group(1)))
    elif clause:
        result.append(("default", clause.split(",", 1)[0].strip()))
    return result


def exported_names(spec: str) -> list[tuple[str, str]]:
    result: list[tuple[str, str]] = []
    for part in spec.split(","):
        part = part.strip()
        if not part:
            continue
        bits = re.split(r"\s+as\s+", part)
        result.append((bits[0].strip(), bits[-1].strip()))
    return result


def resolve(importer: str, spec: str) -> str:
    if not spec.startswith("."):
        raise ValueError(f"External import is not supported in offline bundle: {importer} -> {spec}")
    target = str(PurePosixPath(importer).parent.joinpath(spec))
    parts: list[str] = []
    for part in target.split("/"):
        if part in ("", "."):
            continue
        if part == "..":
            if not parts:
                raise ValueError(f"Import escapes src/: {importer} -> {spec}")
            parts.pop()
        else:
            parts.append(part)
    normalized = "/".join(parts)
    if not normalized.startswith("src/") or not (ROOT / Path(*normalized.split("/"))).is_file():
        raise FileNotFoundError(f"Could not resolve import: {importer} -> {spec} ({normalized})")
    return normalized


modules: dict[str, dict] = {}
for file_path in sorted(SRC.rglob("*.js")):
    if file_path.name == "app.offline.js":
        continue
    module_id = file_path.relative_to(ROOT).as_posix()
    source = file_path.read_text(encoding="utf-8-sig")
    imports: list[dict] = []
    import_spans: list[tuple[int, int]] = []
    for match in IMPORT_RE.finditer(source):
        dependency = resolve(module_id, match.group("spec"))
        imported = names_from_clause(match.group("clause"))
        imports.append({"dependency": dependency, "bindings": imported})
        import_spans.append(match.span())
    for start, end in reversed(import_spans):
        source = source[:start] + "\n" + source[end:]
    if re.search(r"(?m)^[ \t]*import\s", source):
        raise ValueError(f"Unparsed import in {module_id}")

    local_exports: list[tuple[str, str]] = []
    for match in EXPORT_DECL_RE.finditer(source):
        local_exports.append((match.group("name"), match.group("name")))

    reexports: list[tuple[str, str, str]] = []
    star_dependencies: list[str] = []
    replacements: list[tuple[int, int]] = []
    for match in STAR_RE.finditer(source):
        dependency = resolve(module_id, match.group("spec"))
        star_dependencies.append(dependency)
        replacements.append(match.span())
    for match in NAMED_REEXPORT_RE.finditer(source):
        dependency = resolve(module_id, match.group("spec"))
        for imported_name, exported_name in exported_names(match.group("names")):
            reexports.append((exported_name, dependency, imported_name))
        replacements.append(match.span())
    for match in LOCAL_EXPORT_LIST_RE.finditer(source):
        for local_name, exported_name in exported_names(match.group("names")):
            local_exports.append((exported_name, local_name))
        replacements.append(match.span())
    for start, end in reversed(replacements):
        source = source[:start] + "\n" + source[end:]

    source = EXPORT_PREFIX_RE.sub(r"\1", source)
    if re.search(r"(?m)^[ \t]*export\s", source):
        raise ValueError(f"Unparsed export in {module_id}")

    modules[module_id] = {
        "source": source,
        "imports": imports,
        "local_exports": local_exports,
        "reexports": reexports,
        "stars": star_dependencies,
    }


def all_exports(module_id: str, visiting: set[str] | None = None) -> list[tuple[str, str, str | None]]:
    visiting = set() if visiting is None else visiting
    if module_id in visiting:
        return []
    visiting.add(module_id)
    module = modules[module_id]
    result: list[tuple[str, str, str | None]] = []
    names: set[str] = set()
    for exported, local in module["local_exports"]:
        if exported not in names:
            result.append((exported, local, None))
            names.add(exported)
    for exported, dependency, imported in module["reexports"]:
        if exported not in names:
            result.append((exported, imported, dependency))
            names.add(exported)
    for dependency in module["stars"]:
        for exported, _local, _source in all_exports(dependency, visiting.copy()):
            if exported != "default" and exported not in names:
                result.append((exported, exported, dependency))
                names.add(exported)
    return result


out: list[str] = [
    "/* Generated from the modular source in src/. Do not edit this file directly. */",
    "(function () {",
    "  var __modules = Object.create(null);",
    "  var __cache = Object.create(null);",
    "  function __require(id) {",
    "    if (__cache[id]) return __cache[id].exports;",
    "    var module = { exports: {} };",
    "    __cache[id] = module;",
    "    if (!__modules[id]) throw new Error('Unknown local module: ' + id);",
    "    __modules[id](module, module.exports, __require);",
    "    return module.exports;",
    "  }",
]

for module_id, module in modules.items():
    out.append(f"  __modules[{js(module_id)}] = function (__module, __exports, __require) {{")
    out.append("    var __importBindings = Object.create(null);")
    for item in module["imports"]:
        dep = item["dependency"]
        for imported_name, local_name in item["bindings"]:
            if imported_name == "*":
                out.append(f"    __importBindings[{js(local_name)}] = function () {{ return __require({js(dep)}); }};")
            else:
                out.append(
                    f"    __importBindings[{js(local_name)}] = function () {{ return __require({js(dep)})[{js(imported_name)}]; }};"
                )
    out.append("    var __importScope = new Proxy(__importBindings, {")
    out.append("      has: function (target, key) { return typeof key === 'string' && Object.prototype.hasOwnProperty.call(target, key); },")
    out.append("      get: function (target, key) { if (key === Symbol.unscopables) return undefined; var read = target[key]; return typeof read === 'function' ? read() : read; }")
    out.append("    });")
    out.append("    with (__importScope) {")
    for exported, local, dependency in all_exports(module_id):
        if dependency is None:
            getter = f"function () {{ return {local}; }}"
        else:
            getter = f"function () {{ return __require({js(dependency)})[{js(local)}]; }}"
        out.append(
            f"      Object.defineProperty(__exports, {js(exported)}, {{ enumerable: true, get: {getter} }});"
        )
    dependencies = list(dict.fromkeys([item["dependency"] for item in module["imports"]] + module["stars"] + [item[1] for item in module["reexports"]]))
    for dependency in dependencies:
        out.append(f"      __require({js(dependency)});")
    out.append("      // Module source follows.")
    out.append(module["source"])
    out.append("    }")
    out.append("  };")

out.extend(["  __require('src/app.js');", "})();", ""])
output_path = SRC / "app.offline.js"
output_path.write_text("\n".join(out), encoding="utf-8")
print(f"Wrote {output_path} ({output_path.stat().st_size:,} bytes)")
