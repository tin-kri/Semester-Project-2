export function showMessage(message, type = 'error', options = {}) {
  const {
    elementId = null,
    container = 'main',
    duration = 5000,
    position = 'top',
  } = options;

  if (elementId) {
    const element = document.getElementById(elementId);
    if (element) {
      element.textContent = message;
      element.className = type === 'success' ? 'form-success' : 'form-error';
      element.classList.remove('hidden');
      return element;
    }
  }

  const messageDiv = document.createElement('div');
  messageDiv.className = type === 'success' ? 'form-success' : 'form-error';
  messageDiv.textContent = message;

  const containerEl = document.querySelector(container);
  if (containerEl) {
    if (position === 'top') {
      containerEl.insertBefore(messageDiv, containerEl.firstChild);
    } else {
      containerEl.appendChild(messageDiv);
    }

    if (duration > 0) {
      setTimeout(() => messageDiv.remove(), duration);
    }
  }

  return messageDiv;
}

export const showSuccess = (msg, opts) => showMessage(msg, 'success', opts);
export const showError = (msg, opts) => showMessage(msg, 'error', opts);

export function hideMessage(elementId) {
  const element = document.getElementById(elementId);
  if (element) {
    element.classList.add('hidden');
    element.textContent = '';
  }
}
