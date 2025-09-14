import { registerUser } from '../api/auth.js';
import { showSuccess, showError } from '../utils/messages.js';
import {
  validateEmail,
  validatePassword,
  validateUsername,
  setupFieldValidation,
  setupFormSubmission,
} from '../utils/formHelpers.js';

export function initRegister() {
  const registerForm = document.querySelector('#register-form');

  if (!registerForm) {
    console.error('Register form not found!');
    return;
  }

  // Setup validation
  setupFieldValidation('#name', validateUsername);
  setupFieldValidation('#email', validateEmail);
  setupFieldValidation('#password', validatePassword);

  registerForm.addEventListener('submit', onRegisterFormSubmit);
}

function validateForm() {
  const nameField = document.querySelector('#name');
  const emailField = document.querySelector('#email');
  const passwordField = document.querySelector('#password');

  return (
    validateUsername(nameField) &&
    validateEmail(emailField) &&
    validatePassword(passwordField)
  );
}

async function onRegisterFormSubmit(event) {
  event.preventDefault();

  if (!validateForm()) {
    return;
  }

  const submitButton = event.target.querySelector('button[type="submit"]');
  const resetButton = setupFormSubmission(submitButton, 'Creating Account...');

  try {
    const formData = new FormData(event.target);
    const formFields = Object.fromEntries(formData);

    await registerUser(formFields);

    showSuccess('Registration successful! Redirecting to login...', {
      container: '#register-messages',
      duration: 2000,
    });

    setTimeout(() => {
      window.location.href = '/auth/login/';
    }, 1500);
  } catch (error) {
    console.error('Registration failed:', error.message);

    showError(`Registration failed: ${error.message}`, {
      container: '#register-messages',
      duration: 6000,
    });
  } finally {
    resetButton();
  }
}
