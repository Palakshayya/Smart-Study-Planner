/**
 * ============================================================================
 * PAGES DIRECTORY BARREL EXPORT & INITIALIZER
 * ============================================================================
 * Modularized page views:
 * - dashboardPage.js: Executive dashboard overview
 * - subjectsPage.js: Academic workload and subjects grid
 * - schedulePage.js: Interactive timetable and mini calendar
 * - tasksPage.js: Task list and SVG completion ring
 * - examsPage.js: Exam milestone preparation & countdown
 * - goalsPage.js: Academic goals tracking
 * - progressPage.js: Performance metrics & consistency heatmap
 * - notificationsPage.js: Student alert feed
 * - profilePage.js: Student academic identity & stats
 * - settingsPage.js: Preferences and security
 * - landingPage.js: Dedicated landing page
 */

import { getDashboardPageHTML } from './dashboardPage.js';
import { getSubjectsPageHTML } from './subjectsPage.js';
import { getSchedulePageHTML } from './schedulePage.js';
import { getTasksPageHTML } from './tasksPage.js';
import { getExamsPageHTML } from './examsPage.js';
import { getGoalsPageHTML } from './goalsPage.js';
import { getProgressPageHTML } from './progressPage.js';
import { getNotificationsPageHTML } from './notificationsPage.js';
import { getProfilePageHTML } from './profilePage.js';
import { getSettingsPageHTML } from './settingsPage.js';

export * from './dashboardPage.js';
export * from './subjectsPage.js';
export * from './schedulePage.js';
export * from './tasksPage.js';
export * from './examsPage.js';
export * from './goalsPage.js';
export * from './progressPage.js';
export * from './notificationsPage.js';
export * from './profilePage.js';
export * from './settingsPage.js';
export * from './landingPage.js';

/**
 * Renders all modular page views into the main content viewport
 */
export function initAppPages() {
  const container = document.getElementById('main-content-container') || document.querySelector('main');
  if (container) {
    container.innerHTML = `
      ${getDashboardPageHTML()}
      ${getSubjectsPageHTML()}
      ${getSchedulePageHTML()}
      ${getTasksPageHTML()}
      ${getExamsPageHTML()}
      ${getGoalsPageHTML()}
      ${getProgressPageHTML()}
      ${getNotificationsPageHTML()}
      ${getProfilePageHTML()}
      ${getSettingsPageHTML()}
    `;
  }
}
