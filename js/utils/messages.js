export function showMessage(message, type = 'info') {
    const bgColor = type === 'success' 
      ? 'bg-dropp-primary' 
      : type === 'error' 
      ? 'bg-dropp-red-500' 
      : 'bg-dropp-secondary'; 
    
    const messageEl = document.createElement('div');
    messageEl.className = `fixed top-4 right-4 ${bgColor} text-white px-6 py-3 rounded-lg shadow-lg z-50 transition-opacity duration-300`;
    messageEl.textContent = message;
    
    document.body.appendChild(messageEl);
    
  
    setTimeout(() => {
      messageEl.style.opacity = '0';
      setTimeout(() => messageEl.remove(), 300);
    }, 4000);
  }
  
  export function showSuccess(message) {
    showMessage(message, 'success');
  }
  
  export function showError(message) {
    showMessage(message, 'error');
  }
  
  export function showInfo(message) {
    showMessage(message, 'info');
  }