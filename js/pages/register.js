import { registerUser } from '../api/auth.js';

export function initRegister() {
    const registerForm = document.querySelector("#register-form");
    
    if (!registerForm) {
        console.error("Register form not found!");
        return;
    }
    
    registerForm.addEventListener("submit", onRegisterFormSubmit);
    console.log("Register page initialized successfully");
}

// Event handler - processes form submission
async function onRegisterFormSubmit(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const formFields = Object.fromEntries(formData);
    
    console.log("Form fields:", formFields);
    
    try {
        await registerUser(formFields);
        alert("Registration successful! Redirecting to login...");
        window.location.href = "/auth/login/";
        
    } catch (error) {
        alert("Registration failed: " + error.message);
    }
}