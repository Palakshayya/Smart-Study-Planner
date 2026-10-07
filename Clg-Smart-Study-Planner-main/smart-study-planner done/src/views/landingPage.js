/**
 * ============================================================================
 * LANDING PAGE VIEW COMPONENT
 * ============================================================================
 * Modular landing page containing dedicated navigation, value proposition hero,
 * university trust badges, 6 core feature cards, interactive lab overrun 
 * auto-rebalancer simulator, 3-step walkthrough, testimonials wall, FAQ, 
 * final conversion banner, and footer.
 */

import { initLandingInteractivity } from '../services/landingDemoService.js';

export function getLandingPageHTML() {
  return `
    <!-- 1. Dedicated Landing Header / Navbar -->
    <header class="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-8 py-3.5 flex items-center justify-between shadow-2xs">
      <!-- Brand Logo -->
      <div onclick="window.scrollTo({top: 0, behavior: 'smooth'})" class="flex items-center gap-2.5 cursor-pointer select-none shrink-0 mr-4">
        <div class="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#5551FF] to-indigo-500 text-white flex items-center justify-center text-lg shadow-xs shrink-0">
          🎓
        </div>
        <div class="flex flex-col items-start justify-center leading-none">
          <span class="text-sm sm:text-base font-bold text-slate-900 tracking-tight leading-tight">Smart Study</span>
          <span id="landing-brand-planner" class="block text-[10px] font-extrabold text-[#5551FF] bg-[#5551FF]/10 px-1.5 py-0.5 rounded-md tracking-wider uppercase leading-none mt-1">Planner</span>
        </div>
      </div>

      <!-- Center Nav Links -->
      <nav class="hidden md:flex items-center gap-6 text-xs font-semibold text-slate-600">
        <a href="#landing-features" class="hover:text-[#5551FF] transition-colors">Features</a>
        <a href="#landing-simulator" class="hover:text-[#5551FF] transition-colors">Simulation</a>
        <a href="#landing-how" class="hover:text-[#5551FF] transition-colors">How It Works</a>
        <a href="#landing-reviews" class="hover:text-[#5551FF] transition-colors">Reviews</a>
        <a href="#landing-faq" class="hover:text-[#5551FF] transition-colors">FAQ</a>
      </nav>

      <!-- Auth Actions: Login & Get Started -->
      <div class="flex items-center gap-2 sm:gap-3">
        <button onclick="switchMode('login')" class="px-3.5 py-2 text-xs font-bold text-slate-700 hover:text-[#5551FF] hover:bg-indigo-50/70 rounded-xl transition-all cursor-pointer">
          Log in
        </button>
        <button onclick="switchMode('signup')" class="px-4 py-2 text-xs font-bold text-white bg-[#5551FF] hover:bg-[#4338ca] rounded-xl shadow-xs hover:shadow-indigo-500/20 active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer">
          <span>Get Started</span>
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
        </button>
      </div>
    </header>

    <!-- 2. Hero Section -->
    <section class="py-16 md:py-24 px-6 max-w-6xl mx-auto text-center space-y-6">
      <div class="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 border border-indigo-100/80 rounded-full text-xs font-bold text-[#5551FF]">
        <span>🚀 AI-Powered Collegiate Ecosystem</span>
      </div>
      <h1 class="text-3xl sm:text-4xl md:text-6xl font-extrabold text-slate-900 tracking-tight max-w-4xl mx-auto leading-tight">
        Automated Study Timetables that <span class="text-[#5551FF]">Adjust When Life Happens</span>
      </h1>
      <p class="text-sm md:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
        Reverse-engineer your exam readiness, enjoy dynamic task redistribution when labs run late, and achieve peak retention with spaced-repetition schedules designed specifically for university students.
      </p>
      <div class="flex flex-wrap items-center justify-center gap-3.5 pt-2">
        <button onclick="switchMode('signup')" class="px-6 py-3.5 bg-[#5551FF] hover:bg-[#4338ca] text-white rounded-xl text-sm font-bold shadow-md hover:shadow-indigo-500/25 active:scale-95 transition-all flex items-center gap-2 cursor-pointer">
          <span>Get Started Free</span>
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
        </button>
        <button onclick="switchMode('login')" class="px-6 py-3.5 bg-white border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-800 rounded-xl text-sm font-semibold transition-all flex items-center gap-2 cursor-pointer">
          <span>Log In to Account</span>
        </button>
      </div>
      <div class="pt-4 flex items-center justify-center gap-2 text-xs font-medium text-slate-500">
        <span class="text-amber-500">★★★★★</span>
        <span>Rated 4.9/5 by 10,000+ collegiate students across Stanford, MIT, Oxford, and Berkeley</span>
      </div>
    </section>

    <!-- 3. University Trust Bar -->
    <section class="py-10 border-y border-slate-100 bg-slate-50/50 text-center px-6">
      <p class="text-xs font-bold uppercase tracking-wider text-slate-400 mb-6">
        Empowering Top Performers Across Leading Global Institutions
      </p>
      <div class="flex flex-wrap items-center justify-center gap-8 sm:gap-14 text-sm font-bold text-slate-700">
        <span>🏛️ Stanford</span>
        <span>🏛️ MIT</span>
        <span>🏛️ Oxford</span>
        <span>🏛️ UC Berkeley</span>
        <span>🏛️ Cambridge</span>
        <span>🏛️ Harvard</span>
      </div>
    </section>

    <!-- 4. Core Features Grid -->
    <section id="landing-features" class="py-20 px-6 max-w-6xl mx-auto space-y-12">
      <div class="text-center space-y-2">
        <span class="text-xs font-bold uppercase tracking-wider text-[#5551FF]">Intelligent Engine</span>
        <h2 class="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">Built For Demanding Academic Semesters</h2>
        <p class="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto">Everything you need to stop feeling behind and start staying ahead of exams, assignments, and lectures.</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-2xs hover:shadow-md transition-all space-y-3">
          <div class="w-10 h-10 rounded-xl bg-indigo-50 text-[#5551FF] flex items-center justify-center text-xl font-bold">⚡</div>
          <h3 class="text-base font-bold text-slate-900">Dynamic Conflict Auto-Rebalancer</h3>
          <p class="text-xs text-slate-600 leading-relaxed">
            When laboratory sessions run late or unforeseen events happen, the calendar engine reallocates missed study blocks into non-conflict windows with zero manual recalculation.
          </p>
        </div>

        <div class="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-2xs hover:shadow-md transition-all space-y-3">
          <div class="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center text-xl font-bold">🧠</div>
          <h3 class="text-base font-bold text-slate-900">Spaced Repetition Mastery</h3>
          <p class="text-xs text-slate-600 leading-relaxed">
            Calculates optimal review intervals based on forgetting curves so you retain dense formulas, clinical facts, and code syntax effortlessly.
          </p>
        </div>

        <div class="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-2xs hover:shadow-md transition-all space-y-3">
          <div class="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-xl font-bold">🎯</div>
          <h3 class="text-base font-bold text-slate-900">Exam Readiness Countdown</h3>
          <p class="text-xs text-slate-600 leading-relaxed">
            Tracks countdown days, hours logged per subject, and syllabus topic mastery to project your real-time preparedness score before test day.
          </p>
        </div>

        <div class="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-2xs hover:shadow-md transition-all space-y-3">
          <div class="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center text-xl font-bold">⏱️</div>
          <h3 class="text-base font-bold text-slate-900">Focus Session Pomodoro</h3>
          <p class="text-xs text-slate-600 leading-relaxed">
            Built-in 25-minute deep focus sprints with audio alarms, break timers, and automatic logging directly toward your daily target hours.
          </p>
        </div>

        <div class="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-2xs hover:shadow-md transition-all space-y-3">
          <div class="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-xl font-bold">📊</div>
          <h3 class="text-base font-bold text-slate-900">Course Workload Balancer</h3>
          <p class="text-xs text-slate-600 leading-relaxed">
            Prevents cramming by evenly distributing study sessions across all 4-6 of your semester classes based on credit weights and upcoming due dates.
          </p>
        </div>

        <div class="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-2xs hover:shadow-md transition-all space-y-3">
          <div class="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center text-xl font-bold">🔔</div>
          <h3 class="text-base font-bold text-slate-900">Smart Test & Task Alerts</h3>
          <p class="text-xs text-slate-600 leading-relaxed">
            Context-aware audio reminders and in-app alerts sound 24 hours, 3 days, and 1 week before major exams so deadlines never take you by surprise.
          </p>
        </div>
      </div>
    </section>

    <!-- 5. Interactive Auto-Rebalancer Simulator -->
    <section id="landing-simulator" class="py-16 bg-slate-50/70 border-y border-slate-100 px-6">
      <div class="max-w-4xl mx-auto space-y-6 text-center">
        <span class="text-xs font-bold uppercase tracking-wider text-[#5551FF]">Interactive Simulation</span>
        <h2 class="text-2xl md:text-3xl font-extrabold text-slate-900">See The Auto-Rebalancer In Real Time</h2>
        <p class="text-xs md:text-sm text-slate-500 max-w-xl mx-auto">
          Experience what happens when you miss a study session. Click the button below to trigger our dynamic calendar engine and watch tasks reorganize seamlessly.
        </p>

        <div class="bg-white rounded-2xl border border-slate-200/80 shadow-md p-6 sm:p-8 text-left space-y-6 mt-6">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div>
              <h3 class="text-base font-bold text-slate-900">Simulated Exam Week: Bio & Stats</h3>
              <p class="text-xs text-slate-500 mt-0.5">Demonstrating conflict mitigation under high assignment density.</p>
            </div>
            <button id="trigger-overrun-btn" class="px-4 py-2.5 bg-[#5551FF] hover:bg-[#4338ca] text-white rounded-xl text-xs font-semibold shadow-xs transition-colors shrink-0 cursor-pointer">
              Trigger Sudden 2-Hour Lab Overrun
            </button>
          </div>

          <!-- Dynamic Rebalancing Action Cards -->
          <div class="space-y-3">
            <div id="demo-delayed-alert" class="hidden p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-900 flex items-center justify-between text-xs animate-fade-in">
              <div class="flex items-center gap-2.5">
                <span class="text-base font-bold">⚠️</span>
                <div>
                  <h4 class="font-bold">Physics 211 Problem Set (Missed due to Chem lab overrun)</h4>
                  <p class="text-[11px] text-rose-600">Original slot: Today, 3:00 PM - 4:30 PM</p>
                </div>
              </div>
              <span class="px-2 py-0.5 rounded font-bold uppercase text-[10px] bg-rose-200 text-rose-800">Delayed</span>
            </div>

            <div id="demo-resolved-alert" class="hidden p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 flex items-center justify-between text-xs animate-fade-in">
              <div class="flex items-center gap-2.5">
                <span class="text-base font-bold">✓</span>
                <div>
                  <h4 class="font-bold">Auto-Relocated to Tomorrow 10:00 AM</h4>
                  <p class="text-[11px] text-emerald-600">Zero conflict with lecture calendar · 0 penalty points</p>
                </div>
              </div>
              <span class="px-2 py-0.5 rounded font-bold uppercase text-[10px] bg-emerald-200 text-emerald-800">Resolved</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 6. How It Works Section -->
    <section id="landing-how" class="py-20 px-6 max-w-6xl mx-auto space-y-12">
      <div class="text-center space-y-2">
        <span class="text-xs font-bold uppercase tracking-wider text-[#5551FF]">Seamless Onboarding</span>
        <h2 class="text-3xl font-extrabold text-slate-900">Get Ready In 3 Simple Steps</h2>
        <p class="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">No complicated spreadsheet setups. You can have your full semester schedule generated in under two minutes.</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div class="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-2xs space-y-4 text-center">
          <div class="w-12 h-12 rounded-2xl bg-indigo-50 text-[#5551FF] font-black text-xl flex items-center justify-center mx-auto">1</div>
          <h3 class="text-base font-bold text-slate-900">Add Your Courses</h3>
          <p class="text-xs text-slate-600 leading-relaxed">
            Enter your current semester subjects and exam dates. Smart Study auto-assigns color themes and priority weightings.
          </p>
        </div>

        <div class="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-2xs space-y-4 text-center">
          <div class="w-12 h-12 rounded-2xl bg-indigo-50 text-[#5551FF] font-black text-xl flex items-center justify-center mx-auto">2</div>
          <h3 class="text-base font-bold text-slate-900">Set Daily Pace</h3>
          <p class="text-xs text-slate-600 leading-relaxed">
            Choose your target study hours per day (from Light 2h to Intensive 6h) and pick your preferred active study days of the week.
          </p>
        </div>

        <div class="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-2xs space-y-4 text-center">
          <div class="w-12 h-12 rounded-2xl bg-indigo-50 text-[#5551FF] font-black text-xl flex items-center justify-center mx-auto">3</div>
          <h3 class="text-base font-bold text-slate-900">Study Stress-Free</h3>
          <p class="text-xs text-slate-600 leading-relaxed">
            Follow your clean daily timetable. Miss a session? Click one button and watch the system automatically redistribute your workload.
          </p>
        </div>
      </div>

      <div class="text-center pt-4">
        <button onclick="switchMode('signup')" class="px-6 py-3 bg-[#5551FF] hover:bg-[#4338ca] text-white rounded-xl text-xs font-bold shadow-xs hover:shadow-indigo-500/20 transition-all cursor-pointer">
          Create Your Account Now →
        </button>
      </div>
    </section>

    <!-- 7. Wall of Student Wins (Testimonials) -->
    <section id="landing-reviews" class="py-16 bg-slate-50/50 border-t border-slate-100 px-6">
      <div class="max-w-6xl mx-auto space-y-8">
        <div class="text-center space-y-2">
          <span class="text-xs font-bold uppercase tracking-wider text-[#5551FF]">Unfiltered Feedback</span>
          <h2 class="text-3xl font-extrabold text-slate-900">Wall of Student Wins</h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-2xs space-y-4">
            <span class="text-xs px-2.5 py-0.5 bg-blue-50 text-blue-700 rounded-full font-semibold">Computer Science</span>
            <p class="text-xs text-slate-600 leading-relaxed">
              "I used to spend 4 hours every Sunday styling Notion templates. Smart Study Planner sets up my entire week in 3 clicks. My code submissions have never been late once."
            </p>
            <div class="pt-4 border-t border-slate-100 flex items-center gap-3">
              <div class="w-8 h-8 rounded-full bg-blue-100 text-blue-800 font-bold text-xs flex items-center justify-center">SL</div>
              <div>
                <h4 class="text-xs font-bold text-slate-900">Sarah Lin</h4>
                <p class="text-[10px] text-slate-400">UC Berkeley '25</p>
              </div>
            </div>
          </div>

          <div class="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-2xs space-y-4">
            <span class="text-xs px-2.5 py-0.5 bg-purple-50 text-purple-700 rounded-full font-semibold">Pre-Med & Biology</span>
            <p class="text-xs text-slate-600 leading-relaxed">
              "Between organic chem labs and MCAT prep, my cognitive load was off the charts. The countdown and auto-reschedule saved my semester."
            </p>
            <div class="pt-4 border-t border-slate-100 flex items-center gap-3">
              <div class="w-8 h-8 rounded-full bg-purple-100 text-purple-800 font-bold text-xs flex items-center justify-center">DR</div>
              <div>
                <h4 class="text-xs font-bold text-slate-900">David Ross</h4>
                <p class="text-[10px] text-slate-400">Johns Hopkins University</p>
              </div>
            </div>
          </div>

          <div class="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-2xs space-y-4">
            <span class="text-xs px-2.5 py-0.5 bg-emerald-50 text-emerald-700 rounded-full font-semibold">Business & Finance</span>
            <p class="text-xs text-slate-600 leading-relaxed">
              "Balancing internships and case studies was madness before. The time-blocking sync keeps my evenings calm. It literally keeps me sane during interview seasons."
            </p>
            <div class="pt-4 border-t border-slate-100 flex items-center gap-3">
              <div class="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center justify-center">AV</div>
              <div>
                <h4 class="text-xs font-bold text-slate-900">Amina Vance</h4>
                <p class="text-[10px] text-slate-400">NYU Stern School of Business</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 8. Frequently Asked Questions (FAQ) -->
    <section id="landing-faq" class="py-20 px-6 max-w-4xl mx-auto space-y-8">
      <div class="text-center space-y-2">
        <span class="text-xs font-bold uppercase tracking-wider text-[#5551FF]">Answers & Clarifications</span>
        <h2 class="text-3xl font-extrabold text-slate-900">Frequently Asked Questions</h2>
      </div>

      <div class="space-y-3">
        <details class="group bg-white rounded-2xl border border-slate-200/80 p-5 cursor-pointer">
          <summary class="flex items-center justify-between font-bold text-sm text-slate-900 list-none">
            <span>How does the Auto-Rebalancing feature work?</span>
            <span class="text-slate-400 transition-transform group-open:rotate-180">▾</span>
          </summary>
          <p class="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
            When a lecture runs over, an assignment takes longer than planned, or you take an emergency rest day, the algorithm scans your upcoming week for open non-conflict focus slots and reassigns your tasks without double-booking classes or deadlines.
          </p>
        </details>

        <details class="group bg-white rounded-2xl border border-slate-200/80 p-5 cursor-pointer">
          <summary class="flex items-center justify-between font-bold text-sm text-slate-900 list-none">
            <span>Can I customize my rest days and maximum study hours?</span>
            <span class="text-slate-400 transition-transform group-open:rotate-180">▾</span>
          </summary>
          <p class="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
            Yes! During onboarding and at any time in your Settings, you can configure which days of the week you study, toggle weekend rest, and define target hours ranging from 2 hours up to 8+ hours.
          </p>
        </details>

        <details class="group bg-white rounded-2xl border border-slate-200/80 p-5 cursor-pointer">
          <summary class="flex items-center justify-between font-bold text-sm text-slate-900 list-none">
            <span>Is Smart Study Planner free for university students?</span>
            <span class="text-slate-400 transition-transform group-open:rotate-180">▾</span>
          </summary>
          <p class="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
            Yes, student access is 100% free with unlimited subjects, automated timetable rebalancing, countdown reminder alarms, and pomodoro tracking.
          </p>
        </details>

        <details class="group bg-white rounded-2xl border border-slate-200/80 p-5 cursor-pointer">
          <summary class="flex items-center justify-between font-bold text-sm text-slate-900 list-none">
            <span>How does exam readiness scoring work?</span>
            <span class="text-slate-400 transition-transform group-open:rotate-180">▾</span>
          </summary>
          <p class="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
            Your preparation percentage is calculated by cross-referencing your completed syllabus topics, logged study sessions, and remaining days until the exam date.
          </p>
        </details>
      </div>
    </section>

    <!-- 9. High-Conversion Final CTA Banner -->
    <section class="py-16 px-6 max-w-5xl mx-auto w-full">
      <div class="bg-gradient-to-tr from-[#5551FF] to-indigo-600 rounded-3xl p-8 sm:p-14 text-white text-center space-y-6 shadow-xl shadow-indigo-500/20">
        <h2 class="text-2xl sm:text-4xl font-extrabold tracking-tight">Ready to Take Control of Your Semester?</h2>
        <p class="text-sm sm:text-base text-indigo-100 max-w-xl mx-auto">
          Join thousands of university students studying smarter with automated timetables, spaced-repetition schedules, and conflict-free study plans.
        </p>
        <div class="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button onclick="switchMode('signup')" class="px-6 py-3.5 bg-white text-[#5551FF] hover:bg-slate-50 font-bold rounded-xl text-sm shadow-md transition-all cursor-pointer">
            Get Started Free →
          </button>
          <button onclick="switchMode('login')" class="px-6 py-3.5 bg-[#4338ca] hover:bg-indigo-900 text-white font-semibold rounded-xl text-sm transition-all cursor-pointer">
            Log In to Account
          </button>
        </div>
      </div>
    </section>

    <!-- 10. Landing Footer -->
    <footer class="mt-auto border-t border-slate-200 py-12 px-6 bg-slate-50">
      <div class="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        <div class="flex items-center gap-2">
          <span class="text-lg">🎓</span>
          <span class="font-bold text-sm text-slate-800">Smart Study Planner</span>
          <span class="text-xs text-slate-400">· Plan Smarter, Study Better</span>
        </div>

        <div class="flex items-center gap-6 text-xs font-semibold text-slate-600">
          <button onclick="switchMode('login')" class="hover:text-[#5551FF] transition-colors cursor-pointer">Log in</button>
          <button onclick="switchMode('signup')" class="hover:text-[#5551FF] transition-colors cursor-pointer">Get Started</button>
          <button onclick="switchMode('app')" class="hover:text-[#5551FF] transition-colors cursor-pointer">Student Dashboard</button>
          <a href="#landing-faq" class="hover:text-[#5551FF] transition-colors">Help & FAQ</a>
        </div>

        <p class="text-xs text-slate-400">© 2026 Smart Study Planner. All rights reserved.</p>
      </div>
    </footer>
  `;
}

export function initLandingPage() {
  const container = document.getElementById('landing-layout');
  if (container) {
    container.innerHTML = getLandingPageHTML();
    initLandingInteractivity();
  }
}
