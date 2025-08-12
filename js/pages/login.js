import { loginUser } from "../api/auth.js";

export function initLogin() {
    const loginForm = document.querySelector("#login-form");
    
    if (!loginForm) {
        console.error("Login form not found!");
        return;
    }
    
    loginForm.addEventListener("submit", onLoginFormSubmit);
    console.log("Login page initialized successfully");
}

// Event handler - processes form submission
async function onLoginFormSubmit(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const formFields = Object.fromEntries(formData);
    
    console.log("Form fields:", formFields);
    
    try {
        await loginUser(formFields);
        alert("Login successful! ");
        window.location.href = "/";
        
    } catch (error) {
       console.error("login failed: "+ error.message);

    }
}