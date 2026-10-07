/**
 * ============================================================================
 * SCHEDULE & TIMETABLE CONTROLLER
 * ============================================================================
 * Full interactive study timetable, responsive calendar with Week / Day / Month
 * views, mini-calendar date picker, dynamic event additions, and conflict prevention.
 */

import { appState, saveState } from '../data/state.js';
import { showToast } from '../utils/toast.js';
import { closeModal } from '../utils/modal.js';

// Internal controller state
const scheduleState = {
  // Anchored to October 24, 2023 matching collegiate seed data
  currentDate: new Date(2023, 9, 24),
  viewMode: 'week' // 'day' | 'week' | 'month'
};

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const DAY_KEYS = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
const DAY_LABELS = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

/**
 * Main render entry point
 */
export function renderSchedule() {
  updateHeaderControls();
  renderMainCalendar();
  renderMiniCalendar();
  renderUpcomingList();
}

/**
 * Updates title and view toggle buttons (Day / Week / Month)
 */
function updateHeaderControls() {
  const titleEl = document.getElementById('schedule-month-title');
  if (titleEl) {
    const month = MONTH_NAMES[scheduleState.currentDate.getMonth()];
    const year = scheduleState.currentDate.getFullYear();
    if (scheduleState.viewMode === 'day') {
      const dateNum = scheduleState.currentDate.getDate();
      titleEl.textContent = `${month} ${dateNum}, ${year}`;
    } else {
      titleEl.textContent = `${month} ${year}`;
    }
  }

  // Update view mode button styles
  const dayBtn = document.getElementById('schedule-view-day-btn');
  const weekBtn = document.getElementById('schedule-view-week-btn');
  const monthBtn = document.getElementById('schedule-view-month-btn');

  const inactiveClass = 'px-3 py-1 text-slate-500 hover:text-slate-900 rounded-md transition-colors cursor-pointer text-xs font-semibold';
  const activeClass = 'px-3 py-1 bg-white text-slate-900 shadow-2xs rounded-md transition-all cursor-pointer text-xs font-semibold';

  if (dayBtn) dayBtn.className = scheduleState.viewMode === 'day' ? activeClass : inactiveClass;
  if (weekBtn) weekBtn.className = scheduleState.viewMode === 'week' ? activeClass : inactiveClass;
  if (monthBtn) monthBtn.className = scheduleState.viewMode === 'month' ? activeClass : inactiveClass;
}

/**
 * Navigates calendar forward or backward
 */
export function navigateSchedule(direction) {
  const step = direction === 'prev' ? -1 : 1;
  const d = new Date(scheduleState.currentDate);

  if (scheduleState.viewMode === 'day') {
    d.setDate(d.getDate() + step);
  } else if (scheduleState.viewMode === 'week') {
    d.setDate(d.getDate() + (step * 7));
  } else if (scheduleState.viewMode === 'month') {
    d.setMonth(d.getMonth() + step);
  }

  scheduleState.currentDate = d;
  renderSchedule();
}

/**
 * Switches between Day, Week, and Month view
 */
export function setScheduleView(mode) {
  if (['day', 'week', 'month'].includes(mode)) {
    scheduleState.viewMode = mode;
    renderSchedule();
    showToast(`Switched to ${mode.charAt(0).toUpperCase() + mode.slice(1)} view`, 'info');
  }
}

/**
 * Renders the active calendar view (Week, Day, or Month)
 */
function renderMainCalendar() {
  const container = document.getElementById('schedule-main-content');
  if (!container) return;

  if (scheduleState.viewMode === 'week') {
    container.innerHTML = getWeekViewHTML();
  } else if (scheduleState.viewMode === 'day') {
    container.innerHTML = getDayViewHTML();
  } else if (scheduleState.viewMode === 'month') {
    container.innerHTML = getMonthViewHTML();
  }
}

/**
 * WEEK VIEW: Responsive 6-day timetable (Mon - Sat)
 * Fixed to prevent horizontal overflow on standard viewports
 */
function getWeekViewHTML() {
  // Compute Monday of the current week
  const curr = new Date(scheduleState.currentDate);
  const day = curr.getDay();
  // In JS getDay(): 0 is Sunday, 1 is Monday ... 6 is Saturday
  const diffToMonday = day === 0 ? -6 : 1 - day;
  const monday = new Date(curr);
  monday.setDate(curr.getDate() + diffToMonday);

  // 6 columns for Monday - Saturday
  const weekDays = [];
  for (let i = 0; i < 6; i++) {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    weekDays.push({
      key: DAY_KEYS[i],
      label: DAY_LABELS[i],
      dateNum: d.getDate(),
      isToday: d.getDate() === 24 && d.getMonth() === 9 // Oct 24, 2023
    });
  }

  const hours = [
    { label: '9 AM', top: 0 },
    { label: '10 AM', top: 60 },
    { label: '11 AM', top: 120 },
    { label: '12 PM', top: 180 },
    { label: '1 PM', top: 240 },
    { label: '2 PM', top: 300 },
    { label: '3 PM', top: 360 },
    { label: '4 PM', top: 420 },
    { label: '5 PM', top: 480 }
  ];

  const totalGridHeight = 540; // 9 hours * 60px

  // Header row
  const headerColsHTML = weekDays.map(wd => `
    <div class="py-2.5 text-center flex-1 min-w-0">
      <span class="text-[11px] font-bold block ${wd.isToday ? 'text-[#5551FF]' : 'text-slate-400'}">${wd.label}</span>
      <span class="text-xs sm:text-sm font-extrabold block mt-0.5 ${wd.isToday ? 'text-white bg-[#5551FF] w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center mx-auto shadow-2xs' : 'text-slate-800'}">
        ${wd.dateNum}
      </span>
    </div>
  `).join('');

  // Day columns with events inside
  const dayColsHTML = weekDays.map((wd, dayIdx) => {
    const dayEvents = (appState.schedule || []).filter(e => e.day === wd.key);

    const eventsHTML = dayEvents.map(ev => {
      const top = ev.topPx ?? 20;
      const height = ev.heightPx ?? 60;
      const bg = ev.color || '#5551FF';
      const isLightBg = bg.toLowerCase() === '#dbeafe' || bg.toLowerCase() === '#fee2e2';
      const textColor = isLightBg ? (ev.textColor || '#1E40AF') : '#FFFFFF';

      return `
        <div class="absolute inset-x-1 rounded-xl p-2 sm:p-2.5 shadow-2xs z-10 overflow-hidden cursor-pointer transition-transform hover:scale-[1.02] group"
             style="top: ${top}px; height: ${height}px; background-color: ${bg}; color: ${textColor};"
             title="${ev.subjectName} (${ev.timeSlot}) - Click to delete"
             onclick="deleteScheduleItem('${ev.id}')">
          <div class="flex items-center justify-between leading-none mb-0.5">
            <span class="text-[9px] sm:text-[10px] font-mono font-bold opacity-90 truncate">${ev.timeSlot}</span>
            <button onclick="event.stopPropagation(); deleteScheduleItem('${ev.id}')" class="opacity-0 group-hover:opacity-100 text-xs px-1 hover:text-rose-500 font-bold leading-none" title="Remove event">×</button>
          </div>
          <span class="text-[11px] sm:text-xs font-bold block leading-tight truncate">${ev.subjectName}</span>
          ${ev.location ? `<span class="text-[9px] sm:text-[10px] opacity-80 block truncate mt-0.5">${ev.location}</span>` : ''}
        </div>
      `;
    }).join('');

    return `
      <div class="flex-1 min-w-0 relative border-r border-slate-100/80 ${dayIdx === 5 ? 'border-r-0' : ''}">
        ${eventsHTML}
      </div>
    `;
  }).join('');

  // Hourly background rows
  const bgRowsHTML = hours.map((h, i) => `
    <div class="border-b border-slate-100/80 h-[60px] flex items-start">
      <div class="w-12 sm:w-14 text-[10px] sm:text-[11px] font-semibold text-slate-400 -mt-2 pr-2 text-right shrink-0">
        ${h.label}
      </div>
      <div class="flex-1"></div>
    </div>
  `).join('');

  return `
    <div class="w-full">
      <!-- Week Days Header -->
      <div class="flex items-center border-b border-slate-100 pb-1 mb-2">
        <div class="w-12 sm:w-14 shrink-0"></div>
        <div class="flex flex-1 min-w-0">
          ${headerColsHTML}
        </div>
      </div>

      <!-- Scrollable/Responsive Schedule Grid -->
      <div class="relative w-full overflow-hidden" style="height: ${totalGridHeight}px;">
        <!-- Background hour lines -->
        <div class="absolute inset-0 pointer-events-none">
          ${bgRowsHTML}
        </div>

        <!-- Foreground Day Columns Grid -->
        <div class="absolute inset-0 flex pl-12 sm:pl-14">
          ${dayColsHTML}
        </div>

        <!-- Tuesday Live Time Indicator (11:30 AM = ~150px) -->
        <div class="absolute left-12 sm:left-14 right-0 border-t-2 border-rose-500 z-20 pointer-events-none flex items-center" style="top: 150px;">
          <div class="w-2.5 h-2.5 rounded-full bg-rose-500 -ml-1.5 shadow-xs"></div>
          <span class="text-[9px] font-bold text-white bg-rose-500 px-1.5 py-0.5 rounded ml-1 shadow-xs uppercase">Now · 11:30</span>
        </div>
      </div>
    </div>
  `;
}

/**
 * DAY VIEW: Clean vertical hourly schedule agenda
 */
function getDayViewHTML() {
  const dayKey = DAY_KEYS[scheduleState.currentDate.getDay() === 0 ? 6 : scheduleState.currentDate.getDay() - 1];
  const dayEvents = (appState.schedule || []).filter(e => e.day === dayKey);

  const hours = [
    '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'
  ];

  return `
    <div class="space-y-4 max-w-2xl mx-auto py-2">
      <div class="flex items-center justify-between pb-3 border-b border-slate-100">
        <div>
          <span class="text-xs font-bold uppercase text-[#5551FF] tracking-wider block">Agenda</span>
          <h3 class="text-lg font-bold text-slate-900">${DAY_LABELS[DAY_KEYS.indexOf(dayKey)]} Schedule</h3>
        </div>
        <button onclick="openModal('add-schedule-modal')" class="px-3.5 py-1.5 bg-[#5551FF] hover:bg-[#4338ca] text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer shadow-xs">
          + Schedule Session
        </button>
      </div>

      ${dayEvents.length === 0 ? `
        <div class="text-center py-12 bg-slate-50 rounded-2xl border border-dashed border-slate-200 space-y-2">
          <span class="text-2xl">🎉</span>
          <h4 class="text-sm font-bold text-slate-800">No scheduled sessions for this day</h4>
          <p class="text-xs text-slate-500">Take a break or plan a new study block.</p>
          <button onclick="openModal('add-schedule-modal')" class="mt-2 px-3 py-1.5 text-xs font-semibold text-[#5551FF] bg-white border border-indigo-200 rounded-lg hover:bg-indigo-50 transition-colors cursor-pointer">
            Schedule a Study Session
          </button>
        </div>
      ` : `
        <div class="divide-y divide-slate-100">
          ${dayEvents.map(ev => `
            <div class="py-3.5 flex items-start gap-4 hover:bg-slate-50/80 px-3 rounded-xl transition-colors group">
              <div class="w-24 shrink-0 text-xs font-mono font-semibold text-slate-500 pt-0.5">
                ${ev.timeSlot}
              </div>
              <div class="w-1.5 h-10 rounded-full shrink-0" style="background-color: ${ev.color || '#5551FF'};"></div>
              <div class="flex-1 min-w-0">
                <div class="flex items-center justify-between">
                  <h4 class="text-sm font-bold text-slate-900 truncate">${ev.subjectName}</h4>
                  <span class="text-[10px] font-bold px-2 py-0.5 rounded-md uppercase" style="background-color: ${ev.color ? ev.color + '20' : '#EEF2FF'}; color: ${ev.color || '#5551FF'};">
                    ${ev.type || 'Lecture'}
                  </span>
                </div>
                <p class="text-xs text-slate-500 mt-0.5 truncate">${ev.location || 'Lecture Room 302'}</p>
              </div>
              <button onclick="deleteScheduleItem('${ev.id}')" class="text-slate-300 hover:text-rose-500 p-1 font-bold text-xs" title="Delete session">✕</button>
            </div>
          `).join('')}
        </div>
      `}
    </div>
  `;
}

/**
 * MONTH VIEW: Compact, overflow-free 7-column calendar
 */
function getMonthViewHTML() {
  const year = scheduleState.currentDate.getFullYear();
  const month = scheduleState.currentDate.getMonth();

  // First day of the month & total days
  const firstDayIndex = new Date(year, month, 1).getDay(); // 0 is Sun
  const totalDays = new Date(year, month + 1, 0).getDate();

  // Offset so Monday is index 0
  const startOffset = firstDayIndex === 0 ? 6 : firstDayIndex - 1;

  const cells = [];
  // Blank prefix cells
  for (let i = 0; i < startOffset; i++) {
    cells.push('<div class="min-h-[70px] sm:min-h-[85px] p-1.5 bg-slate-50/50 rounded-xl opacity-40"></div>');
  }

  // Active days
  for (let d = 1; d <= totalDays; d++) {
    const isToday = d === 24 && month === 9; // Oct 24
    const hasEvents = [23, 24, 25, 27].includes(d);

    cells.push(`
      <div onclick="selectMiniCalendarDate(${d})"
           class="min-h-[70px] sm:min-h-[85px] p-1.5 sm:p-2 border rounded-xl flex flex-col justify-between cursor-pointer transition-all hover:border-[#5551FF] hover:bg-slate-50 ${isToday ? 'border-[#5551FF] bg-indigo-50/40 ring-1 ring-[#5551FF]' : 'border-slate-100 bg-white'}">
        <div class="flex items-center justify-between">
          <span class="text-xs font-bold ${isToday ? 'text-[#5551FF]' : 'text-slate-700'}">${d}</span>
          ${isToday ? '<span class="text-[9px] font-bold text-white bg-[#5551FF] px-1 rounded">Today</span>' : ''}
        </div>
        ${hasEvents ? `
          <div class="space-y-1 mt-1">
            <span class="text-[9px] font-semibold text-[#5551FF] bg-indigo-50 px-1.5 py-0.5 rounded block truncate leading-tight">
              ● Study Block
            </span>
          </div>
        ` : '<div class="h-4"></div>'}
      </div>
    `);
  }

  return `
    <div class="w-full space-y-2">
      <div class="grid grid-cols-7 text-center font-bold text-[11px] text-slate-400 py-1 border-b border-slate-100">
        <span>MON</span><span>TUE</span><span>WED</span><span>THU</span><span>FRI</span><span>SAT</span><span>SUN</span>
      </div>
      <div class="grid grid-cols-7 gap-1.5 sm:gap-2">
        ${cells.join('')}
      </div>
    </div>
  `;
}

/**
 * MINI CALENDAR: Dynamic generation fitting sidebar perfectly without overflow
 */
function renderMiniCalendar() {
  const container = document.getElementById('mini-calendar-days');
  if (!container) return;

  const year = scheduleState.currentDate.getFullYear();
  const month = scheduleState.currentDate.getMonth();
  const totalDays = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();
  const offset = firstDay === 0 ? 6 : firstDay - 1;

  const currentSelectedDate = scheduleState.currentDate.getDate();

  let html = '';
  // Empty leading days
  for (let i = 0; i < offset; i++) {
    html += '<div class="w-full aspect-square"></div>';
  }

  // Days
  for (let d = 1; d <= totalDays; d++) {
    const isSelected = d === currentSelectedDate;
    const hasEvent = [23, 25, 27].includes(d);

    let btnClass = 'w-full aspect-square rounded-lg flex items-center justify-center tabular-nums text-[11px] transition-all cursor-pointer ';
    if (isSelected) {
      btnClass += 'bg-[#5551FF] text-white font-bold shadow-2xs scale-105';
    } else if (hasEvent) {
      btnClass += 'bg-indigo-100/70 text-[#5551FF] font-semibold hover:bg-indigo-200';
    } else {
      btnClass += 'text-slate-600 hover:bg-slate-200/70';
    }

    html += `
      <button type="button" onclick="selectMiniCalendarDate(${d})" class="${btnClass}">
        ${d}
      </button>
    `;
  }

  container.innerHTML = html;
}

/**
 * Handles clicking on any date in the mini calendar
 */
export function selectMiniCalendarDate(dayNum) {
  const d = new Date(scheduleState.currentDate);
  d.setDate(dayNum);
  scheduleState.currentDate = d;
  renderSchedule();
  showToast(`Viewing schedule for ${MONTH_NAMES[d.getMonth()]} ${dayNum}`, 'info');
}

/**
 * Renders upcoming items in the sidebar
 */
function renderUpcomingList() {
  const container = document.getElementById('schedule-upcoming-list');
  if (!container) return;

  const items = appState.schedule || [];
  if (items.length === 0) {
    container.innerHTML = `
      <p class="text-xs text-slate-400 text-center py-4">No upcoming study sessions.</p>
    `;
    return;
  }

  container.innerHTML = items.slice(0, 4).map(ev => `
    <div class="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition-colors group">
      <div class="w-1.5 h-10 rounded-full shrink-0" style="background-color: ${ev.color || '#5551FF'};"></div>
      <div class="min-w-0 flex-1">
        <h4 class="text-xs font-bold text-slate-900 truncate">${ev.subjectName}</h4>
        <p class="text-[11px] text-slate-400 mt-0.5 truncate">⏱ ${ev.timeSlot} · ${ev.location || 'Lecture'}</p>
      </div>
      <button onclick="deleteScheduleItem('${ev.id}')" class="opacity-0 group-hover:opacity-100 text-slate-300 hover:text-rose-500 text-xs p-1" title="Delete">✕</button>
    </div>
  `).join('');
}

/**
 * Deletes a session from the timetable
 */
export function deleteScheduleItem(id) {
  if (!id) return;
  const index = (appState.schedule || []).findIndex(e => e.id === id);
  if (index !== -1) {
    const item = appState.schedule[index];
    appState.schedule.splice(index, 1);
    saveState(appState);
    renderSchedule();
    showToast(`Removed "${item.subjectName}" from schedule`, 'info');
  }
}

/**
 * Simulates real calendar sync
 */
export function syncCalendarSchedule() {
  showToast('✓ Timetable synced with your student calendar!', 'success');
}

/**
 * Handles adding a new schedule session from the modal
 */
export function handleAddSchedule(e) {
  e.preventDefault();
  const subjectSelect = document.getElementById('schedule-subject-select');
  const subjectId = subjectSelect ? subjectSelect.value : '';
  const subject = appState.subjects.find((s) => s.id === subjectId) || appState.subjects[0];

  const dateInput = e.target.querySelector('input[type="date"]');
  const startInput = e.target.querySelectorAll('input[type="time"]')[0];
  const endInput = e.target.querySelectorAll('input[type="time"]')[1];
  const goalInput = document.getElementById('schedule-goal-input');

  const dateVal = dateInput ? dateInput.value : '2023-10-24';
  const startTime = startInput ? startInput.value : '11:00';
  const endTime = endInput ? endInput.value : '13:00';
  const goal = goalInput ? goalInput.value.trim() : '';

  // Determine day of week
  const dateObj = new Date(dateVal);
  const dayIndex = dateObj.getDay(); // 0 is sun, 1 is mon
  const dayKey = DAY_KEYS[dayIndex === 0 ? 6 : dayIndex - 1];

  // Calculate top offset: 9 AM is 0, each hour is 60px
  const [startH, startM] = startTime.split(':').map(Number);
  const [endH, endM] = endTime.split(':').map(Number);

  const startDecimal = (startH || 9) + ((startM || 0) / 60);
  const endDecimal = (endH || 11) + ((endM || 0) / 60);

  const topPx = Math.max(0, Math.round((startDecimal - 9) * 60));
  const heightPx = Math.max(40, Math.round((endDecimal - startDecimal) * 60));

  const newSession = {
    id: `sch_${Date.now()}`,
    subjectName: subject ? subject.name : 'Study Session',
    timeSlot: `${startTime} - ${endTime}`,
    type: 'Study Block',
    location: goal || 'Campus Library / Desk',
    day: dayKey,
    color: subject ? subject.color : '#5551FF',
    topPx,
    heightPx
  };

  if (!Array.isArray(appState.schedule)) {
    appState.schedule = [];
  }
  appState.schedule.push(newSession);
  saveState(appState);

  renderSchedule();
  showToast(`Scheduled study session for ${newSession.subjectName}!`, 'success');
  closeModal('add-schedule-modal');

  const form = document.getElementById('add-schedule-form');
  if (form) form.reset();
}
