 

export class FormValidator {
    constructor(formId) {
      this.form = document.getElementById(formId)
      this.errors = {}
      this.init()
    }
  
    init() {
      if (this.form) {
        this.form.addEventListener("submit", this.handleSubmit.bind(this))
  
        // Add real-time validation
        const inputs = this.form.querySelectorAll("input[required]")
        inputs.forEach((input) => {
          input.addEventListener("blur", () => this.validateField(input))
          input.addEventListener("input", () => this.clearError(input.name))
        })
      }
    }
  
    validateField(field) {
      const { name, value, type } = field
      let isValid = true
      let errorMessage = ""
  
      // Clear previous error
      this.clearError(name)
  
      // Required field validation
      if (!value.trim()) {
        errorMessage = `${this.getFieldLabel(name)} is required`
        isValid = false
      }
      // Email validation
      else if (type === "email" && !this.isValidEmail(value)) {
        errorMessage = "Please enter a valid email address"
        isValid = false
      }
      // Password validation
      else if (type === "password" && value.length < 8) {
        errorMessage = "Password must be at least 8 characters long"
        isValid = false
      }
  
      if (!isValid) {
        this.showError(name, errorMessage)
      }
  
      return isValid
    }
  
    validateForm() {
      const inputs = this.form.querySelectorAll("input[required]")
      let isFormValid = true
  
      inputs.forEach((input) => {
        if (!this.validateField(input)) {
          isFormValid = false
        }
      })
  
      return isFormValid
    }
  
    handleSubmit(e) {
      e.preventDefault()
  
      // Clear form error
      this.clearFormError()
  
      if (this.validateForm()) {
        const formData = new FormData(this.form)
        const data = Object.fromEntries(formData.entries())
  
        // Simulate API call
        this.simulateLogin(data)
      }
    }
  
    async simulateLogin(data) {
      const submitButton = this.form.querySelector('button[type="submit"]')
      const originalText = submitButton.textContent
  
      // Show loading state
      submitButton.textContent = "Signing in..."
      submitButton.disabled = true
  
      try {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1500))
  
        // Simulate login logic
        if (data.email === "admin@dropp.com" && data.password === "password123") {
          // Success
          this.showSuccess("Login successful! Redirecting...")
          setTimeout(() => {
            window.location.href = "/dashboard.html"
          }, 1000)
        } else {
          // Error
          this.showFormError("Invalid email or password. Please try again.")
        }
      } catch (error) {
        this.showFormError("An error occurred. Please try again.")
      } finally {
        // Reset button
        submitButton.textContent = originalText
        submitButton.disabled = false
      }
    }
  
    isValidEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      return emailRegex.test(email)
    }
  
    getFieldLabel(fieldName) {
      const labels = {
        email: "Email",
        password: "Password",
      }
      return labels[fieldName] || fieldName
    }
  
    showError(fieldName, message) {
      const errorElement = document.getElementById(`${fieldName}-error`)
      if (errorElement) {
        errorElement.textContent = message
        errorElement.classList.remove("hidden")
      }
    }
  
    clearError(fieldName) {
      const errorElement = document.getElementById(`${fieldName}-error`)
      if (errorElement) {
        errorElement.textContent = ""
        errorElement.classList.add("hidden")
      }
    }
  
    showFormError(message) {
      const formErrorElement = document.getElementById("form-error")
      if (formErrorElement) {
        formErrorElement.textContent = message
        formErrorElement.classList.remove("hidden")
      }
    }
  
    clearFormError() {
      const formErrorElement = document.getElementById("form-error")
      if (formErrorElement) {
        formErrorElement.textContent = ""
        formErrorElement.classList.add("hidden")
      }
    }
  
    showSuccess(message) {
      const formErrorElement = document.getElementById("form-error")
      if (formErrorElement) {
        formErrorElement.textContent = message
        formErrorElement.className = "form-error text-green-500 text-sm text-center mb-6"
        formErrorElement.classList.remove("hidden")
      }
    }
  }
  
  // Initialize the form validator when DOM is loaded
  document.addEventListener("DOMContentLoaded", () => {
    new FormValidator("login-form")
  
    // Add some interactive features
    initializeInteractiveFeatures()
  })
  
  function initializeInteractiveFeatures() {
    // Mobile menu toggle (if needed)
    const mobileMenuButton = document.querySelector("[data-mobile-menu]")
    if (mobileMenuButton) {
      mobileMenuButton.addEventListener("click", toggleMobileMenu)
    }
  
    // Add focus effects to form inputs
    const inputs = document.querySelectorAll("input")
    inputs.forEach((input) => {
      input.addEventListener("focus", () => {
        input.parentElement.classList.add("ring-2", "ring-dropp-primary")
      })
  
      input.addEventListener("blur", () => {
        input.parentElement.classList.remove("ring-2", "ring-dropp-primary")
      })
    })
  }
  
  function toggleMobileMenu() {
    // Mobile menu implementation if needed
    console.log("Mobile menu toggled")
  }
  

  