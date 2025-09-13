import { vi } from 'vitest';
import {
  showMessage,
  showSuccess,
  showError,
  hideMessage,
} from './messages.js';

describe('messages', () => {
  beforeEach(() => {
    // Clean up DOM before each test
    document.body.innerHTML = '';

    // Mock timers for testing auto-hide behavior
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe('showMessage with existing element', () => {
    it('should display message in existing element', () => {
      // Arrange: Create the target element (like bio-avatar-messages)
      const messageContainer = document.createElement('div');
      messageContainer.id = 'bio-avatar-messages';
      messageContainer.classList.add('hidden');
      document.body.appendChild(messageContainer);

      // Act: Show success message
      const result = showMessage('Bio updated!', 'success', {
        elementId: 'bio-avatar-messages',
      });

      // Assert: Message appears in the element
      expect(result).toBe(messageContainer);
      expect(messageContainer.textContent).toBe('Bio updated!');
      expect(messageContainer.className).toBe('form-success');
      expect(messageContainer.classList.contains('hidden')).toBe(false);
    });

    it('should auto-hide message after duration', () => {
      // Arrange: Create target element
      const messageContainer = document.createElement('div');
      messageContainer.id = 'bio-avatar-messages';
      document.body.appendChild(messageContainer);

      // Act: Show message with 3 second duration
      showMessage('Avatar updated!', 'success', {
        elementId: 'bio-avatar-messages',
        duration: 3000,
      });

      // Assert: Message is visible initially
      expect(messageContainer.textContent).toBe('Avatar updated!');
      expect(messageContainer.classList.contains('hidden')).toBe(false);

      // Act: Fast-forward time by 3 seconds
      vi.advanceTimersByTime(3000);

      // Assert: Message should be hidden now (THIS WILL FAIL - demonstrating the bug)
      expect(messageContainer.classList.contains('hidden')).toBe(true);
      expect(messageContainer.textContent).toBe('');
    });

    it('should handle multiple messages in same element', () => {
      // Arrange: Create target element
      const messageContainer = document.createElement('div');
      messageContainer.id = 'bio-avatar-messages';
      document.body.appendChild(messageContainer);

      // Act: Show first message
      showMessage('First message', 'success', {
        elementId: 'bio-avatar-messages',
      });

      // Assert: First message visible
      expect(messageContainer.textContent).toBe('First message');
      expect(messageContainer.className).toBe('form-success');

      // Act: Show second message (should replace first)
      showMessage('Second message', 'error', {
        elementId: 'bio-avatar-messages',
      });

      // Assert: Second message replaces first
      expect(messageContainer.textContent).toBe('Second message');
      expect(messageContainer.className).toBe('form-error');
    });
  });

  describe('showMessage with new elements', () => {
    it('should create new message element when no elementId', () => {
      // Arrange: Create main container
      const main = document.createElement('main');
      document.body.appendChild(main);

      // Act: Show message without elementId
      const result = showMessage('Generic message', 'error');

      // Assert: New element created
      expect(result.textContent).toBe('Generic message');
      expect(result.className).toBe('form-error');
      expect(main.contains(result)).toBe(true);
    });

    it('should auto-remove new message elements after duration', () => {
      // Arrange: Create main container
      const main = document.createElement('main');
      document.body.appendChild(main);

      // Act: Show message with duration
      const messageEl = showMessage('Temporary message', 'success', {
        duration: 2000,
      });

      // Assert: Message exists initially
      expect(main.contains(messageEl)).toBe(true);

      // Act: Fast-forward time
      vi.advanceTimersByTime(2000);

      // Assert: Message removed from DOM
      expect(main.contains(messageEl)).toBe(false);
    });
  });

  describe('showSuccess and showError helpers', () => {
    it('should show success message', () => {
      const messageContainer = document.createElement('div');
      messageContainer.id = 'test-messages';
      document.body.appendChild(messageContainer);

      showSuccess('Success!', { elementId: 'test-messages' });

      expect(messageContainer.textContent).toBe('Success!');
      expect(messageContainer.className).toBe('form-success');
    });

    it('should show error message', () => {
      const messageContainer = document.createElement('div');
      messageContainer.id = 'test-messages';
      document.body.appendChild(messageContainer);

      showError('Error!', { elementId: 'test-messages' });

      expect(messageContainer.textContent).toBe('Error!');
      expect(messageContainer.className).toBe('form-error');
    });
  });

  describe('hideMessage', () => {
    it('should hide and clear existing message', () => {
      // Arrange: Create and populate message element
      const messageContainer = document.createElement('div');
      messageContainer.id = 'test-messages';
      messageContainer.textContent = 'Some message';
      messageContainer.className = 'form-success';
      document.body.appendChild(messageContainer);

      // Act: Hide the message
      hideMessage('test-messages');

      // Assert: Message hidden and cleared
      expect(messageContainer.classList.contains('hidden')).toBe(true);
      expect(messageContainer.textContent).toBe('');
    });

    it('should handle non-existent element gracefully', () => {
      // Act & Assert: Should not throw error
      expect(() => hideMessage('non-existent')).not.toThrow();
    });
  });

  describe('Profile-specific message scenarios', () => {
    it('should simulate bio update message behavior', () => {
      // Arrange: Set up profile page structure
      const messageContainer = document.createElement('div');
      messageContainer.id = 'bio-avatar-messages';
      document.body.appendChild(messageContainer);

      // Act: Simulate bio update success (like in profile.js)
      showSuccess('Bio updated successfully!', {
        duration: 3000,
        elementId: 'bio-avatar-messages',
      });

      // Assert: Message shows immediately
      expect(messageContainer.textContent).toBe('Bio updated successfully!');
      expect(messageContainer.className).toBe('form-success');

      // Act: Wait for auto-hide duration
      vi.advanceTimersByTime(3000);

      // Assert: Message should be auto-hidden (THIS WILL FAIL - showing the bug)
      expect(messageContainer.classList.contains('hidden')).toBe(true);
    });

    it('should simulate avatar update message behavior', () => {
      // Arrange: Set up profile page structure
      const messageContainer = document.createElement('div');
      messageContainer.id = 'bio-avatar-messages';
      document.body.appendChild(messageContainer);

      // Act: Simulate avatar update success
      showSuccess('Avatar updated successfully!', {
        duration: 3000,
        elementId: 'bio-avatar-messages',
      });

      // Assert: Message shows
      expect(messageContainer.textContent).toBe('Avatar updated successfully!');

      // Simulate user trying to edit bio while avatar message still visible
      // Act: Show bio error message
      showError('Failed to update bio', {
        elementId: 'bio-avatar-messages',
      });

      // Assert: Bio error replaces avatar success
      expect(messageContainer.textContent).toBe('Failed to update bio');
      expect(messageContainer.className).toBe('form-error');
    });
  });
});
