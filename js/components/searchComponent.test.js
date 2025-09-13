import { initSearchComponent } from './searchComponent';
import { vi } from 'vitest';

describe('initSearchComponent', () => {
  beforeEach(() => {
    // Clean up DOM
    document.body.innerHTML = '';

    // Mock timers for debouncing
    vi.useFakeTimers();

    // Mock console.warn
    vi.spyOn(console, 'warn').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it('should call callback with search query after debounce', () => {
    // Arrange
    const searchInput = document.createElement('input');
    searchInput.id = 'search-filter';
    document.body.appendChild(searchInput);

    const mockCallback = vi.fn();

    // Act
    initSearchComponent(mockCallback);

    // Simulate typing
    searchInput.value = 'laptop';
    searchInput.dispatchEvent(new Event('input'));

    // Fast-forward time to trigger debounced call
    vi.advanceTimersByTime(300);

    // Assert
    expect(mockCallback).toHaveBeenCalledWith('laptop');
    expect(mockCallback).toHaveBeenCalledTimes(1);
  });

  it('should debounce multiple rapid inputs', () => {
    // Arrange
    const searchInput = document.createElement('input');
    searchInput.id = 'search-filter';
    document.body.appendChild(searchInput);

    const mockCallback = vi.fn();
    initSearchComponent(mockCallback);

    // Act - Simulate rapid typing
    searchInput.value = 'l';
    searchInput.dispatchEvent(new Event('input'));

    searchInput.value = 'la';
    searchInput.dispatchEvent(new Event('input'));

    searchInput.value = 'laptop';
    searchInput.dispatchEvent(new Event('input'));

    // Fast-forward less than debounce time
    vi.advanceTimersByTime(200);
    expect(mockCallback).not.toHaveBeenCalled();

    // Fast-forward to complete debounce
    vi.advanceTimersByTime(100);

    // Assert - Only called once with final value
    expect(mockCallback).toHaveBeenCalledWith('laptop');
    expect(mockCallback).toHaveBeenCalledTimes(1);
  });

  it('should trim whitespace from search query', () => {
    // Arrange
    const searchInput = document.createElement('input');
    searchInput.id = 'search-filter';
    document.body.appendChild(searchInput);

    const mockCallback = vi.fn();
    initSearchComponent(mockCallback);

    // Act
    searchInput.value = '  laptop  ';
    searchInput.dispatchEvent(new Event('input'));
    vi.advanceTimersByTime(300);

    // Assert
    expect(mockCallback).toHaveBeenCalledWith('laptop');
  });

  it('should handle missing search input gracefully', () => {
    // Arrange - No search input in DOM
    const mockCallback = vi.fn();

    // Act
    initSearchComponent(mockCallback);

    // Assert
    expect(console.warn).toHaveBeenCalledWith('Filter search input not found');
    expect(mockCallback).not.toHaveBeenCalled();
  });
});
