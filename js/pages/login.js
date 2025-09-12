import { loginUser } from '../api/auth.js';
import { showSuccess, showError } from '../utils/messages.js';
import { validateEmail, validatePassword, setupFieldValidation, setupFormSubmission } from '../utils/formHelpers.js';

export function initLogin() {
    const loginForm = document.querySelector('#login-form');

    if (!loginForm) {
        console.error('Login form not found!');
        return;
    }


    setupFieldValidation('#email', validateEmail);
    setupFieldValidation('#password', validatePassword);

    loginForm.addEventListener('submit', onLoginFormSubmit);
    console.log('Login page initialized successfully');
}

function validateForm() {
    const emailField = document.querySelector('#email');
    const passwordField = document.querySelector('#password');
    return validateEmail(emailField) && validatePassword(passwordField);
}

async function onLoginFormSubmit(event) {
    event.preventDefault();

    if (!validateForm()) {
        return;
    }

    const submitButton = event.target.querySelector('button[type="submit"]');
    const resetButton = setupFormSubmission(submitButton, 'Signing in...');

    try {
        const formData = new FormData(event.target);
        const formFields = Object.fromEntries(formData);

        await loginUser(formFields);

        showSuccess('Login successful! Redirecting...', {
            duration: 2000,
            container: '#login-messages',
        });

        setTimeout(() => {
            window.location.href = '/';
        }, 1500);

    } catch (error) {
        console.error('Login failed:', error.message);

        showError('Invalid email or password. Please try again.', {
            duration: 4000,
            container: '#login-messages',
        });

    } finally {
        resetButton();
    }
}

