/**
 * ============================================================================
 * MODALS VIEW COMPONENT
 * ============================================================================
 * Contains all dialog popups and accessible modal drawers:
 * 1. Add Subject Modal
 * 2. Add Task Modal
 * 3. Schedule Study Session Modal
 * 4. Create Exam Plan Modal
 * 5. Manage Exam Reminders Modal (Dedicated Countdown Alert System)
 * 6. Create Goal Modal
 * 7. Edit Profile Modal
 * 8. Change Password Modal
 * 9. Backend Developer Handbook Modal
 */

export function getModalsHTML() {
  return `
    <!-- MODAL 1: Add Subject Modal -->
    <div id="add-subject-modal" class="modal-backdrop hidden fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4">
      <div class="bg-white rounded-2xl shadow-xl max-w-lg w-full border border-slate-100 overflow-hidden">
        <div class="p-6 pb-2 flex items-center justify-between">
          <div>
            <h2 class="text-xl font-bold text-slate-900">Add New Subject</h2>
            <p class="text-xs text-slate-500 mt-0.5">Configure your course details to start tracking progress.</p>
          </div>
          <button onclick="closeModal('add-subject-modal')" class="text-slate-400 hover:text-slate-600 p-1 cursor-pointer">✕</button>
        </div>

        <form id="add-subject-form" class="p-6 space-y-4">
          <div>
            <label class="block text-xs font-semibold text-slate-700 mb-1">Subject Name *</label>
            <input id="subject-name-input" type="text" required placeholder="e.g. Data Structures & Algorithms" class="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm">
          </div>
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block text-xs font-semibold text-slate-700 mb-1">Course Code</label>
              <input id="subject-code-input" type="text" placeholder="E.G. CS201" class="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm">
            </div>
            <div>
              <label class="block text-xs font-semibold text-slate-700 mb-1">Instructor</label>
              <input id="subject-instructor-input" type="text" placeholder="e.g. Dr. Alan Turing" class="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm">
            </div>
          </div>

          <div>
            <label class="block text-xs font-semibold text-slate-700 mb-2">Subject Color Identifier</label>
            <div class="flex items-center gap-3">
              <label class="cursor-pointer"><input type="radio" name="subject-color" value="#4F46E5" checked class="hidden peer"><span class="w-8 h-8 rounded-full bg-[#4F46E5] block peer-checked:ring-2 peer-checked:ring-offset-2 peer-checked:ring-[#5551FF]"></span></label>
              <label class="cursor-pointer"><input type="radio" name="subject-color" value="#7C3AED" class="hidden peer"><span class="w-8 h-8 rounded-full bg-[#7C3AED] block peer-checked:ring-2 peer-checked:ring-offset-2 peer-checked:ring-[#5551FF]"></span></label>
              <label class="cursor-pointer"><input type="radio" name="subject-color" value="#059669" class="hidden peer"><span class="w-8 h-8 rounded-full bg-[#059669] block peer-checked:ring-2 peer-checked:ring-offset-2 peer-checked:ring-[#5551FF]"></span></label>
              <label class="cursor-pointer"><input type="radio" name="subject-color" value="#F43F5E" class="hidden peer"><span class="w-8 h-8 rounded-full bg-[#F43F5E] block peer-checked:ring-2 peer-checked:ring-offset-2 peer-checked:ring-[#5551FF]"></span></label>
              <label class="cursor-pointer"><input type="radio" name="subject-color" value="#0284C7" class="hidden peer"><span class="w-8 h-8 rounded-full bg-[#0284C7] block peer-checked:ring-2 peer-checked:ring-offset-2 peer-checked:ring-[#5551FF]"></span></label>
            </div>
          </div>

          <div class="pt-4 flex justify-end gap-3 border-t border-slate-100">
            <button type="button" onclick="closeModal('add-subject-modal')" class="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 rounded-lg cursor-pointer">Cancel</button>
            <button type="submit" class="px-5 py-2.5 text-xs font-semibold text-white bg-[#5551FF] hover:bg-[#4338ca] rounded-xl shadow-xs cursor-pointer">+ Add Subject</button>
          </div>
        </form>
      </div>
    </div>

    <!-- MODAL 2: Add Task Modal -->
    <div id="add-task-modal" class="modal-backdrop hidden fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4">
      <div class="bg-white rounded-2xl shadow-xl max-w-xl w-full border border-slate-100 overflow-hidden">
        <div class="p-6 pb-2 flex items-center justify-between">
          <h2 class="text-xl font-bold text-slate-900">Create New Task</h2>
          <button onclick="closeModal('add-task-modal')" class="text-slate-400 hover:text-slate-600 p-1 cursor-pointer">✕</button>
        </div>

        <form id="add-task-form" class="p-6 space-y-4">
          <div>
            <label class="block text-xs font-semibold text-slate-700 mb-1">Task Title</label>
            <input id="task-title-input" type="text" required placeholder="e.g., Complete Chapter 5 Notes" class="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm">
          </div>
          <div>
            <label class="block text-xs font-semibold text-slate-700 mb-1">Description (Optional)</label>
            <textarea id="task-desc-input" rows="2" placeholder="Add details or sub-tasks..." class="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm resize-none"></textarea>
          </div>

          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block text-xs font-semibold text-slate-700 mb-1">Subject</label>
              <select id="task-subject-select" class="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm"></select>
            </div>
            <div>
              <label class="block text-xs font-semibold text-slate-700 mb-1">Due Date</label>
              <input id="task-due-input" type="text" placeholder="Today, 11:59 PM" class="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm">
            </div>
          </div>

          <div class="grid grid-cols-2 gap-3 items-end">
            <div>
              <label class="block text-xs font-semibold text-slate-700 mb-1.5">Priority</label>
              <div class="grid grid-cols-3 gap-1.5 p-1 bg-slate-100 rounded-xl text-center text-xs font-semibold">
                <label class="cursor-pointer"><input type="radio" name="task-priority" value="low" class="hidden peer"><span class="block py-1.5 rounded-lg peer-checked:bg-[#5551FF] peer-checked:text-white text-slate-600">Low</span></label>
                <label class="cursor-pointer"><input type="radio" name="task-priority" value="medium" checked class="hidden peer"><span class="block py-1.5 rounded-lg peer-checked:bg-[#5551FF] peer-checked:text-white text-slate-600">Med</span></label>
                <label class="cursor-pointer"><input type="radio" name="task-priority" value="high" class="hidden peer"><span class="block py-1.5 rounded-lg peer-checked:bg-[#5551FF] peer-checked:text-white text-slate-600">High</span></label>
              </div>
            </div>
            <div>
              <label class="block text-xs font-semibold text-slate-700 mb-1">Estimated Study Time</label>
              <input id="task-mins-input" type="number" value="45" class="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm">
            </div>
          </div>

          <div class="pt-4 flex justify-end gap-3 border-t border-slate-100">
            <button type="button" onclick="closeModal('add-task-modal')" class="px-4 py-2 text-xs font-semibold text-slate-600 rounded-lg cursor-pointer">Cancel</button>
            <button type="submit" class="px-5 py-2.5 text-xs font-semibold text-white bg-[#5551FF] hover:bg-[#4338ca] rounded-xl shadow-xs cursor-pointer">+ Create Task</button>
          </div>
        </form>
      </div>
    </div>

    <!-- MODAL 3: Schedule Study Session Modal -->
    <div id="add-schedule-modal" class="modal-backdrop hidden fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4">
      <div class="bg-white rounded-2xl shadow-xl max-w-xl w-full border border-slate-100 overflow-hidden">
        <div class="p-6 pb-2 flex items-center justify-between">
          <div>
            <h2 class="text-xl font-bold text-slate-900">Schedule Study Session</h2>
            <p class="text-xs text-slate-500 mt-0.5">Plan your next deep work block.</p>
          </div>
          <button onclick="closeModal('add-schedule-modal')" class="text-slate-400 hover:text-slate-600 p-1 cursor-pointer">✕</button>
        </div>

        <form id="add-schedule-form" class="p-6 space-y-4">
          <div>
            <label class="block text-xs font-semibold text-slate-700 mb-1">Subject</label>
            <select id="schedule-subject-select" class="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm"></select>
          </div>
          <div class="grid grid-cols-3 gap-3">
            <div>
              <label class="block text-xs font-semibold text-slate-700 mb-1">Date</label>
              <input type="date" value="2023-10-24" class="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs">
            </div>
            <div>
              <label class="block text-xs font-semibold text-slate-700 mb-1">Start Time</label>
              <input type="time" value="11:00" class="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs">
            </div>
            <div>
              <label class="block text-xs font-semibold text-slate-700 mb-1">End Time</label>
              <input type="time" value="13:00" class="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs">
            </div>
          </div>
          <div>
            <label class="block text-xs font-semibold text-slate-700 mb-1">Study Goal</label>
            <input id="schedule-goal-input" type="text" placeholder="e.g., Complete Chapter 3 Exercises" class="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm">
          </div>

          <div class="pt-4 flex justify-end gap-3 border-t border-slate-100">
            <button type="button" onclick="closeModal('add-schedule-modal')" class="px-4 py-2 text-xs font-semibold text-slate-600 rounded-lg cursor-pointer">Cancel</button>
            <button type="submit" class="px-5 py-2.5 text-xs font-semibold text-white bg-[#5551FF] hover:bg-[#4338ca] rounded-xl shadow-xs cursor-pointer">+ Schedule Session</button>
          </div>
        </form>
      </div>
    </div>

    <!-- MODAL 4: Create Exam Plan Modal -->
    <div id="create-exam-modal" class="modal-backdrop hidden fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4 overflow-y-auto">
      <div class="bg-white rounded-2xl shadow-xl max-w-xl w-full border border-slate-100 overflow-hidden my-6">
        <div class="p-6 pb-2 flex items-center justify-between">
          <div>
            <h2 class="text-xl font-bold text-slate-900">Create Exam Plan</h2>
            <p class="text-xs text-slate-500 mt-0.5">Set up a structured preparation strategy for your upcoming exam.</p>
          </div>
          <button onclick="closeModal('create-exam-modal')" class="text-slate-400 hover:text-slate-600 p-1 cursor-pointer">✕</button>
        </div>

        <form id="create-exam-form" class="p-6 space-y-4">
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block text-xs font-semibold text-slate-700 mb-1">Exam Name</label>
              <input id="exam-name-input" type="text" required placeholder="e.g., DBMS Midterm" class="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm">
            </div>
            <div>
              <label class="block text-xs font-semibold text-slate-700 mb-1">Subject</label>
              <select id="exam-subject-select" class="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm"></select>
            </div>
          </div>
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block text-xs font-semibold text-slate-700 mb-1">Exam Date</label>
              <input type="date" value="2023-11-15" class="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm">
            </div>
            <div>
              <label class="block text-xs font-semibold text-slate-700 mb-1">Target Score (%)</label>
              <input id="exam-target-score" type="number" value="90" class="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm">
            </div>
          </div>

          <div>
            <label class="block text-xs font-semibold text-slate-700 mb-1">Preparation Breakdown</label>
            <div class="flex gap-2 mb-2">
              <input id="exam-topic-input" type="text" placeholder="e.g., Relational Algebra" class="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs">
              <button type="button" onclick="addTopicToExamList()" class="px-3 py-2 bg-[#5551FF]/10 text-[#5551FF] font-semibold text-xs rounded-xl cursor-pointer">+ Add</button>
            </div>
            <div id="exam-topics-container" class="space-y-1.5"></div>
          </div>

          <!-- Notification Reminders Configuration -->
          <div class="p-3.5 bg-indigo-50/50 border border-indigo-100 rounded-xl space-y-2.5">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-1.5">
                <span class="text-sm">🔔</span>
                <label class="text-xs font-bold text-slate-800">Notification Reminders</label>
              </div>
              <span class="text-[10px] font-semibold text-[#5551FF] bg-white px-2 py-0.5 rounded-full border border-indigo-100">Automated Alerts</span>
            </div>
            <p class="text-[11px] text-slate-500">Select when to receive countdown reminders before the exam begins:</p>
            
            <div class="grid grid-cols-2 gap-2 text-xs">
              <label class="flex items-center gap-2 p-2 bg-white rounded-lg border border-slate-200 cursor-pointer hover:border-[#5551FF]">
                <input type="checkbox" id="exam-remind-24h" checked class="w-4 h-4 rounded text-[#5551FF] accent-[#5551FF]">
                <span class="font-medium text-slate-700">24 hours before (1 day)</span>
              </label>
              <label class="flex items-center gap-2 p-2 bg-white rounded-lg border border-slate-200 cursor-pointer hover:border-[#5551FF]">
                <input type="checkbox" id="exam-remind-1h" checked class="w-4 h-4 rounded text-[#5551FF] accent-[#5551FF]">
                <span class="font-medium text-slate-700">1 hour before</span>
              </label>
              <label class="flex items-center gap-2 p-2 bg-white rounded-lg border border-slate-200 cursor-pointer hover:border-[#5551FF]">
                <input type="checkbox" id="exam-remind-3d" class="w-4 h-4 rounded text-[#5551FF] accent-[#5551FF]">
                <span class="font-medium text-slate-700">3 days before</span>
              </label>
              <label class="flex items-center gap-2 p-2 bg-white rounded-lg border border-slate-200 cursor-pointer hover:border-[#5551FF]">
                <input type="checkbox" id="exam-remind-1w" class="w-4 h-4 rounded text-[#5551FF] accent-[#5551FF]">
                <span class="font-medium text-slate-700">1 week before</span>
              </label>
            </div>

            <div class="pt-1 flex items-center gap-2">
              <span class="text-[11px] font-semibold text-slate-600">Custom Reminder:</span>
              <input type="number" id="exam-custom-remind-val" placeholder="e.g. 6" min="1" max="168" class="w-16 px-2 py-1 bg-white border border-slate-200 rounded-lg text-xs font-mono text-center">
              <select id="exam-custom-remind-unit" class="px-2 py-1 bg-white border border-slate-200 rounded-lg text-xs font-medium text-slate-700">
                <option value="hours">hours before</option>
                <option value="days">days before</option>
                <option value="minutes">minutes before</option>
              </select>
            </div>
          </div>

          <div class="pt-4 flex justify-end gap-3 border-t border-slate-100">
            <button type="button" onclick="closeModal('create-exam-modal')" class="px-4 py-2 text-xs font-semibold text-slate-600 rounded-lg cursor-pointer">Cancel</button>
            <button type="submit" class="px-5 py-2.5 text-xs font-semibold text-white bg-[#5551FF] hover:bg-[#4338ca] rounded-xl shadow-xs cursor-pointer">+ Create Exam Plan</button>
          </div>
        </form>
      </div>
    </div>

    <!-- MODAL 4B: Manage Exam Reminders Modal -->
    <div id="exam-reminder-modal" class="modal-backdrop hidden fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4 overflow-y-auto">
      <div class="bg-white rounded-2xl shadow-xl max-w-lg w-full border border-slate-100 overflow-hidden my-6">
        <div class="p-6 pb-4 border-b border-slate-100 flex items-start justify-between bg-slate-50/50">
          <div>
            <div class="flex items-center gap-2">
              <span class="p-1.5 rounded-lg bg-indigo-100 text-[#5551FF]">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/></svg>
              </span>
              <h2 class="text-lg font-bold text-slate-900">Exam Notification Reminders</h2>
            </div>
            <p id="reminder-modal-subtitle" class="text-xs text-slate-500 mt-1">Configure automated alerts and countdown timers for your upcoming exam.</p>
          </div>
          <button onclick="closeModal('exam-reminder-modal')" class="text-slate-400 hover:text-slate-600 p-1 cursor-pointer">✕</button>
        </div>

        <div class="p-6 space-y-6">
          <!-- Active Target Exam Banner -->
          <div class="p-3.5 bg-gradient-to-r from-blue-50/80 to-indigo-50/80 border border-blue-100 rounded-xl flex items-center justify-between">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-xl bg-white border border-blue-100 text-[#5551FF] flex items-center justify-center font-bold text-base shadow-2xs">
                🗄️
              </div>
              <div>
                <h3 id="reminder-exam-title" class="text-sm font-bold text-slate-900">DBMS Midterm</h3>
                <p id="reminder-exam-meta" class="text-[11px] text-slate-500 font-medium">OCT 28, 2023 · 10:00 AM (12 Days Left)</p>
              </div>
            </div>
            <button onclick="triggerTestExamNotification(currentReminderExamId)" class="px-2.5 py-1.5 bg-white hover:bg-indigo-50 border border-indigo-200 text-[#5551FF] rounded-lg text-xs font-semibold shadow-2xs transition-colors flex items-center gap-1 cursor-pointer">
              <span>🔔 Test Alert</span>
            </button>
          </div>

          <!-- Configured Reminders List -->
          <div>
            <div class="flex items-center justify-between mb-2.5">
              <h4 class="text-xs font-bold uppercase tracking-wider text-slate-500">Configured Reminders</h4>
              <span id="reminder-active-count-badge" class="text-[11px] font-semibold text-[#5551FF] bg-indigo-50 px-2 py-0.5 rounded-full">2 Active</span>
            </div>
            
            <div id="reminder-items-list" class="space-y-2 max-h-52 overflow-y-auto pr-1">
              <!-- Dynamically populated by renderExamRemindersModal() -->
            </div>
          </div>

          <!-- Add New Custom Reminder Section -->
          <div class="p-4 bg-slate-50/80 border border-slate-200 rounded-xl space-y-3">
            <h4 class="text-xs font-bold text-slate-800 flex items-center gap-1.5">
              <span>+</span> <span>Add Custom Reminder</span>
            </h4>

            <!-- Quick Preset Chips -->
            <div>
              <span class="text-[11px] text-slate-500 font-medium block mb-1.5">Quick Presets:</span>
              <div class="flex flex-wrap gap-1.5">
                <button type="button" onclick="applyReminderPreset(1, 'hours', '1 hour before')" class="px-2.5 py-1 bg-white hover:bg-indigo-50 hover:text-[#5551FF] hover:border-indigo-200 border border-slate-200 rounded-lg text-[11px] font-semibold text-slate-700 transition-colors cursor-pointer">+ 1 Hour</button>
                <button type="button" onclick="applyReminderPreset(3, 'hours', '3 hours before')" class="px-2.5 py-1 bg-white hover:bg-indigo-50 hover:text-[#5551FF] hover:border-indigo-200 border border-slate-200 rounded-lg text-[11px] font-semibold text-slate-700 transition-colors cursor-pointer">+ 3 Hours</button>
                <button type="button" onclick="applyReminderPreset(12, 'hours', '12 hours before')" class="px-2.5 py-1 bg-white hover:bg-indigo-50 hover:text-[#5551FF] hover:border-indigo-200 border border-slate-200 rounded-lg text-[11px] font-semibold text-slate-700 transition-colors cursor-pointer">+ 12 Hours</button>
                <button type="button" onclick="applyReminderPreset(24, 'hours', '24 hours before')" class="px-2.5 py-1 bg-white hover:bg-indigo-50 hover:text-[#5551FF] hover:border-indigo-200 border border-slate-200 rounded-lg text-[11px] font-semibold text-slate-700 transition-colors cursor-pointer">+ 24 Hours (1 Day)</button>
                <button type="button" onclick="applyReminderPreset(48, 'hours', '48 hours before')" class="px-2.5 py-1 bg-white hover:bg-indigo-50 hover:text-[#5551FF] hover:border-indigo-200 border border-slate-200 rounded-lg text-[11px] font-semibold text-slate-700 transition-colors cursor-pointer">+ 48 Hours (2 Days)</button>
                <button type="button" onclick="applyReminderPreset(168, 'days', '1 week before')" class="px-2.5 py-1 bg-white hover:bg-indigo-50 hover:text-[#5551FF] hover:border-indigo-200 border border-slate-200 rounded-lg text-[11px] font-semibold text-slate-700 transition-colors cursor-pointer">+ 1 Week</button>
              </div>
            </div>

            <!-- Custom Form Inputs -->
            <form id="custom-reminder-form" onsubmit="handleCustomReminderSubmit(event)" class="space-y-3 pt-1">
              <div class="grid grid-cols-2 gap-2.5">
                <div>
                  <label class="block text-[11px] font-semibold text-slate-600 mb-1">Time Offset</label>
                  <div class="flex items-center gap-1.5">
                    <input type="number" id="custom-remind-num" required min="1" max="720" value="2" class="w-16 px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-mono font-bold text-center">
                    <select id="custom-remind-unit" class="flex-1 px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-medium text-slate-700">
                      <option value="hours">Hours before</option>
                      <option value="days">Days before</option>
                      <option value="minutes">Minutes before</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label class="block text-[11px] font-semibold text-slate-600 mb-1">Delivery Channel</label>
                  <select id="custom-remind-channel" class="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-medium text-slate-700">
                    <option value="in-app">In-App Notification</option>
                    <option value="browser">Browser Push + Sound</option>
                    <option value="email">Email Digest</option>
                  </select>
                </div>
              </div>

              <div class="flex justify-end pt-1">
                <button type="submit" class="px-4 py-2 bg-[#5551FF] hover:bg-[#4338ca] text-white rounded-xl text-xs font-semibold shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer">
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
                  <span>Add Reminder</span>
                </button>
              </div>
            </form>
          </div>
        </div>

        <div class="px-6 py-3 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between text-xs">
          <span class="text-slate-400 text-[11px]">Synced with Background Cron & Push Dispatcher</span>
          <button type="button" onclick="closeModal('exam-reminder-modal')" class="px-4 py-1.5 bg-slate-900 text-white font-semibold rounded-lg hover:bg-slate-800 transition-colors cursor-pointer">Done</button>
        </div>
      </div>
    </div>

    <!-- MODAL 5: Create Goal Modal -->
    <div id="create-goal-modal" class="modal-backdrop hidden fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4">
      <div class="bg-white rounded-2xl shadow-xl max-w-xl w-full border border-slate-100 overflow-hidden">
        <div class="p-6 pb-2 flex items-center justify-between">
          <div>
            <h2 class="text-xl font-bold text-slate-900">Create New Goal</h2>
            <p class="text-xs text-slate-500 mt-0.5">Set a new objective to track your academic progress.</p>
          </div>
          <button onclick="closeModal('create-goal-modal')" class="text-slate-400 hover:text-slate-600 p-1 cursor-pointer">✕</button>
        </div>

        <form id="create-goal-form" class="p-6 space-y-4">
          <div>
            <label class="block text-xs font-semibold text-slate-700 mb-1">Goal Name</label>
            <input id="goal-name-input" type="text" required placeholder="e.g., Finish Python Syllabus" class="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm">
          </div>
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block text-xs font-semibold text-slate-700 mb-1">Category</label>
              <select id="goal-category-select" class="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm">
                <option value="Academics">Academics</option>
                <option value="Routine">Routine</option>
                <option value="Research">Research</option>
                <option value="Personal">Personal</option>
              </select>
            </div>
            <div>
              <label class="block text-xs font-semibold text-slate-700 mb-1">Target Date</label>
              <input type="date" value="2023-11-15" class="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm">
            </div>
          </div>
          <div>
            <div class="flex justify-between text-xs font-semibold mb-1">
              <span>Initial Progress</span>
              <span id="goal-slider-val" class="text-[#5551FF] font-bold">0%</span>
            </div>
            <input id="goal-progress-slider" type="range" min="0" max="100" value="0" class="w-full accent-[#5551FF]">
          </div>

          <div class="pt-4 flex justify-end gap-3 border-t border-slate-100">
            <button type="button" onclick="closeModal('create-goal-modal')" class="px-4 py-2 text-xs font-semibold text-slate-600 rounded-lg cursor-pointer">Cancel</button>
            <button type="submit" class="px-5 py-2.5 text-xs font-semibold text-white bg-[#5551FF] hover:bg-[#4338ca] rounded-xl shadow-xs cursor-pointer">+ Create Goal</button>
          </div>
        </form>
      </div>
    </div>

    <!-- MODAL 6: Edit Profile Modal -->
    <div id="edit-profile-modal" class="modal-backdrop hidden fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4 overflow-y-auto">
      <div class="bg-white rounded-2xl shadow-xl max-w-xl w-full border border-slate-100 overflow-hidden my-6">
        <div class="p-6 pb-2 flex items-center justify-between">
          <h2 class="text-xl font-bold text-slate-900">Edit Profile</h2>
          <button onclick="closeModal('edit-profile-modal')" class="text-slate-400 hover:text-slate-600 p-1 cursor-pointer">✕</button>
        </div>

        <form id="edit-profile-form" class="p-6 space-y-4">
          <!-- Profile Photo Selector in Edit Modal -->
          <div class="flex items-center gap-4 p-3 bg-slate-50 rounded-xl border border-slate-200/80">
            <div id="modal-edit-avatar-preview" class="w-14 h-14 rounded-full overflow-hidden bg-gradient-to-tr from-indigo-500 to-indigo-600 text-white font-bold text-lg flex items-center justify-center shadow-xs shrink-0 ring-2 ring-white">
              AM
            </div>
            <div class="flex-1 min-w-0">
              <span class="block text-xs font-bold text-slate-800">Profile Photo</span>
              <p class="text-[11px] text-slate-500 leading-tight">PNG, JPG, or WEBP up to 5MB.</p>
              <div class="flex items-center gap-2 mt-1.5">
                <button type="button" onclick="triggerProfilePhotoUpload()" class="px-2.5 py-1 bg-white hover:bg-slate-100 border border-slate-300 text-slate-700 text-xs font-semibold rounded-lg shadow-2xs transition-colors cursor-pointer inline-flex items-center gap-1.5">
                  <svg class="w-3.5 h-3.5 text-[#5551FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"/></svg>
                  <span>Upload Photo</span>
                </button>
                <button type="button" id="modal-remove-photo-btn" onclick="removeProfilePhoto()" class="hidden px-2 py-1 text-rose-600 hover:bg-rose-50 border border-transparent hover:border-rose-200 text-xs font-semibold rounded-lg transition-colors cursor-pointer">
                  Remove
                </button>
              </div>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block text-xs font-semibold text-slate-700 mb-1">First Name</label>
              <input id="edit-first-name" type="text" required class="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm">
            </div>
            <div>
              <label class="block text-xs font-semibold text-slate-700 mb-1">Last Name</label>
              <input id="edit-last-name" type="text" required class="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm">
            </div>
          </div>
          <div>
            <label class="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
            <input id="edit-email" type="email" required class="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm">
          </div>
          <div>
            <label class="block text-xs font-semibold text-slate-700 mb-1">Bio</label>
            <textarea id="edit-bio" rows="2" class="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm resize-none"></textarea>
          </div>
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block text-xs font-semibold text-slate-700 mb-1">Institution</label>
              <input id="edit-inst" type="text" class="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm">
            </div>
            <div>
              <label class="block text-xs font-semibold text-slate-700 mb-1">Current Year</label>
              <select id="edit-year" class="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm">
                <option value="Sophomore">Sophomore</option>
                <option value="Junior (Year 3)">Junior (Year 3)</option>
                <option value="Senior">Senior</option>
              </select>
            </div>
          </div>
          <div>
            <label class="block text-xs font-semibold text-slate-700 mb-1">Major / Program</label>
            <input id="edit-major" type="text" class="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm">
          </div>

          <div class="pt-4 flex justify-end gap-3 border-t border-slate-100">
            <button type="button" onclick="closeModal('edit-profile-modal')" class="px-4 py-2 text-xs font-semibold text-slate-600 rounded-lg cursor-pointer">Cancel</button>
            <button type="submit" class="px-5 py-2 text-xs font-semibold text-white bg-[#5551FF] hover:bg-[#4338ca] rounded-xl shadow-xs cursor-pointer">Save Changes</button>
          </div>
        </form>
      </div>
    </div>

    <!-- MODAL 7: Change Password Modal -->
    <div id="change-password-modal" class="modal-backdrop hidden fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4">
      <div class="bg-white rounded-2xl shadow-xl max-w-md w-full border border-slate-100 overflow-hidden p-6 sm:p-8 space-y-6">
        <div class="text-center">
          <div class="w-12 h-12 rounded-full bg-blue-50 text-[#5551FF] flex items-center justify-center mx-auto mb-3 text-xl font-bold">
            🔄
          </div>
          <h2 class="text-xl font-bold text-slate-900">Change Password</h2>
          <p class="text-xs text-slate-500 mt-1">Update your security credentials to keep your study data safe.</p>
        </div>

        <form id="change-password-form" class="space-y-4">
          <div>
            <label class="block text-xs font-semibold text-slate-700 mb-1">Current Password</label>
            <input id="pwd-current" type="password" required placeholder="Enter current password" class="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm">
          </div>
          <div>
            <label class="block text-xs font-semibold text-slate-700 mb-1">Password</label>
            <input id="pwd-new" type="password" required placeholder="Create your password" class="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm">
          </div>
          <div>
            <label class="block text-xs font-semibold text-slate-700 mb-1">Confirm Password</label>
            <input id="pwd-confirm" type="password" required placeholder="Re-enter your password" class="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm">
          </div>

          <div class="pt-2 flex gap-3">
            <button type="button" onclick="closeModal('change-password-modal')" class="flex-1 py-2.5 border border-slate-200 text-slate-600 rounded-xl text-xs font-semibold cursor-pointer">Cancel</button>
            <button type="submit" class="flex-1 py-2.5 bg-[#5551FF] hover:bg-[#4338ca] text-white rounded-xl text-xs font-semibold shadow-xs cursor-pointer">Update Password →</button>
          </div>
        </form>
      </div>
    </div>

    <!-- MODAL 8: Backend Developer Handbook Modal -->
    <div id="backend-guide-modal" class="modal-backdrop hidden fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 sm:p-6 overflow-y-auto">
      <div class="bg-white rounded-2xl shadow-2xl max-w-4xl w-full border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        <div class="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div>
            <h2 class="text-base font-bold text-slate-900">Backend Developer Integration Handbook</h2>
            <p class="text-xs text-slate-500">REST Endpoints, JSON Contracts & SQL Schema for Smart Study Planner</p>
          </div>
          <button onclick="closeModal('backend-guide-modal')" class="text-slate-400 hover:text-slate-600 p-1 cursor-pointer">✕</button>
        </div>

        <div class="p-6 overflow-y-auto space-y-4 text-xs">
          <div class="p-3 bg-blue-50 border border-blue-200 rounded-xl text-blue-900">
            <strong>Note for Backend Developer:</strong> Every view in this frontend reads and writes to structured JSON models in <code>/src/app.js</code>. Replace the localStorage methods with standard <code>fetch()</code> or Axios requests.
          </div>

          <h3 class="font-bold text-slate-900 text-sm">Key RESTful Endpoints</h3>
          <div class="grid gap-2">
            <div class="p-3 bg-slate-50 rounded-xl border border-slate-200 flex justify-between items-center">
              <div><span class="px-2 py-0.5 bg-blue-100 text-blue-700 font-bold rounded">GET</span> <code class="font-bold">/api/v1/dashboard/summary</code></div>
              <span class="text-slate-500">Aggregated study hours, tasks due, upcoming exams</span>
            </div>
            <div class="p-3 bg-slate-50 rounded-xl border border-slate-200 flex justify-between items-center">
              <div><span class="px-2 py-0.5 bg-emerald-100 text-emerald-700 font-bold rounded">POST</span> <code class="font-bold">/api/v1/tasks</code></div>
              <span class="text-slate-500">Create new assignment or study task</span>
            </div>
            <div class="p-3 bg-slate-50 rounded-xl border border-slate-200 flex justify-between items-center">
              <div><span class="px-2 py-0.5 bg-amber-100 text-amber-700 font-bold rounded">PATCH</span> <code class="font-bold">/api/v1/tasks/:id/toggle</code></div>
              <span class="text-slate-500">Toggle task completed status</span>
            </div>
            <div class="p-3 bg-slate-50 rounded-xl border border-slate-200 flex justify-between items-center">
              <div><span class="px-2 py-0.5 bg-blue-100 text-blue-700 font-bold rounded">GET</span> <code class="font-bold">/api/v1/schedule?view=week</code></div>
              <span class="text-slate-500">Returns timetable blocks for weekly grid</span>
            </div>
            <div class="p-3 bg-slate-50 rounded-xl border border-slate-200 flex justify-between items-center">
              <div><span class="px-2 py-0.5 bg-blue-100 text-blue-700 font-bold rounded">GET</span> <code class="font-bold">/api/v1/exams</code></div>
              <span class="text-slate-500">Upcoming exam countdowns & topic breakdown checklist</span>
            </div>
            <div class="p-3 bg-indigo-50/70 rounded-xl border border-indigo-200 flex justify-between items-center">
              <div><span class="px-2 py-0.5 bg-emerald-100 text-emerald-700 font-bold rounded">POST</span> <code class="font-bold">/api/v1/exams/:id/reminders</code></div>
              <span class="text-indigo-900 font-medium">Add custom countdown reminder (e.g. 24h, 1h, 3d before)</span>
            </div>
            <div class="p-3 bg-indigo-50/70 rounded-xl border border-indigo-200 flex justify-between items-center">
              <div><span class="px-2 py-0.5 bg-amber-100 text-amber-700 font-bold rounded">PATCH</span> <code class="font-bold">/api/v1/exams/:id/reminders/:remId/toggle</code></div>
              <span class="text-indigo-900 font-medium">Enable/disable notification alarm</span>
            </div>
            <div class="p-3 bg-indigo-50/70 rounded-xl border border-indigo-200 flex justify-between items-center">
              <div><span class="px-2 py-0.5 bg-rose-100 text-rose-700 font-bold rounded">DELETE</span> <code class="font-bold">/api/v1/exams/:id/reminders/:remId</code></div>
              <span class="text-indigo-900 font-medium">Remove reminder from scheduler</span>
            </div>
          </div>

          <h3 class="font-bold text-slate-900 text-sm pt-2">Database Schema for Reminders (PostgreSQL / MySQL)</h3>
          <pre class="p-3 bg-slate-900 text-indigo-200 rounded-xl overflow-x-auto font-mono text-[11px] leading-relaxed">
CREATE TABLE exam_reminders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    exam_id UUID NOT NULL REFERENCES exams(id) ON DELETE CASCADE,
    offset_minutes INT NOT NULL,       -- 60 for 1h, 1440 for 24h, 4320 for 3d
    label VARCHAR(64) NOT NULL,        -- '24 hours before', '1 hour before'
    channel VARCHAR(32) NOT NULL DEFAULT 'in-app', -- 'in-app', 'push', 'email'
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    is_sent BOOLEAN NOT NULL DEFAULT FALSE,
    sent_at TIMESTAMP WITH TIME ZONE NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Background Cron / Worker Query (Runs every 5 minutes):
-- SELECT * FROM exam_reminders r JOIN exams e ON e.id = r.exam_id
-- WHERE r.is_active = TRUE AND r.is_sent = FALSE 
--   AND (e.exam_date - (r.offset_minutes || ' minutes')::INTERVAL) &lt;= NOW();
          </pre>
        </div>

        <div class="px-6 py-3 border-t border-slate-100 bg-white flex justify-end">
          <button onclick="closeModal('backend-guide-modal')" class="px-4 py-2 bg-slate-900 text-white rounded-lg text-xs font-semibold cursor-pointer">Close</button>
        </div>
      </div>
    </div>
  `;
}

export function initModals() {
  const container = document.getElementById('modals-container');
  if (container) {
    container.innerHTML = getModalsHTML();
  }
}
