/**
 * ============================================================================
 * SETTINGS PAGE VIEW
 * ============================================================================
 * Account details, student ID, email address, password change modal trigger,
 * and danger zone session logout.
 */

export function getSettingsPageHTML() {
  return `
    <!-- 10. SETTINGS VIEW -->
    <div id="view-settings" class="view-panel">
      <div class="p-6 md:p-8 max-w-4xl mx-auto space-y-6">
        <div>
          <h1 class="text-2xl font-extrabold text-slate-900 tracking-tight">Settings</h1>
          <p class="text-xs text-slate-500 font-medium mt-1">Manage your account, preferences, and application theme.</p>
        </div>

        <!-- Account Details Card -->
        <div class="bg-white rounded-2xl border border-slate-100 shadow-2xs p-6 sm:p-8 space-y-6">
          <h3 class="text-base font-bold text-slate-900">Account Details</h3>
          <div class="flex items-center gap-4">
            <div class="relative group cursor-pointer" onclick="triggerProfilePhotoUpload()" title="Change profile photo">
              <div id="settings-avatar" class="w-14 h-14 rounded-full overflow-hidden bg-gradient-to-tr from-indigo-500 to-indigo-600 text-white font-bold text-lg flex items-center justify-center shrink-0 ring-2 ring-slate-100 shadow-xs">
                AM
              </div>
              <div class="absolute inset-0 rounded-full bg-slate-900/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-[10px] font-bold">
                📷
              </div>
            </div>
            <div>
              <h4 id="settings-view-name" class="text-base font-bold text-slate-900">Alex Mercer</h4>
              <p id="settings-view-major" class="text-xs text-slate-500">Computer Science, B.S.</p>
              <button type="button" onclick="triggerProfilePhotoUpload()" class="text-xs text-[#5551FF] font-semibold hover:underline mt-0.5 cursor-pointer inline-flex items-center gap-1">
                <span>Upload / Change Photo</span>
              </button>
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-bold uppercase text-slate-400 mb-1">Email</label>
              <input id="settings-view-email" type="email" readonly value="alex.student@university.edu" class="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-700">
            </div>
            <div>
              <label class="block text-xs font-bold uppercase text-slate-400 mb-1">Student ID</label>
              <input id="settings-view-id" type="text" readonly value="5643212" class="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-700">
            </div>
          </div>

          <!-- Security -->
          <div class="pt-4 border-t border-slate-100 space-y-3">
            <h4 class="text-sm font-bold text-slate-900">Security</h4>
            <button onclick="openModal('change-password-modal')" class="px-4 py-2.5 bg-blue-50 hover:bg-blue-100 text-[#5551FF] font-semibold text-xs rounded-xl flex items-center gap-2 transition-colors cursor-pointer">
              <span>🔒 Change Password</span>
            </button>
          </div>

          <!-- Danger Zone -->
          <div class="pt-4 border-t border-slate-100 space-y-2">
            <h4 class="text-sm font-bold text-rose-600">Danger Zone</h4>
            <p class="text-xs text-slate-500">Logging out will end your current session. You will need to sign in again to access your planner.</p>
            <button onclick="switchMode('login')" class="px-4 py-2 bg-rose-50 hover:bg-rose-100 text-rose-600 font-semibold text-xs rounded-xl transition-colors inline-block mt-2 cursor-pointer">
              🚪 Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  `;
}
