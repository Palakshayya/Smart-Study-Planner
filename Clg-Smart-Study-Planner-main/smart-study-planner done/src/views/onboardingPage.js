/**
 * ============================================================================
 * ONBOARDING WIZARD VIEW COMPONENT
 * ============================================================================
 * Multi-step collegiate registration wizard:
 * - Step 1: Account Information (Full name, student email, password)
 * - Step 2: Academic Profile Setup (University, Course, Semesters 1-8 dropdown, Subject tracking)
 * - Step 3: Study Preferences & Goals (Daily hours target, study window, preferred days, launch)
 */

export function getOnboardingPageHTML() {
  return `
    <div class="bg-white rounded-3xl shadow-xl max-w-2xl w-full border border-slate-200 overflow-hidden p-6 sm:p-10 space-y-8">
      
      <!-- Header -->
      <div class="text-center space-y-2">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-[#5551FF] text-xs font-bold mb-1">
          <span>🎓 Student Registration</span>
        </div>
        <h1 class="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">Welcome to Smart Study Planner</h1>
        <p class="text-xs sm:text-sm text-slate-500">Complete the 3 quick steps to set up your customized academic planner.</p>
      </div>

      <!-- 3-Step Stepper Progress Bar -->
      <div class="relative max-w-md mx-auto pt-2 pb-4">
        <!-- Connecting Background Bar -->
        <div class="absolute top-6 left-8 right-8 h-1 bg-slate-200 -z-0 rounded-full overflow-hidden">
          <div id="onboarding-progress-bar" class="h-full bg-[#5551FF] transition-all duration-300" style="width: 0%;"></div>
        </div>

        <div class="relative z-10 flex items-center justify-between">
          <!-- Step 1 Button -->
          <button type="button" onclick="goToOnboardingStep(1)" class="flex flex-col items-center gap-1.5 focus:outline-none cursor-pointer">
            <div id="step-indicator-1" class="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold bg-[#5551FF] text-white ring-4 ring-indigo-100 shadow-xs">
              1
            </div>
            <span id="step-text-1" class="text-xs font-bold text-[#5551FF]">Step 1</span>
          </button>

          <!-- Step 2: Profile Setup Button -->
          <button type="button" onclick="goToOnboardingStep(2)" class="flex flex-col items-center gap-1.5 focus:outline-none cursor-pointer">
            <div id="step-indicator-2" class="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold bg-slate-100 text-slate-400 border border-slate-200">
              2
            </div>
            <span id="step-text-2" class="text-xs font-medium text-slate-400">Profile Setup</span>
          </button>

          <!-- Step 3: Setup Step Three Button -->
          <button type="button" onclick="goToOnboardingStep(3)" class="flex flex-col items-center gap-1.5 focus:outline-none cursor-pointer">
            <div id="step-indicator-3" class="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold bg-slate-100 text-slate-400 border border-slate-200">
              3
            </div>
            <span id="step-text-3" class="text-xs font-medium text-slate-400">Step 3</span>
          </button>
        </div>
      </div>

      <!-- ========================================================
           STEP 1: ACCOUNT INFORMATION
           ======================================================== -->
      <div id="onboard-step-1" class="space-y-6">
        <div class="border-b border-slate-100 pb-3">
          <h3 class="text-base font-bold text-slate-900">Step 1: Account & Personal Information</h3>
          <p class="text-xs text-slate-500 mt-0.5">Let's create your account with your basic contact info.</p>
        </div>

        <div class="space-y-4">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-semibold text-slate-700 mb-1.5">Full Name *</label>
              <input id="onboard-fullname" type="text" placeholder="e.g. Alex Mercer" value="Alex Student" class="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:border-[#5551FF] focus:ring-2 focus:ring-indigo-100 transition-all outline-none">
            </div>

            <div>
              <label class="block text-xs font-semibold text-slate-700 mb-1.5">Email Address *</label>
              <input id="onboard-email" type="email" placeholder="e.g. alex@university.edu" value="alex@university.edu" class="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:border-[#5551FF] focus:ring-2 focus:ring-indigo-100 transition-all outline-none">
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-semibold text-slate-700 mb-1.5">Create Password</label>
              <input id="onboard-password" type="password" value="StudyStrong2024!" placeholder="••••••••" class="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:border-[#5551FF] focus:ring-2 focus:ring-indigo-100 transition-all outline-none">
            </div>

            <div>
              <label class="block text-xs font-semibold text-slate-700 mb-1.5">Confirm Password</label>
              <input id="onboard-password-confirm" type="password" value="StudyStrong2024!" placeholder="••••••••" class="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:border-[#5551FF] focus:ring-2 focus:ring-indigo-100 transition-all outline-none">
            </div>
          </div>
        </div>

        <div class="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p class="text-xs text-slate-500">
            Already have an account? <button type="button" onclick="switchMode('login')" class="text-[#5551FF] font-bold hover:underline">Sign in</button>
          </p>

          <button type="button" onclick="goToOnboardingStep(2)" class="w-full sm:w-auto px-6 py-3 bg-[#5551FF] hover:bg-[#4338ca] text-white rounded-xl text-xs font-bold shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98">
            <span>Next: Profile Setup →</span>
          </button>
        </div>
      </div>

      <!-- ========================================================
           STEP 2: PROFILE SETUP (ACADEMIC DETAILS)
           ======================================================== -->
      <div id="onboard-step-2" class="hidden space-y-6">
        <div class="border-b border-slate-100 pb-3">
          <h3 class="text-base font-bold text-slate-900">Step 2: Academic Profile Setup</h3>
          <p class="text-xs text-slate-500 mt-0.5">Tell us about your university, degree, and what courses you are taking.</p>
        </div>

        <div class="space-y-4">
          <div>
            <label class="block text-xs font-semibold text-slate-700 mb-1.5">University / Institution *</label>
            <input id="onboard-university" type="text" placeholder="e.g. State University of Technology" value="State University of Technology" class="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:border-[#5551FF] focus:ring-2 focus:ring-indigo-100 transition-all outline-none">
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div class="sm:col-span-2">
              <label class="block text-xs font-semibold text-slate-700 mb-1.5">Course / Major *</label>
              <input id="onboard-major" type="text" placeholder="e.g. Computer Science, B.S." value="Computer Science, B.S." class="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:border-[#5551FF] focus:ring-2 focus:ring-indigo-100 transition-all outline-none">
            </div>

            <!-- Custom Styled Current Semester Dropdown (Semesters 1 to 8) -->
            <div class="relative custom-dropdown-container">
              <label class="block text-xs font-semibold text-slate-700 mb-1.5">Current Semester</label>
              
              <!-- Hidden input for form state -->
              <input type="hidden" id="onboard-semester" value="Semester 1">

              <!-- Dropdown Trigger Button -->
              <button type="button" onclick="toggleCustomDropdown('onboard-semester')" class="w-full px-3.5 py-2.5 bg-slate-50 hover:bg-slate-100/70 border border-slate-200 hover:border-indigo-300 rounded-xl text-xs font-semibold text-slate-800 transition-all flex items-center justify-between shadow-2xs focus:outline-none focus:ring-2 focus:ring-[#5551FF]/25 cursor-pointer">
                <div id="onboard-semester-label" class="flex items-center gap-2">
                  <span class="font-bold text-slate-800">Semester 1</span>
                  <span class="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-slate-100 text-slate-600 border border-slate-200">Year 1</span>
                </div>
                <svg id="onboard-semester-chevron" class="custom-dropdown-chevron w-4 h-4 text-slate-400 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                </svg>
              </button>

              <!-- Custom Dropdown Menu (Scrollable Semesters 1 to 8) -->
              <div id="onboard-semester-menu" class="custom-dropdown-menu hidden absolute left-0 right-0 top-full mt-1.5 z-50 bg-white/95 backdrop-blur-md border border-slate-200/90 rounded-2xl shadow-xl shadow-slate-200/50 p-1.5 space-y-1 max-h-56 overflow-y-auto">
                
                <!-- Semester 1 (Default Active) -->
                <div data-value="Semester 1" onclick="selectCustomDropdownOption('onboard-semester', 'Semester 1', '<span class=\'font-bold text-slate-800\'>Semester 1</span> <span class=\'text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-slate-100 text-slate-600 border border-slate-200\'>Year 1</span>')" class="dropdown-item px-3 py-2 rounded-xl text-xs font-semibold bg-indigo-50/90 text-[#5551FF] hover:bg-indigo-50 transition-all flex items-center justify-between cursor-pointer group">
                  <div class="flex items-center gap-2">
                    <span class="dropdown-check font-bold text-[#5551FF] text-xs">✓</span>
                    <span class="font-semibold text-[#5551FF]">Semester 1</span>
                  </div>
                  <span class="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-indigo-100 text-[#5551FF] border border-indigo-200">Year 1</span>
                </div>

                <!-- Semester 2 -->
                <div data-value="Semester 2" onclick="selectCustomDropdownOption('onboard-semester', 'Semester 2', '<span class=\'font-bold text-slate-800\'>Semester 2</span> <span class=\'text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-slate-100 text-slate-600 border border-slate-200\'>Year 1</span>')" class="dropdown-item px-3 py-2 rounded-xl text-xs font-medium text-slate-700 hover:bg-indigo-50/70 hover:text-[#5551FF] transition-all flex items-center justify-between cursor-pointer group">
                  <div class="flex items-center gap-2">
                    <span class="dropdown-check opacity-0 font-bold text-[#5551FF] text-xs">✓</span>
                    <span class="font-medium text-slate-800 group-hover:text-[#5551FF]">Semester 2</span>
                  </div>
                  <span class="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-slate-100 text-slate-600 border border-slate-200">Year 1</span>
                </div>

                <!-- Semester 3 -->
                <div data-value="Semester 3" onclick="selectCustomDropdownOption('onboard-semester', 'Semester 3', '<span class=\'font-bold text-slate-800\'>Semester 3</span> <span class=\'text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-slate-100 text-slate-600 border border-slate-200\'>Year 2</span>')" class="dropdown-item px-3 py-2 rounded-xl text-xs font-medium text-slate-700 hover:bg-indigo-50/70 hover:text-[#5551FF] transition-all flex items-center justify-between cursor-pointer group">
                  <div class="flex items-center gap-2">
                    <span class="dropdown-check opacity-0 font-bold text-[#5551FF] text-xs">✓</span>
                    <span class="font-medium text-slate-800 group-hover:text-[#5551FF]">Semester 3</span>
                  </div>
                  <span class="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-slate-100 text-slate-600 border border-slate-200">Year 2</span>
                </div>

                <!-- Semester 4 -->
                <div data-value="Semester 4" onclick="selectCustomDropdownOption('onboard-semester', 'Semester 4', '<span class=\'font-bold text-slate-800\'>Semester 4</span> <span class=\'text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-slate-100 text-slate-600 border border-slate-200\'>Year 2</span>')" class="dropdown-item px-3 py-2 rounded-xl text-xs font-medium text-slate-700 hover:bg-indigo-50/70 hover:text-[#5551FF] transition-all flex items-center justify-between cursor-pointer group">
                  <div class="flex items-center gap-2">
                    <span class="dropdown-check opacity-0 font-bold text-[#5551FF] text-xs">✓</span>
                    <span class="font-medium text-slate-800 group-hover:text-[#5551FF]">Semester 4</span>
                  </div>
                  <span class="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-slate-100 text-slate-600 border border-slate-200">Year 2</span>
                </div>

                <!-- Semester 5 -->
                <div data-value="Semester 5" onclick="selectCustomDropdownOption('onboard-semester', 'Semester 5', '<span class=\'font-bold text-slate-800\'>Semester 5</span> <span class=\'text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-slate-100 text-slate-600 border border-slate-200\'>Year 3</span>')" class="dropdown-item px-3 py-2 rounded-xl text-xs font-medium text-slate-700 hover:bg-indigo-50/70 hover:text-[#5551FF] transition-all flex items-center justify-between cursor-pointer group">
                  <div class="flex items-center gap-2">
                    <span class="dropdown-check opacity-0 font-bold text-[#5551FF] text-xs">✓</span>
                    <span class="font-medium text-slate-800 group-hover:text-[#5551FF]">Semester 5</span>
                  </div>
                  <span class="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-slate-100 text-slate-600 border border-slate-200">Year 3</span>
                </div>

                <!-- Semester 6 -->
                <div data-value="Semester 6" onclick="selectCustomDropdownOption('onboard-semester', 'Semester 6', '<span class=\'font-bold text-slate-800\'>Semester 6</span> <span class=\'text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-slate-100 text-slate-600 border border-slate-200\'>Year 3</span>')" class="dropdown-item px-3 py-2 rounded-xl text-xs font-medium text-slate-700 hover:bg-indigo-50/70 hover:text-[#5551FF] transition-all flex items-center justify-between cursor-pointer group">
                  <div class="flex items-center gap-2">
                    <span class="dropdown-check opacity-0 font-bold text-[#5551FF] text-xs">✓</span>
                    <span class="font-medium text-slate-800 group-hover:text-[#5551FF]">Semester 6</span>
                  </div>
                  <span class="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-slate-100 text-slate-600 border border-slate-200">Year 3</span>
                </div>

                <!-- Semester 7 -->
                <div data-value="Semester 7" onclick="selectCustomDropdownOption('onboard-semester', 'Semester 7', '<span class=\'font-bold text-slate-800\'>Semester 7</span> <span class=\'text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-slate-100 text-slate-600 border border-slate-200\'>Year 4</span>')" class="dropdown-item px-3 py-2 rounded-xl text-xs font-medium text-slate-700 hover:bg-indigo-50/70 hover:text-[#5551FF] transition-all flex items-center justify-between cursor-pointer group">
                  <div class="flex items-center gap-2">
                    <span class="dropdown-check opacity-0 font-bold text-[#5551FF] text-xs">✓</span>
                    <span class="font-medium text-slate-800 group-hover:text-[#5551FF]">Semester 7</span>
                  </div>
                  <span class="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-slate-100 text-slate-600 border border-slate-200">Year 4</span>
                </div>

                <!-- Semester 8 -->
                <div data-value="Semester 8" onclick="selectCustomDropdownOption('onboard-semester', 'Semester 8', '<span class=\'font-bold text-slate-800\'>Semester 8</span> <span class=\'text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-slate-100 text-slate-600 border border-slate-200\'>Year 4</span>')" class="dropdown-item px-3 py-2 rounded-xl text-xs font-medium text-slate-700 hover:bg-indigo-50/70 hover:text-[#5551FF] transition-all flex items-center justify-between cursor-pointer group">
                  <div class="flex items-center gap-2">
                    <span class="dropdown-check opacity-0 font-bold text-[#5551FF] text-xs">✓</span>
                    <span class="font-medium text-slate-800 group-hover:text-[#5551FF]">Semester 8</span>
                  </div>
                  <span class="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-slate-100 text-slate-600 border border-slate-200">Year 4</span>
                </div>

              </div>
            </div>
          </div>

          <div>
            <label class="block text-xs font-semibold text-slate-700 mb-1.5">Student ID (Optional)</label>
            <input id="onboard-student-id" type="text" placeholder="e.g. 5643212" value="5643212" class="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:border-[#5551FF] focus:ring-2 focus:ring-indigo-100 transition-all outline-none">
          </div>

          <!-- Subject Selection -->
          <div>
            <label class="block text-xs font-semibold text-slate-700 mb-2">Select Current Subjects to Track:</label>
            <div class="flex flex-wrap gap-2">
              <button type="button" onclick="toggleOnboardingSubject(this)" class="onboard-subject-btn px-3 py-1.5 rounded-xl border border-[#5551FF] text-[#5551FF] bg-indigo-50 font-semibold text-xs transition-all cursor-pointer flex items-center gap-1.5 shadow-2xs">
                <span class="subject-check">✓</span>
                <span>Data Structures & Algo</span>
              </button>
              <button type="button" onclick="toggleOnboardingSubject(this)" class="onboard-subject-btn px-3 py-1.5 rounded-xl border border-[#5551FF] text-[#5551FF] bg-indigo-50 font-semibold text-xs transition-all cursor-pointer flex items-center gap-1.5 shadow-2xs">
                <span class="subject-check">✓</span>
                <span>Database Systems (DBMS)</span>
              </button>
              <button type="button" onclick="toggleOnboardingSubject(this)" class="onboard-subject-btn px-3 py-1.5 rounded-xl border border-[#5551FF] text-[#5551FF] bg-indigo-50 font-semibold text-xs transition-all cursor-pointer flex items-center gap-1.5 shadow-2xs">
                <span class="subject-check">✓</span>
                <span>Calculus & Linear Algebra</span>
              </button>
              <button type="button" onclick="toggleOnboardingSubject(this)" class="onboard-subject-btn px-3 py-1.5 rounded-xl border border-[#5551FF] text-[#5551FF] bg-indigo-50 font-semibold text-xs transition-all cursor-pointer flex items-center gap-1.5 shadow-2xs">
                <span class="subject-check">✓</span>
                <span>Web Technologies (JS/CSS)</span>
              </button>
              <button type="button" onclick="toggleOnboardingSubject(this)" class="onboard-subject-btn px-3 py-1.5 rounded-xl border border-slate-200 text-slate-700 bg-white hover:bg-slate-50 text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5">
                <span class="subject-check">+</span>
                <span>Operating Systems</span>
              </button>
              <button type="button" onclick="toggleOnboardingSubject(this)" class="onboard-subject-btn px-3 py-1.5 rounded-xl border border-slate-200 text-slate-700 bg-white hover:bg-slate-50 text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5">
                <span class="subject-check">+</span>
                <span>Physics & Mechanics</span>
              </button>
            </div>
          </div>
        </div>

        <div class="pt-4 border-t border-slate-100 flex items-center justify-between gap-4">
          <button type="button" onclick="goToOnboardingStep(1)" class="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition-colors cursor-pointer">
            ← Back to Step 1
          </button>

          <button type="button" onclick="goToOnboardingStep(3)" class="px-6 py-3 bg-[#5551FF] hover:bg-[#4338ca] text-white rounded-xl text-xs font-bold shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98">
            <span>Next: Setup Step 3 →</span>
          </button>
        </div>
      </div>

      <!-- ========================================================
           STEP 3: SETUP STEP THREE (STUDY PREFERENCES & GOALS)
           ======================================================== -->
      <div id="onboard-step-3" class="hidden space-y-6">
        <div class="border-b border-slate-100 pb-3">
          <h3 class="text-base font-bold text-slate-900">Step 3: Study Preferences & Launch</h3>
          <p class="text-xs text-slate-500 mt-0.5">Customize your daily study hours, active study days, and semester target.</p>
        </div>

        <div class="space-y-5">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <!-- Custom Styled Target Daily Study Time Dropdown -->
            <div class="relative custom-dropdown-container">
              <label class="block text-xs font-semibold text-slate-700 mb-1.5">Target Daily Study Time</label>
              
              <!-- Hidden input for form state -->
              <input type="hidden" id="onboard-hours" value="4">

              <!-- Dropdown Trigger Button -->
              <button type="button" onclick="toggleCustomDropdown('onboard-hours')" class="w-full px-3.5 py-2.5 bg-slate-50 hover:bg-slate-100/70 border border-slate-200 hover:border-indigo-300 rounded-xl text-xs font-semibold text-slate-800 transition-all flex items-center justify-between shadow-2xs focus:outline-none focus:ring-2 focus:ring-[#5551FF]/25 cursor-pointer">
                <div id="onboard-hours-label" class="flex items-center gap-2">
                  <span class="font-bold text-slate-800">4 Hours / Day</span>
                  <span class="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-50 text-[#5551FF] border border-indigo-100/80">Recommended</span>
                </div>
                <svg id="onboard-hours-chevron" class="custom-dropdown-chevron w-4 h-4 text-slate-400 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                </svg>
              </button>

              <!-- Custom Dropdown Menu -->
              <div id="onboard-hours-menu" class="custom-dropdown-menu hidden absolute left-0 right-0 top-full mt-1.5 z-50 bg-white/95 backdrop-blur-md border border-slate-200/90 rounded-2xl shadow-xl shadow-slate-200/50 p-1.5 space-y-1">
                <!-- Option 1: 2 Hours -->
                <div data-value="2" onclick="selectCustomDropdownOption('onboard-hours', '2', '<span class=\'font-bold text-slate-800\'>2 Hours / Day</span> <span class=\'text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100\'>Light</span>')" class="dropdown-item px-3 py-2 rounded-xl text-xs font-medium text-slate-700 hover:bg-indigo-50/70 hover:text-[#5551FF] transition-all flex items-center justify-between cursor-pointer group">
                  <div class="flex items-center gap-2">
                    <span class="dropdown-check opacity-0 font-bold text-[#5551FF] text-xs">✓</span>
                    <span class="font-medium text-slate-800 group-hover:text-[#5551FF]">2 Hours / Day</span>
                  </div>
                  <span class="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100">Light</span>
                </div>

                <!-- Option 2: 4 Hours (Default Active) -->
                <div data-value="4" onclick="selectCustomDropdownOption('onboard-hours', '4', '<span class=\'font-bold text-slate-800\'>4 Hours / Day</span> <span class=\'text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-50 text-[#5551FF] border border-indigo-100/80\'>Recommended</span>')" class="dropdown-item px-3 py-2 rounded-xl text-xs font-semibold bg-indigo-50/90 text-[#5551FF] hover:bg-indigo-50 transition-all flex items-center justify-between cursor-pointer group">
                  <div class="flex items-center gap-2">
                    <span class="dropdown-check font-bold text-[#5551FF] text-xs">✓</span>
                    <span class="font-semibold text-[#5551FF]">4 Hours / Day</span>
                  </div>
                  <span class="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-100 text-[#5551FF] border border-indigo-200">Recommended</span>
                </div>

                <!-- Option 3: 6 Hours -->
                <div data-value="6" onclick="selectCustomDropdownOption('onboard-hours', '6', '<span class=\'font-bold text-slate-800\'>6 Hours / Day</span> <span class=\'text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-100\'>Intensive</span>')" class="dropdown-item px-3 py-2 rounded-xl text-xs font-medium text-slate-700 hover:bg-indigo-50/70 hover:text-[#5551FF] transition-all flex items-center justify-between cursor-pointer group">
                  <div class="flex items-center gap-2">
                    <span class="dropdown-check opacity-0 font-bold text-[#5551FF] text-xs">✓</span>
                    <span class="font-medium text-slate-800 group-hover:text-[#5551FF]">6 Hours / Day</span>
                  </div>
                  <span class="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-100">Intensive</span>
                </div>

                <!-- Option 4: 8+ Hours -->
                <div data-value="8" onclick="selectCustomDropdownOption('onboard-hours', '8', '<span class=\'font-bold text-slate-800\'>8+ Hours / Day</span> <span class=\'text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-50 text-rose-600 border border-rose-100\'>Exam Crunch</span>')" class="dropdown-item px-3 py-2 rounded-xl text-xs font-medium text-slate-700 hover:bg-indigo-50/70 hover:text-[#5551FF] transition-all flex items-center justify-between cursor-pointer group">
                  <div class="flex items-center gap-2">
                    <span class="dropdown-check opacity-0 font-bold text-[#5551FF] text-xs">✓</span>
                    <span class="font-medium text-slate-800 group-hover:text-[#5551FF]">8+ Hours / Day</span>
                  </div>
                  <span class="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-50 text-rose-600 border border-rose-100">Exam Crunch</span>
                </div>
              </div>
            </div>

            <div>
              <label class="block text-xs font-semibold text-slate-700 mb-1.5">Preferred Study Window</label>
              <div class="flex items-center gap-2">
                <input type="text" value="06:00 PM" class="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-center">
                <span class="text-xs text-slate-400">to</span>
                <input type="text" value="10:00 PM" class="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-center">
              </div>
            </div>
          </div>

          <div>
            <label class="block text-xs font-semibold text-slate-700 mb-1.5">Preferred Study Days</label>
            <div class="flex flex-wrap gap-2">
              <button type="button" onclick="toggleOnboardingDay(this)" class="onboard-day-btn px-3 py-1.5 rounded-lg text-xs font-bold bg-[#5551FF] text-white shadow-xs transition-colors cursor-pointer select-none">Mon</button>
              <button type="button" onclick="toggleOnboardingDay(this)" class="onboard-day-btn px-3 py-1.5 rounded-lg text-xs font-bold bg-[#5551FF] text-white shadow-xs transition-colors cursor-pointer select-none">Tue</button>
              <button type="button" onclick="toggleOnboardingDay(this)" class="onboard-day-btn px-3 py-1.5 rounded-lg text-xs font-bold bg-[#5551FF] text-white shadow-xs transition-colors cursor-pointer select-none">Wed</button>
              <button type="button" onclick="toggleOnboardingDay(this)" class="onboard-day-btn px-3 py-1.5 rounded-lg text-xs font-bold bg-[#5551FF] text-white shadow-xs transition-colors cursor-pointer select-none">Thu</button>
              <button type="button" onclick="toggleOnboardingDay(this)" class="onboard-day-btn px-3 py-1.5 rounded-lg text-xs font-bold bg-[#5551FF] text-white shadow-xs transition-colors cursor-pointer select-none">Fri</button>
              <button type="button" onclick="toggleOnboardingDay(this)" class="onboard-day-btn px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors cursor-pointer select-none">Sat</button>
              <button type="button" onclick="toggleOnboardingDay(this)" class="onboard-day-btn px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors cursor-pointer select-none">Sun</button>
            </div>
          </div>

          <div>
            <label class="block text-xs font-semibold text-slate-700 mb-1.5">Primary Academic Goal for this Semester</label>
            <textarea id="onboard-goal" rows="2" placeholder="e.g. Master Data Structures and maintain a 3.8+ GPA this term" class="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm resize-none focus:bg-white focus:border-[#5551FF] focus:ring-2 focus:ring-indigo-100 transition-all outline-none">Computer Science major focusing on AI and algorithms. Maintain a 3.8+ GPA this term.</textarea>
          </div>
        </div>

        <div class="pt-4 border-t border-slate-100 flex items-center justify-between gap-4">
          <button type="button" onclick="goToOnboardingStep(2)" class="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition-colors cursor-pointer">
            ← Back to Profile Setup
          </button>

          <button type="button" onclick="handleFinishOnboarding(event)" class="px-6 py-3 bg-[#5551FF] hover:bg-[#4338ca] text-white rounded-xl text-xs font-bold shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98">
            <span>✨ Complete Setup & Launch Planner</span>
          </button>
        </div>
      </div>

    </div>
  `;
}

export function initOnboardingPage() {
  const container = document.getElementById('onboarding-layout');
  if (container) {
    container.innerHTML = getOnboardingPageHTML();
  }
}
