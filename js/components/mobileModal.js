export function initMobileFiltersModal() {
  const openButton = document.getElementById('mobile-filters-btn');
  const modal = document.getElementById('mobile-filters-modal');
  const modalContent = document.getElementById('modal-content');
  const closeButton = document.getElementById('close-modal');
  const applyButton = document.getElementById('apply-filters');
  const backdrop = document.getElementById('modal-backdrop');

  if (!openButton || !modal) {
    console.warn('Mobile filters modal elements not found');
    return;
  }

  // Open modal
  openButton.addEventListener('click', () => {
    modal.classList.remove('hidden');
    // Trigger animation
    requestAnimationFrame(() => {
      modalContent.classList.remove('translate-x-full');
    });
  });

  // Close modal function
  function closeModal() {
    modalContent.classList.add('translate-x-full');
    // Wait for animation to complete
    setTimeout(() => {
      modal.classList.add('hidden');
    }, 300);
  }

  // Close button
  if (closeButton) {
    closeButton.addEventListener('click', closeModal);
  }

  // Apply filters button (also closes modal)
  if (applyButton) {
    applyButton.addEventListener('click', closeModal);
  }

  // Backdrop click to close
  if (backdrop) {
    backdrop.addEventListener('click', closeModal);
  }

  // Escape key to close
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
      closeModal();
    }
  });
}
