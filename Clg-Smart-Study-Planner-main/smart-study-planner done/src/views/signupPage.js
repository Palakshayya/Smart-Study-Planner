/**
 * ============================================================================
 * SIGN UP & AUTHENTICATION PAGES VIEW COMPONENT
 * ============================================================================
 * Contains the dedicated Sign Up page (opened by "Get Started"), the Login page,
 * the Password Reset view, and the collegiate illustration sidebar.
 */

export function getSignupPageHTML() {
  return `
    <div id="signup-box" class="max-w-md w-full space-y-6">
      <div>
        <div class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-indigo-50 text-[#5551FF] text-xs font-bold mb-2">
          <span>🎓 Get Started Free</span>
        </div>
        <h2 class="text-2xl font-bold text-slate-900 tracking-tight">Create your account</h2>
        <p class="text-xs text-slate-500 mt-1">Start your automated academic schedule in less than 2 minutes.</p>
      </div>

      <form onsubmit="handleSignupSubmit(event)" class="space-y-3.5">
        <div>
          <label class="block text-xs font-semibold text-slate-700 mb-1">Full Name *</label>
          <input id="signup-name" type="text" required placeholder="e.g. Alex Mercer" value="Alex Mercer" class="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:border-[#5551FF] focus:ring-2 focus:ring-indigo-100 transition-all outline-none">
        </div>

        <div>
          <label class="block text-xs font-semibold text-slate-700 mb-1">Student / University Email *</label>
          <input id="signup-email" type="email" required placeholder="alex@university.edu" value="alex@university.edu" class="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:border-[#5551FF] focus:ring-2 focus:ring-indigo-100 transition-all outline-none">
        </div>

        <div>
          <label class="block text-xs font-semibold text-slate-700 mb-1">Course / Major</label>
          <input id="signup-major" type="text" placeholder="e.g. Computer Science, B.S." value="Computer Science, B.S." class="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:border-[#5551FF] focus:ring-2 focus:ring-indigo-100 transition-all outline-none">
        </div>

        <div>
          <label class="block text-xs font-semibold text-slate-700 mb-1">Create Password *</label>
          <input id="signup-password" type="password" required placeholder="At least 8 characters" value="password123" class="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:border-[#5551FF] focus:ring-2 focus:ring-indigo-100 transition-all outline-none">
        </div>

        <div class="flex items-center gap-2 text-xs text-slate-600 pt-0.5">
          <input type="checkbox" checked required class="rounded text-[#5551FF] accent-[#5551FF] cursor-pointer">
          <span>I agree to the Terms of Service & Privacy Policy</span>
        </div>

        <button type="submit" class="w-full py-3 bg-[#5551FF] hover:bg-[#4338ca] text-white rounded-xl text-xs font-bold shadow-xs hover:shadow-indigo-500/20 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer">
          <span>Create Account & Continue →</span>
        </button>

        <button type="button" onclick="switchMode('onboarding'); showToast('Google sign-up initiated', 'info');" class="w-full py-2.5 border border-slate-200 hover:bg-slate-50 rounded-xl text-xs font-semibold text-slate-700 flex items-center justify-center gap-2 transition-colors cursor-pointer">
          <svg class="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
          </svg>
          <span>Sign up with Google</span>
        </button>
      </form>

      <div class="pt-2 text-center space-y-2 border-t border-slate-100 text-xs">
        <p class="text-slate-500">
          Already have an account? 
          <button onclick="toggleAuthSubView('login')" class="text-[#5551FF] font-bold hover:underline cursor-pointer">
            Log in
          </button>
        </p>
        <div>
          <button onclick="switchMode('landing')" class="text-slate-400 hover:text-slate-600 transition-colors cursor-pointer">
            ← Back to Home
          </button>
        </div>
      </div>
    </div>
  `;
}

export function getLoginPageHTML() {
  return `
    <div id="login-box" class="max-w-md w-full space-y-6">
      <div>
        <div class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-indigo-50 text-[#5551FF] text-xs font-bold mb-2">
          <span>👋 Welcome Back</span>
        </div>
        <h2 class="text-2xl font-bold text-slate-900 tracking-tight">Sign in to your account</h2>
        <p class="text-xs text-slate-500 mt-1">Please enter your student credentials to continue.</p>
      </div>

      <form onsubmit="event.preventDefault(); switchMode('app'); showToast('Signed in successfully! Welcome back, Alex.', 'success');" class="space-y-4">
        <div>
          <label class="block text-xs font-semibold text-slate-700 mb-1">Student / University Email</label>
          <input type="email" required value="alex@university.edu" class="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:border-[#5551FF] focus:ring-2 focus:ring-indigo-100 transition-all outline-none">
        </div>

        <div>
          <label class="block text-xs font-semibold text-slate-700 mb-1">Password</label>
          <input type="password" required value="••••••••" class="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:border-[#5551FF] focus:ring-2 focus:ring-indigo-100 transition-all outline-none">
        </div>

        <div class="flex items-center justify-between text-xs">
          <label class="flex items-center gap-2 text-slate-600 cursor-pointer">
            <input type="checkbox" checked class="rounded text-[#5551FF] accent-[#5551FF]">
            <span>Remember me</span>
          </label>
          <button type="button" onclick="toggleAuthSubView('forgot_password')" class="text-[#5551FF] font-semibold hover:underline cursor-pointer">
            Forgot password?
          </button>
        </div>

        <button type="submit" class="w-full py-3 bg-[#5551FF] hover:bg-[#4338ca] text-white rounded-xl text-xs font-bold shadow-xs hover:shadow-indigo-500/20 active:scale-95 transition-all cursor-pointer">
          Sign in
        </button>

        <button type="button" onclick="switchMode('app'); showToast('Signed in with Google', 'info');" class="w-full py-2.5 border border-slate-200 hover:bg-slate-50 rounded-xl text-xs font-semibold text-slate-700 flex items-center justify-center gap-2 transition-colors cursor-pointer">
          <svg class="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
          </svg>
          <span>Continue with Google</span>
        </button>
      </form>

      <div class="pt-2 text-center space-y-2 border-t border-slate-100 text-xs">
        <p class="text-slate-500">
          Don't have an account? 
          <button onclick="toggleAuthSubView('signup')" class="text-[#5551FF] font-bold hover:underline cursor-pointer">
            Get Started / Sign up
          </button>
        </p>
        <div>
          <button onclick="switchMode('landing')" class="text-slate-400 hover:text-slate-600 transition-colors cursor-pointer">
            ← Back to Home
          </button>
        </div>
      </div>
    </div>
  `;
}

export function getForgotPasswordHTML() {
  return `
    <div id="forgot-box" class="hidden max-w-md w-full space-y-6 text-center">
      <div class="w-12 h-12 rounded-2xl bg-blue-50 text-[#5551FF] flex items-center justify-center mx-auto text-2xl">
        📖
      </div>
      <div>
        <h2 class="text-2xl font-extrabold text-slate-900">Reset your password</h2>
        <p class="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
          Enter your email address and we'll send you a link to reset your password.
        </p>
      </div>

      <form onsubmit="event.preventDefault(); showToast('Reset instructions sent to your email!', 'success'); toggleAuthSubView('login');" class="space-y-4 text-left">
        <div>
          <label class="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
          <input type="email" required value="alex@university.edu" class="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none">
        </div>

        <button type="submit" class="w-full py-3 bg-[#5551FF] hover:bg-[#4338ca] text-white rounded-xl text-xs font-bold shadow-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer">
          <span>Send Reset Link →</span>
        </button>
      </form>

      <div class="pt-2 text-center space-y-1 text-xs">
        <button onclick="toggleAuthSubView('login')" class="text-xs text-[#5551FF] font-semibold hover:underline cursor-pointer">
          ← Back to Login
        </button>
        <div>
          <button onclick="switchMode('landing')" class="text-xs text-slate-400 hover:text-slate-600 transition-colors cursor-pointer">
            ← Back to Home
          </button>
        </div>
      </div>
    </div>
  `;
}

export function getAuthLayoutHTML() {
  return `
    <!-- Left Illustration Banner -->
    <div class="w-full md:w-1/2 bg-blue-50/60 p-8 sm:p-12 flex flex-col justify-between border-r border-slate-100">
      <div class="space-y-1">
        <div onclick="switchMode('landing')" class="flex items-center gap-2 cursor-pointer select-none">
          <span class="text-xl">🎓</span>
          <h1 class="text-2xl font-extrabold text-[#5551FF]">Smart Study Planner</h1>
        </div>
        <p class="text-xs text-slate-500 font-medium">Plan Smarter, Study Better, Achieve More</p>
      </div>

      <div class="py-12 flex flex-col items-center justify-center text-center">
        <div class="w-64 h-64 rounded-3xl bg-white shadow-xl border border-blue-100 p-6 flex flex-col items-center justify-center space-y-4">
          <span class="text-6xl">👩‍🎓</span>
          <div class="space-y-1">
            <span class="text-xs font-bold text-slate-800 block">Personalized Academic Schedule</span>
            <span class="text-[11px] text-slate-400 block">Calculus · DBMS · Python · Web Tech</span>
          </div>
        </div>
      </div>

      <div class="text-xs text-slate-500 font-medium flex items-center justify-between">
        <div class="flex items-center gap-2">
          <span>✓</span> <span>Trusted by over 10,000 students worldwide</span>
        </div>
        <button onclick="switchMode('landing')" class="text-xs text-[#5551FF] font-semibold hover:underline cursor-pointer">
          ← Return to Home
        </button>
      </div>
    </div>

    <!-- Right Form Box (Houses Login, Sign Up & Forgot Password views) -->
    <div class="w-full md:w-1/2 p-8 sm:p-14 flex items-center justify-center">
      ${getLoginPageHTML()}
      ${getSignupPageHTML()}
      ${getForgotPasswordHTML()}
    </div>
  `;
}

export function initAuthPages() {
  const container = document.getElementById('auth-layout');
  if (container) {
    container.innerHTML = getAuthLayoutHTML();
  }
}
