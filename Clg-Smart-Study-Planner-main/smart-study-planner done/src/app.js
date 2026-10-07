/**
 * ============================================================================
 * SMART STUDY PLANNER - MAIN APPLICATION ENTRY POINT
 * ============================================================================
 * Modular, decoupled architecture separating data state, utilities, services,
 * view controllers, modal interactions, and event handlers.
 * 
 * Directory Structure:
 * ├── src/
 * │   ├── app.js                          (Main entry point & window orchestrator)
 * │   ├── data/
 * │   │   ├── seedData.js                 (Initial study planner mock database)
 * │   │   └── state.js                    (LocalStorage persistence & migrations)
 * │   ├── utils/
 * │   │   ├── toast.js                    (Bottom-right toast notifications)
 * │   │   ├── audio.js                    (Web Audio API alert chime synthesizer)
 * │   │   └── modal.js                    (Accessible modal dialog manager)
 * │   ├── services/
 * │   │   ├── apiService.js               (REST API specification & backend client)
 * │   │   └── landingDemoService.js       (AI calendar auto-rebalance simulation)
 * │   └── controllers/
 * │       ├── navigationController.js     (Sidebar & view layout routing)
 * │       ├── dashboardController.js      (Main academic KPI & timeline views)
 * │       ├── subjectsController.js       (Course cards & subject progress)
 * │       ├── scheduleController.js       (Weekly timetable & mini-calendar)
 * │       ├── tasksController.js          (Task filters & "See More" preview pagination)
 * │       ├── examsController.js          (Exam preparation score & topic breakdown)
 * │       ├── examRemindersController.js  (Countdown reminder alarms & test alerts)
 * │       ├── goalsController.js          (Active, completed, & archived targets)
 * │       ├── notificationsController.js  (Notification inbox & read status)
 * │       └── profileController.js        (Student profile & security settings)
 * ============================================================================
 */

import { appState, loadState, saveState, resetState } from './data/state.js';
import { showToast } from './utils/toast.js';
import { openModal, closeModal } from './utils/modal.js';
import { playNotificationChime } from './utils/audio.js';
import { ApiService } from './services/apiService.js';
import { initLandingInteractivity } from './services/landingDemoService.js';

// Controllers
import {
  switchView,
  switchMode,
  toggleSidebar,
  toggleAuthSubView,
  handleSignupSubmit,
  currentView,
  currentMode,
  sidebarOpen
} from './controllers/navigationController.js';

import { renderDashboard } from './controllers/dashboardController.js';
import { renderSubjects, handleAddSubject } from './controllers/subjectsController.js';
import {
  renderSchedule,
  handleAddSchedule,
  navigateSchedule,
  setScheduleView,
  selectMiniCalendarDate,
  deleteScheduleItem,
  syncCalendarSchedule
} from './controllers/scheduleController.js';

import {
  renderTasks,
  setTaskFilter,
  toggleTasksExpanded,
  toggleTaskCompletion,
  handleAddTask,
  currentTaskFilter,
  tasksExpanded,
  TASKS_PREVIEW_LIMIT
} from './controllers/tasksController.js';

import {
  renderExams,
  setFeaturedExam,
  toggleExamTopic,
  addTopicToExamList,
  removeTopicFromExamList,
  renderExamTopicsList,
  handleCreateExam,
  examTopicsList
} from './controllers/examsController.js';

import {
  openExamReminderModal,
  renderExamRemindersModal,
  toggleExamReminder,
  deleteExamReminder,
  applyReminderPreset,
  handleCustomReminderSubmit,
  quickAddExamReminder,
  triggerTestExamNotification,
  addCustomExamReminder,
  currentReminderExamId
} from './controllers/examRemindersController.js';

import {
  renderGoals,
  setGoalFilter,
  restoreGoal,
  handleCreateGoal,
  currentGoalFilter
} from './controllers/goalsController.js';

import {
  renderNotifications,
  markAllNotificationsRead,
  clearAllNotifications
} from './controllers/notificationsController.js';

import {
  renderProfile,
  renderSettings,
  handleSaveProfile,
  handleChangePassword,
  renderAllAvatars,
  triggerProfilePhotoUpload,
  handleProfilePhotoSelected,
  removeProfilePhoto,
  setPresetPhoto
} from './controllers/profileController.js';

import {
  initOnboarding,
  goToOnboardingStep,
  handleFinishOnboarding,
  toggleOnboardingDay,
  toggleOnboardingSubject,
  toggleCustomDropdown,
  selectCustomDropdownOption
} from './controllers/onboardingController.js';

// Views
import {
  initMenuBars,
  initLandingPage,
  initAuthPages,
  initOnboardingPage,
  initModals,
  initAppPages
} from './views/index.js';

// ---------------------------------------------------------------------------
// GLOBAL INITIALIZATION ON DOM READY
// ---------------------------------------------------------------------------
function initApp() {
  // 1. Initialize decoupled modular view layouts and individual page views
  initMenuBars();
  initLandingPage();
  initAuthPages();
  initOnboardingPage();
  initModals();
  initAppPages();

  // 2. Attach form listeners
  const addSubForm = document.getElementById('add-subject-form');
  if (addSubForm) addSubForm.addEventListener('submit', handleAddSubject);

  const addTaskForm = document.getElementById('add-task-form');
  if (addTaskForm) addTaskForm.addEventListener('submit', handleAddTask);

  const addSchForm = document.getElementById('add-schedule-form');
  if (addSchForm) addSchForm.addEventListener('submit', handleAddSchedule);

  const createExamForm = document.getElementById('create-exam-form');
  if (createExamForm) createExamForm.addEventListener('submit', handleCreateExam);

  const createGoalForm = document.getElementById('create-goal-form');
  if (createGoalForm) createGoalForm.addEventListener('submit', handleCreateGoal);

  const editProfileForm = document.getElementById('edit-profile-form');
  if (editProfileForm) editProfileForm.addEventListener('submit', handleSaveProfile);

  const changePwdForm = document.getElementById('change-password-form');
  if (changePwdForm) changePwdForm.addEventListener('submit', handleChangePassword);

  // Goal percentage slider live readout
  const slider = document.getElementById('goal-progress-slider');
  const sliderVal = document.getElementById('goal-slider-val');
  if (slider && sliderVal) {
    slider.addEventListener('input', () => {
      sliderVal.textContent = `${slider.value}%`;
    });
  }

  // Initial renders
  renderDashboard();
  renderSubjects();
  renderSchedule();
  renderTasks('all');
  renderExams();
  renderGoals('active');
  renderNotifications();
  renderProfile();
  renderSettings();
  renderExamTopicsList();

  // Show the public landing page first; the planner remains available from its CTA.
  switchMode('landing');
}

if (document.readyState === 'loading') {
  window.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}

// ---------------------------------------------------------------------------
// WINDOW EXPORTS (FOR HTML INLINE EVENT HANDLERS)
// ---------------------------------------------------------------------------
window.switchView = switchView;
window.switchMode = switchMode;
window.toggleSidebar = toggleSidebar;
window.toggleTasksExpanded = toggleTasksExpanded;
window.toggleAuthSubView = toggleAuthSubView;
window.handleSignupSubmit = handleSignupSubmit;
window.setTaskFilter = setTaskFilter;
window.setGoalFilter = setGoalFilter;
window.toggleTaskCompletion = toggleTaskCompletion;
window.toggleExamTopic = toggleExamTopic;
window.restoreGoal = restoreGoal;
window.markAllNotificationsRead = markAllNotificationsRead;
window.clearAllNotifications = clearAllNotifications;
window.openModal = openModal;
window.closeModal = closeModal;
window.addTopicToExamList = addTopicToExamList;
window.removeTopicFromExamList = removeTopicFromExamList;
window.showToast = showToast;

// Exam Reminders Exports
window.openExamReminderModal = openExamReminderModal;
window.renderExamRemindersModal = renderExamRemindersModal;
window.toggleExamReminder = toggleExamReminder;
window.deleteExamReminder = deleteExamReminder;
window.applyReminderPreset = applyReminderPreset;
window.handleCustomReminderSubmit = handleCustomReminderSubmit;
window.quickAddExamReminder = quickAddExamReminder;
window.triggerTestExamNotification = triggerTestExamNotification;
window.setFeaturedExam = setFeaturedExam;
window.currentReminderExamId = currentReminderExamId;

// Onboarding Exports
window.initOnboarding = initOnboarding;
window.goToOnboardingStep = goToOnboardingStep;
window.handleFinishOnboarding = handleFinishOnboarding;
window.toggleOnboardingDay = toggleOnboardingDay;
window.toggleOnboardingSubject = toggleOnboardingSubject;
window.toggleCustomDropdown = toggleCustomDropdown;
window.selectCustomDropdownOption = selectCustomDropdownOption;

// Profile Photo Exports
window.triggerProfilePhotoUpload = triggerProfilePhotoUpload;
window.handleProfilePhotoSelected = handleProfilePhotoSelected;
window.removeProfilePhoto = removeProfilePhoto;
window.setPresetPhoto = setPresetPhoto;
window.renderAllAvatars = renderAllAvatars;

// Schedule Exports
window.navigateSchedule = navigateSchedule;
window.setScheduleView = setScheduleView;
window.selectMiniCalendarDate = selectMiniCalendarDate;
window.deleteScheduleItem = deleteScheduleItem;
window.syncCalendarSchedule = syncCalendarSchedule;
window.renderSchedule = renderSchedule;

// Export state reference for debugging if needed
window.appState = appState;
