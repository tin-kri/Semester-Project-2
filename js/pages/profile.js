import { initBioEditor } from '../components/bioEditor.js';
import { initAvatarEditor } from '../components/avatarEditor.js';
import { getMyProfile, updateMyProfile } from '../api/profiles.js';
import { updateCurrentUser } from '../utils/authUtils.js';
import { showSuccess, showError } from '../utils/messages.js';

let bioEditorInitialized = false;
let avatarEditorInitialized = false;

export async function initProfile() {
  try {
    const profileData = await getMyProfile();
    const data = profileData.data;

    renderProfileData(data);
    initializeBioEditor(data.bio);
    initializeAvatarEditor(data.avatar);
  } catch (error) {
    console.error('Failed to load profile:', error);
    showError('Failed to load profile data');
  }
}

function renderProfileData(data) {
  updateAvatarImage(data.avatar);

  document.querySelector('#profile-user-name').textContent = data.name;
  document.querySelector('#profile-user-bio').textContent =
    data.bio || 'No bio available';
  document.querySelector('#profile-credits').textContent = data.credits;
  document.querySelector('#profile-listings-count').textContent =
    data._count.listings;
  document.querySelector('#profile-bids-won-count').textContent =
    data._count.bids_won || data._count.wins || 0;
}

function updateAvatarImage(avatarData) {
  if (!avatarData?.url) {
    return;
  }

  const avatarContainer = document.querySelector('#profile-user-img');
  const img = document.createElement('img');
  img.src = avatarData.url;
  img.alt = avatarData.alt || 'Profile avatar';
  img.className = 'w-24 h-24 rounded-full object-cover';

  avatarContainer.innerHTML = '';
  avatarContainer.appendChild(img);
}

function showProfileMessage(message, type) {
  const options = {
    duration: 3000,
    elementId: 'bio-avatar-messages',
  };

  if (type === 'success') {
    showSuccess(message, options);
  } else {
    showError(message, options);
  }
}

function initializeBioEditor(currentBio) {
  if (bioEditorInitialized) {
    return;
  }

  const bioElement = document.querySelector('#profile-user-bio');
  const editButton = document.querySelector('#edit-bio');

  if (!bioElement || !editButton) {
    console.error('Bio editor elements not found');
    return;
  }

  initBioEditor(
    bioElement,
    editButton,
    currentBio,
    handleBioUpdate,
    () => hideOtherEditButtons('bio'),
    () => showAllEditButtons(),
  );

  bioEditorInitialized = true;
}

function initializeAvatarEditor(currentAvatar) {
  if (avatarEditorInitialized) {
    return;
  }

  const formElement = document.querySelector('#avatar-edit-form');
  const editButton = document.querySelector('#change-avatar');

  if (!formElement || !editButton) {
    console.error('Avatar editor elements not found');
    return;
  }

  initAvatarEditor(
    formElement,
    editButton,
    currentAvatar,
    handleAvatarUpdate,
    () => hideOtherEditButtons('avatar'),
    () => showAllEditButtons(),
  );

  avatarEditorInitialized = true;
}

async function handleBioUpdate(newBio) {
  try {
    await updateMyProfile({ bio: newBio });

    showProfileMessage('Bio updated successfully!', 'success');
    return Promise.resolve();
  } catch (error) {
    console.error('Failed to update bio:', error);
    showProfileMessage('Failed to update bio', 'error');
    return Promise.reject(error);
  }
}

async function handleAvatarUpdate(avatarData) {
  try {
    await updateMyProfile({ avatar: avatarData });

    updateCurrentUser({ avatar: avatarData });

    if (window.initializeHeader) {
      window.initializeHeader();
    }

    showProfileMessage('Avatar updated successfully!', 'success');

    updateAvatarImage(avatarData);

    return Promise.resolve();
  } catch (error) {
    console.error('Failed to update avatar:', error);
    showProfileMessage('Failed to update avatar', 'error');
    return Promise.reject(error);
  }
}

function hideOtherEditButtons(activeEditor) {
  const bioEditBtn = document.querySelector('#edit-bio');
  const avatarEditBtn = document.querySelector('#change-avatar');

  if (activeEditor === 'bio' && avatarEditBtn) {
    avatarEditBtn.style.display = 'none';
  } else if (activeEditor === 'avatar' && bioEditBtn) {
    bioEditBtn.style.display = 'none';
  }
}

function showAllEditButtons() {
  const bioEditBtn = document.querySelector('#edit-bio');
  const avatarEditBtn = document.querySelector('#change-avatar');

  if (bioEditBtn) {
    bioEditBtn.style.display = 'block';
  }
  if (avatarEditBtn) {
    avatarEditBtn.style.display = 'block';
  }
}
