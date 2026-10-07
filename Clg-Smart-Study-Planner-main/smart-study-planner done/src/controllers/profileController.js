/**
 * ============================================================================
 * PROFILE & SETTINGS CONTROLLER
 * ============================================================================
 * Manages rendering the student's academic profile details, account settings,
 * editing profile information, and updating password security.
 */

import { appState, saveState } from '../data/state.js';
import { showToast } from '../utils/toast.js';
import { closeModal } from '../utils/modal.js';
import { renderDashboard } from './dashboardController.js';

export function getUserInitials(name = '') {
  if (!name) return 'AM';
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

/**
 * Synchronously updates all avatar representations across the entire app
 * (profile view, settings view, sidebar card, top presentation header, and modals).
 */
export function renderAllAvatars() {
  const photoUrl = appState.user?.photoUrl || '';
  const fullName = appState.user?.fullName || 'Alex Mercer';
  const firstName = appState.user?.firstName || 'Alex';
  const initials = getUserInitials(fullName);

  // 1. Profile Page Main Avatar
  const mainAvatar = document.getElementById('profile-main-avatar');
  if (mainAvatar) {
    if (photoUrl) {
      mainAvatar.innerHTML = `<img src="${photoUrl}" alt="${fullName}" class="w-full h-full object-cover">`;
    } else {
      mainAvatar.textContent = initials;
    }
  }

  // Profile Page Remove Photo Button
  const profileRemoveBtn = document.getElementById('profile-remove-photo-btn');
  if (profileRemoveBtn) {
    if (photoUrl) {
      profileRemoveBtn.classList.remove('hidden');
    } else {
      profileRemoveBtn.classList.add('hidden');
    }
  }

  // 2. Settings Page Avatar
  const settingsAvatar = document.getElementById('settings-avatar');
  if (settingsAvatar) {
    if (photoUrl) {
      settingsAvatar.innerHTML = `<img src="${photoUrl}" alt="${fullName}" class="w-full h-full object-cover">`;
    } else {
      settingsAvatar.textContent = initials;
    }
  }

  // 3. Sidebar Mini Profile Avatar
  const sidebarAvatar = document.getElementById('sidebar-avatar');
  if (sidebarAvatar) {
    if (photoUrl) {
      sidebarAvatar.innerHTML = `<img src="${photoUrl}" alt="${fullName}" class="w-full h-full object-cover">`;
    } else {
      sidebarAvatar.textContent = initials;
    }
  }

  const sidebarUserName = document.getElementById('sidebar-user-name');
  if (sidebarUserName) sidebarUserName.textContent = fullName;

  // 4. Header Top Navigation Avatar
  const headerAvatar = document.getElementById('header-avatar');
  if (headerAvatar) {
    if (photoUrl) {
      headerAvatar.innerHTML = `<img src="${photoUrl}" alt="${fullName}" class="w-full h-full object-cover">`;
    } else {
      headerAvatar.textContent = initials;
    }
  }

  const headerUserName = document.getElementById('header-user-name');
  if (headerUserName) headerUserName.textContent = firstName;

  // 5. Edit Profile Modal Avatar Preview
  const modalAvatar = document.getElementById('modal-edit-avatar-preview');
  if (modalAvatar) {
    if (photoUrl) {
      modalAvatar.innerHTML = `<img src="${photoUrl}" alt="${fullName}" class="w-full h-full object-cover">`;
    } else {
      modalAvatar.textContent = initials;
    }
  }

  const modalRemoveBtn = document.getElementById('modal-remove-photo-btn');
  if (modalRemoveBtn) {
    if (photoUrl) {
      modalRemoveBtn.classList.remove('hidden');
    } else {
      modalRemoveBtn.classList.add('hidden');
    }
  }
}

/**
 * Triggers file picker for uploading profile photo
 */
export function triggerProfilePhotoUpload() {
  const input = document.getElementById('profile-photo-input');
  if (input) {
    input.click();
  }
}

/**
 * Handles image file selection from file input
 */
export function handleProfilePhotoSelected(event) {
  const file = event.target.files && event.target.files[0];
  if (!file) return;

  if (!file.type.startsWith('image/')) {
    showToast('Please select a valid image file (PNG, JPG, WEBP).', 'error');
    return;
  }

  // 5MB limit
  if (file.size > 5 * 1024 * 1024) {
    showToast('Image size exceeds 5MB. Please choose a smaller photo.', 'warning');
    return;
  }

  const reader = new FileReader();
  reader.onload = function(e) {
    const dataUrl = e.target.result;
    appState.user.photoUrl = dataUrl;
    saveState(appState);
    renderAllAvatars();
    showToast('Profile photo updated successfully!', 'success');
  };
  reader.onerror = function() {
    showToast('Failed to read image file. Please try another.', 'error');
  };
  reader.readAsDataURL(file);

  // Reset value so selecting same file triggers event again
  event.target.value = '';
}

/**
 * Removes user custom photo and falls back to student initials
 */
export function removeProfilePhoto() {
  appState.user.photoUrl = '';
  saveState(appState);
  renderAllAvatars();
  showToast('Profile photo removed.', 'info');
}

/**
 * Sets one of the sample student presets for quick testing
 */
export function setPresetPhoto(photoUrl) {
  appState.user.photoUrl = photoUrl;
  saveState(appState);
  renderAllAvatars();
  showToast('Profile photo set!', 'success');
}

export function renderProfile() {
  const nameEl = document.getElementById('profile-view-name');
  const majorEl = document.getElementById('profile-view-major');
  const instEl = document.getElementById('profile-view-inst');
  if (nameEl) nameEl.textContent = appState.user.fullName;
  if (majorEl) majorEl.textContent = appState.user.major;
  if (instEl) instEl.textContent = appState.user.institution;
  renderAllAvatars();
}

export function renderSettings() {
  const nameEl = document.getElementById('settings-view-name');
  const majorEl = document.getElementById('settings-view-major');
  const emailEl = document.getElementById('settings-view-email');
  const idEl = document.getElementById('settings-view-id');
  if (nameEl) nameEl.textContent = appState.user.fullName;
  if (majorEl) majorEl.textContent = appState.user.major;
  if (emailEl) emailEl.value = appState.user.email;
  if (idEl) idEl.value = appState.user.studentId;
  renderAllAvatars();
}

export function handleSaveProfile(e) {
  e.preventDefault();
  const firstName = document.getElementById('edit-first-name')?.value.trim();
  const lastName = document.getElementById('edit-last-name')?.value.trim();
  const email = document.getElementById('edit-email')?.value.trim();
  const bio = document.getElementById('edit-bio')?.value.trim();
  const institution = document.getElementById('edit-inst')?.value.trim();
  const major = document.getElementById('edit-major')?.value.trim();
  const currentYear = document.getElementById('edit-year')?.value;

  appState.user = {
    ...appState.user,
    firstName: firstName || appState.user.firstName,
    lastName: lastName || appState.user.lastName,
    fullName: `${firstName || appState.user.firstName} ${lastName || appState.user.lastName}`,
    email: email || appState.user.email,
    bio: bio !== undefined ? bio : appState.user.bio,
    institution: institution || appState.user.institution,
    major: major || appState.user.major,
    currentYear: currentYear || appState.user.currentYear
  };

  saveState(appState);
  showToast('Profile updated successfully!', 'success');
  closeModal('edit-profile-modal');
  renderProfile();
  renderSettings();
  renderDashboard();
  renderAllAvatars();
}

export function handleChangePassword(e) {
  e.preventDefault();
  const current = document.getElementById('pwd-current')?.value;
  const newPwd = document.getElementById('pwd-new')?.value;
  const confirmPwd = document.getElementById('pwd-confirm')?.value;

  if (!current) {
    showToast('Please enter your current password.', 'warning');
    return;
  }
  if (newPwd.length < 6) {
    showToast('Password must be at least 6 characters.', 'warning');
    return;
  }
  if (newPwd !== confirmPwd) {
    showToast('Passwords do not match.', 'error');
    return;
  }

  showToast('Password updated successfully!', 'success');
  closeModal('change-password-modal');

  const form = document.getElementById('change-password-form');
  if (form) form.reset();
}
