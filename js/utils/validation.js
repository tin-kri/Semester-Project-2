// import { showSuccess, showError, hideMessage } from "../utils/messages.js"

// export class FormValidator {
//     constructor(formId) {
//       this.form = document.getElementById(formId)
//       this.errors = {}
//       this.initValidation()
//     }
  
//     initValidation() {
//       if (this.form) {
//         // Add real-time validation only - no submit handler
//         const inputs = this.form.querySelectorAll("input[required]")
//         inputs.forEach((input) => {
//           input.addEventListener("blur", () => this.validateField(input))
//           input.addEventListener("input", () => this.clearError(input.name))
//         })
//       }
//     }
  
//     validateField(field) {
//       const { name, value, type } = field
//       let isValid = true
//       let errorMessage = ""
  
//       // Clear previous error
//       this.clearError(name)
  
//       // Required field validation
//       if (!value.trim()) {
//         errorMessage = `${this.getFieldLabel(name)} is required`
//         isValid = false
//       }
//       // Email validation
//       else if (type === "email" && !this.isValidEmail(value)) {
//         errorMessage = "Please enter a valid email address"
//         isValid = false
//       }
//       // Password validation
//       else if (type === "password" && value.length < 8) {
//         errorMessage = "Password must be at least 8 characters long"
//         isValid = false
//       }
  
//       if (!isValid) {
//         this.showFieldError(name, errorMessage)
//       }
  
//       return isValid
//     }
  
//     validateForm() {
//       const inputs = this.form.querySelectorAll("input[required]")
//       let isFormValid = true
  
//       inputs.forEach((input) => {
//         if (!this.validateField(input)) {
//           isFormValid = false
//         }
//       })
  
//       return isFormValid
//     }
  
//     isValidEmail(email) {
//       const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
//       return emailRegex.test(email)
//     }
  
//     getFieldLabel(fieldName) {
//       const labels = {
//         email: "Email",
//         password: "Password",
//         name: "Name",
//         firstName: "First Name",
//         lastName: "Last Name"
//       }
//       return labels[fieldName] || fieldName
//     }
  
//     // Field-specific error handling
//     showFieldError(fieldName, message) {
//       showError(message, { elementId: `${fieldName}-error`, duration: 0 });
//     }
    
//     // FIX: Properly define clearError method
//     clearError(fieldName) {
//       hideMessage(`${fieldName}-error`);
//     }
    
//     // Form-level message handling
//     showSuccess(message) {
//       showSuccess(message, { elementId: 'form-error', duration: 0 });
//     }
    
//     showFormError(message) {
//       showError(message, { elementId: 'form-error', duration: 0 });
//     }
    
//     clearFormError() {
//       hideMessage('form-error');
//     }
// }

