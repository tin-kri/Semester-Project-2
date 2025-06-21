import { API_CONFIG } from "../utils/constants";

export function initRegister(){
    console.log('initializing register page...');

    const registerForm = document.getElementById ('register-form');
    if (!registerForm){
        console.error('register form not found!');
        return;
    }

    registerForm.addEventListener('submit', handleRegisterSubmit);
    console.log('Register page initialized successfully');
}

async function handleRegisterSubmit(event) {
    event.preventDefault();
    console.log('Form is submitted')

    const formData = new FormData(event.target);
    const userData = {
        name
        email 
        password
        terms
    }
    
}