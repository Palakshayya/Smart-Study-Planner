/**
 * ============================================================================
 * NAVIGATION & VIEW ROUTER CONTROLLER
 * ============================================================================
 * Controls sidebar collapse/expansion, viewport navigation switching between
 * dashboard, subjects, schedule, tasks, exams, goals, notifications, settings,
 * and presentation modes (Planner App, Landing Page, Onboarding, Auth).
 */

import { showToast } from '../utils/toast.js';
import { playNotificationChime } from '../utils/audio.js';
import { appState, saveState } from '../data/state.js';
import { initLandingInteractivity } from '../services/landingDemoService.js';
import { renderDashboard } from './dashboardController.js';
import { renderSubjects } from './subjectsController.js';
import { renderSchedule } from './scheduleController.js';
import { renderTasks, getCurrentTaskFilter } from './tasksController.js';
import { renderExams } from './examsController.js';
import { renderGoals, getCurrentGoalFilter } from './goalsController.js';
import { renderNotifications } from './notificationsController.js';
import { renderProfile, renderSettings } from './profileController.js';
import { initOnboarding } from './onboardingController.js';

export let currentView = 'dashboard';
export let currentMode = 'landing';
export let sidebarOpen = true;

export function toggleSidebar() {
  const sidebar = document.getElementById('app-sidebar');
  const backdrop = document.getElementById('sidebar-backdrop');
  if (!sidebar) return;

  const isMobile = window.innerWidth < 768;

  if (isMobile) {
    const isHidden = sidebar.classList.contains('hidden');
    if (isHidden) {
      sidebar.classList.remove('hidden');
      sidebar.classList.add('fixed', 'inset-y-0', 'left-0', 'z-40', 'w-72', 'shadow-2xl');
      if (backdrop) backdrop.classList.remove('hidden');
    } else {
      sidebar.classList.add('hidden');
      sidebar.classList.remove('fixed', 'inset-y-0', 'left-0', 'z-40', 'w-72', 'shadow-2xl');
      if (backdrop) backdrop.classList.add('hidden');
    }
  } else {
    // Desktop: toggle md:hidden for responsive side menu collapse/expand
    const isHidden = sidebar.classList.contains('md:hidden');
    if (isHidden) {
      sidebar.classList.remove('md:hidden');
      sidebarOpen = true;
      showToast('Side menu opened', 'info');
    } else {
      sidebar.classList.add('md:hidden');
      sidebarOpen = false;
      showToast('Side menu collapsed (Click Menu to restore)', 'info');
    }
  }
}

export function switchView(viewName) {
  currentView = viewName;

  // Auto-close mobile sidebar if open
  if (window.innerWidth < 768) {
    const sidebar = document.getElementById('app-sidebar');
    const backdrop = document.getElementById('sidebar-backdrop');
    if (sidebar && !sidebar.classList.contains('hidden')) {
      sidebar.classList.add('hidden');
      sidebar.classList.remove('fixed', 'inset-y-0', 'left-0', 'z-40', 'w-72', 'shadow-2xl');
      if (backdrop) backdrop.classList.add('hidden');
    }
  }

  // Update nav item active styling
  document.querySelectorAll('.nav-item').forEach((btn) => {
    const target = btn.getAttribute('data-view');
    if (target === viewName) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  // Hide all panels, show target panel
  document.querySelectorAll('.view-panel').forEach((panel) => {
    panel.classList.remove('active');
  });

  const activePanel = document.getElementById(`view-${viewName}`);
  if (activePanel) {
    activePanel.classList.add('active');
  }

  // Trigger view-specific re-renders
  if (viewName === 'dashboard') renderDashboard();
  if (viewName === 'subjects') renderSubjects();
  if (viewName === 'schedule') renderSchedule();
  if (viewName === 'tasks') renderTasks(getCurrentTaskFilter());
  if (viewName === 'exams') renderExams();
  if (viewName === 'goals') renderGoals(getCurrentGoalFilter());
  if (viewName === 'notifications') renderNotifications();
  if (viewName === 'profile') renderProfile();
  if (viewName === 'settings') renderSettings();

  const mainEl = document.querySelector('main');
  if (mainEl) mainEl.scrollTo({ top: 0, behavior: 'smooth' });
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

export function switchMode(mode) {
  currentMode = mode;

  const appLayout = document.getElementById('app-layout');
  const landingLayout = document.getElementById('landing-layout');
  const onboardingLayout = document.getElementById('onboarding-layout');
  const authLayout = document.getElementById('auth-layout');
  const mainHeader = document.getElementById('main-header');
  const sidebarToggleBtn = document.getElementById('sidebar-toggle-btn');

  if (mainHeader) {
    if (mode === 'landing') {
      mainHeader.classList.add('hidden');
    } else {
      mainHeader.classList.remove('hidden');
    }
  }

  if (sidebarToggleBtn) {
    if (mode === 'app') {
      sidebarToggleBtn.classList.remove('hidden');
    } else {
      sidebarToggleBtn.classList.add('hidden');
    }
  }

  if (appLayout) appLayout.classList.add('hidden');
  if (landingLayout) landingLayout.classList.add('hidden');
  if (onboardingLayout) onboardingLayout.classList.add('hidden');
  if (authLayout) authLayout.classList.add('hidden');

  document.querySelectorAll('.mode-btn').forEach((btn) => {
    if (btn.getAttribute('data-mode') === mode) {
      btn.className = 'mode-btn px-3 py-1 rounded-md transition-all bg-white text-slate-900 shadow-xs font-semibold';
    } else {
      btn.className = 'mode-btn px-3 py-1 rounded-md transition-all text-slate-600 hover:text-slate-900 font-medium';
    }
  });

  if (mode === 'app') {
    if (appLayout) appLayout.classList.remove('hidden');
    switchView(currentView);
  } else if (mode === 'landing') {
    if (landingLayout) landingLayout.classList.remove('hidden');
    initLandingInteractivity();
  } else if (mode === 'onboarding') {
    if (onboardingLayout) onboardingLayout.classList.remove('hidden');
    initOnboarding();
  } else if (mode === 'login' || mode === 'signup' || mode === 'forgot_password') {
    if (authLayout) authLayout.classList.remove('hidden');
    toggleAuthSubView(mode);
  }
}

export function toggleAuthSubView(type) {
  const loginBox = document.getElementById('login-box');
  const signupBox = document.getElementById('signup-box');
  const forgotBox = document.getElementById('forgot-box');
  if (!loginBox) return;

  if (loginBox) loginBox.classList.add('hidden');
  if (signupBox) signupBox.classList.add('hidden');
  if (forgotBox) forgotBox.classList.add('hidden');

  if (type === 'signup') {
    if (signupBox) signupBox.classList.remove('hidden');
  } else if (type === 'forgot_password') {
    if (forgotBox) forgotBox.classList.remove('hidden');
  } else {
    if (loginBox) loginBox.classList.remove('hidden');
  }
}

export function handleSignupSubmit(e) {
  if (e) e.preventDefault();
  const nameInput = document.getElementById('signup-name');
  const emailInput = document.getElementById('signup-email');
  const majorInput = document.getElementById('signup-major');

  const fullName = nameInput ? nameInput.value.trim() : '';
  const email = emailInput ? emailInput.value.trim() : '';
  const major = majorInput ? majorInput.value.trim() : '';

  if (!fullName) {
    showToast('Please enter your full name', 'warning');
    return;
  }

  const parts = fullName.split(' ');
  const firstName = parts[0] || 'Student';
  const lastName = parts.slice(1).join(' ') || '';

  if (!appState.user) appState.user = {};
  appState.user.firstName = firstName;
  appState.user.lastName = lastName;
  if (email) appState.user.email = email;
  if (major) appState.user.major = major;

  saveState(appState);
  playNotificationChime();
  showToast(`Welcome, ${firstName}! Your account has been created.`, 'success');

  // Proceed directly to the 3-step setup wizard
  setTimeout(() => {
    switchMode('onboarding');
  }, 300);
}
