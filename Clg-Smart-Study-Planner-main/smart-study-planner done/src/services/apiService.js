/**
 * ============================================================================
 * BACKEND API SERVICE & INTEGRATION CONTRACTS
 * ============================================================================
 * 
 * 👨‍💻 DEAR BACKEND DEVELOPER:
 * This module defines the complete RESTful API contract for the Smart Study Planner.
 * To connect to your real backend, replace the local operations in each controller
 * with calls through this API client.
 * 
 * RESTful Endpoints:
 * ----------------------------------------------------------------------------
 * 1. DASHBOARD & ANALYTICS:
 *    GET    /api/v1/dashboard/summary
 *    Response: { studyHours, tasksDue, upcomingExams, overallProgress, weeklyHours }
 * 
 * 2. SUBJECTS:
 *    GET    /api/v1/subjects
 *    POST   /api/v1/subjects
 *           Body: { name: string, courseCode: string, instructor: string, color: string }
 * 
 * 3. TASKS:
 *    GET    /api/v1/tasks?status=all|today|upcoming|completed|overdue
 *    POST   /api/v1/tasks
 *           Body: { title: string, description: string, subjectId: string, dueDate: string, priority: string, estimatedMinutes: number }
 *    PATCH  /api/v1/tasks/:id/toggle
 *    DELETE /api/v1/tasks/:id
 * 
 * 4. SCHEDULE & TIMETABLE:
 *    GET    /api/v1/schedule?view=week&date=YYYY-MM-DD
 *    POST   /api/v1/schedule
 *           Body: { subjectId: string, title: string, sessionType: string }
 * 
 * 5. EXAMS & ROADMAPS:
 *    GET    /api/v1/exams
 *    POST   /api/v1/exams
 *           Body: { title: string, subjectId: string, targetScore: number, reminders: Array, topics: Array }
 *    PATCH  /api/v1/exams/:id/topics/:topicId/toggle
 * 
 * 6. EXAM NOTIFICATION REMINDERS:
 *    GET    /api/v1/exams/:id/reminders
 *    POST   /api/v1/exams/:id/reminders
 *           Body: { hoursBefore: number, value: number, unit: string, label: string, channel: string, enabled: boolean }
 *    PATCH  /api/v1/exams/:id/reminders/:reminderId/toggle
 *    DELETE /api/v1/exams/:id/reminders/:reminderId
 *    POST   /api/v1/exams/:id/reminders/test
 * 
 * 7. GOALS:
 *    GET    /api/v1/goals?status=active|completed|archived
 *    POST   /api/v1/goals
 *           Body: { title: string, category: string, progressPercentage: number }
 *    PATCH  /api/v1/goals/:id/restore
 * 
 * 8. NOTIFICATIONS:
 *    GET    /api/v1/notifications
 *    PATCH  /api/v1/notifications/read-all
 *    DELETE /api/v1/notifications/clear
 * 
 * 9. USER PROFILE & AUTH:
 *    GET    /api/v1/profile
 *    PUT    /api/v1/profile
 *    POST   /api/v1/auth/change-password
 * ============================================================================
 */

export const API_BASE_URL = '/api/v1';

export class ApiService {
  static async getDashboardSummary() {
    return {
      studyHours: 4.5,
      tasksDue: 5,
      upcomingExams: 2,
      overallProgress: 68
    };
  }
}
