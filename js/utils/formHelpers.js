import { showError } from "./messages.js";

// Common validation patterns
export const PATTERNS = {
    email: /^[a-zA-Z0-9._%+\-]+@stud\.noroff\.no$/,
    password: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,20}$/,
    username: /^[A-Za-z0-9_]+$/
};

// Common validation functions
export function validateEmail(field) {
    const value = field.value.trim();
    
    if (!value) {
        showFieldError("email", "Email is required");
        return false;
    } else if (!PATTERNS.email.test(value)) {
        showFieldError("email", "Please enter a valid stud.noroff.no email address");
        return false;
    } else {
        clearFieldError("email");
        return true;
    }
}

export function validatePassword(field) {
    const value = field.value.trim();
    
    if (!value) {
        showFieldError("password", "Password is required");
        return false;
    } else if (value.length < 8) {
        showFieldError("password", "Password must be at least 8 characters long");
        return false;
    } else if (!PATTERNS.password.test(value)) {
        showFieldError("password", "Password must be 8-20 characters with letters and numbers");
        return false;
    } else {
        clearFieldError("password");
        return true;
    }
}

export function validateUsername(field) {
    const value = field.value.trim();
    
    if (!value) {
        showFieldError("name", "Username is required");
        return false;
    } else if (value.length < 3) {
        showFieldError("name", "Username must be at least 3 characters");
        return false;
    } else if (!PATTERNS.username.test(value)) {
        showFieldError("name", "Username can only contain letters, numbers, and underscores");
        return false;
    } else {
        clearFieldError("name");
        return true;
    }
}

// Common helper functions
export function showFieldError(fieldName, message) {
    showError(message, { elementId: `${fieldName}-error`, duration: 0 });
}

export function clearFieldError(fieldName) {
    const errorElement = document.getElementById(`${fieldName}-error`);
    if (errorElement) {
        errorElement.classList.add("hidden");
        errorElement.textContent = "";
    }
}

// Common form submission handling
export function setupFormSubmission(button, loadingText = "Processing...") {
    const originalText = button.textContent;
    button.textContent = loadingText;
    button.disabled = true;
    
    return () => {
        button.textContent = originalText;
        button.disabled = false;
    };
}

// Common field listeners setup
export function setupFieldValidation(fieldSelector, validator) {
    const field = document.querySelector(fieldSelector);
    if (field) {
        field.addEventListener("blur", () => validator(field));
        field.addEventListener("input", () => clearFieldError(field.name));
    }
}