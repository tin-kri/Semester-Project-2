//todo create sort component

import { fetchPopularTags } from '../api/listings.js';
import { setHTML } from '../utils/dom.js';

let currentTag = null;
let onTagChange = null;
let onClearFilters = null;

export async function initTagFilters(tagChangeCallback, clearCallback) {
  onTagChange = tagChangeCallback;
  onClearFilters = clearCallback;

  try {
    const popularTags = await fetchPopularTags();
    renderTags(popularTags);
    setupTagEvents();
    setupClearEvents();
  } catch (error) {
    console.error('Failed to init tag filters:', error);
  }
}

export function initSortFilters(sortChangeCallback) {
  const sortSelects = document.querySelectorAll('#desktop-sort, #mobile-sort');

  sortSelects.forEach((select) => {
    select.addEventListener('change', (e) => {
      sortChangeCallback(e.target.value);
      sortSelects.forEach((s) => (s.value = e.target.value));
    });
  });
}

function renderTags(tags) {
  if (!tags || tags.length === 0) {
    setHTML('#popular-tags', '<p>No tags available</p>');
    setHTML('#mobile-popular-tags', '<p>No tags available</p>');
    return;
  }

  const tagButtons = tags
    .map(
      (tag) =>
        `<button class="tag clickable w-full text-left" data-tag="${tag.filterValue}">
       <div class="flex justify-between items-center">
         <span>${tag.name}</span>
         <span class="text-xs opacity-75">${tag.count}</span>
       </div>
     </button>`,
    )
    .join('');

  setHTML('#popular-tags', tagButtons);
  setHTML('#mobile-popular-tags', tagButtons);
}

function setupTagEvents() {
  document.addEventListener('click', (e) => {
    const tagButton = e.target.closest('[data-tag]');
    if (!tagButton) {return;}

    const tag = tagButton.dataset.tag;

    if (currentTag === tag) {
      currentTag = null;
      onTagChange(null);
    } else {
      currentTag = tag;
      onTagChange(tag);
    }

    updateTagButtons();
  });
}

function setupClearEvents() {
  const clearButtons = document.querySelectorAll(
    '#clear-filters, #mobile-clear-filters',
  );
  clearButtons.forEach((button) => {
    button.addEventListener('click', () => {
      currentTag = null;
      updateTagButtons();
      resetSortDropdowns();
      onClearFilters();
    });
  });
}

function updateTagButtons() {
  document.querySelectorAll('[data-tag]').forEach((button) => {
    const tag = button.dataset.tag;
    if (currentTag === tag) {
      button.classList.add('bg-dropp-primary', 'text-white');
      button.classList.remove('bg-dropp-gray-100', 'text-dropp-gray-700');
    } else {
      button.classList.remove('bg-dropp-primary', 'text-white');
      button.classList.add('bg-dropp-gray-100', 'text-dropp-gray-700');
    }
  });
}

function resetSortDropdowns() {
  document.querySelectorAll('#desktop-sort, #mobile-sort').forEach((select) => {
    select.value = 'ending-soon';
  });
}
