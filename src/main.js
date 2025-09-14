import { initializeApp } from '../js/utils/router.js';
import { initializeHeader } from '../js/ui/header.js';

// Initialize the application when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  initializeApp();
  initializeHeader();
});
