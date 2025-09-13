import {
  calculateTimeLeft,
  formatTimeRemaining,
  isAuctionEnded,
  getAuctionStatus,
} from './timeUtils.js';

import { vi } from 'vitest';

describe('timeUtils', () => {
  beforeEach(() => {
    // Mock the current time to January 1, 2024, 12:00:00
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2024-01-01T12:00:00Z'));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe('calculateTimeLeft', () => {
    it('should calculate time remaining correctly', () => {
      // Arrange: 2 days, 3 hours, 30 minutes from now
      const endsAt = '2024-01-03T15:30:00Z';

      // Act
      const result = calculateTimeLeft(endsAt);

      // Assert
      expect(result).toEqual({
        isEnded: false,
        days: 2,
        hours: 3,
        minutes: 30,
      });
    });

    it('should handle auction that already ended', () => {
      // Arrange: 1 hour ago
      const endsAt = '2024-01-01T11:00:00Z';

      // Act
      const result = calculateTimeLeft(endsAt);

      // Assert
      expect(result).toEqual({
        isEnded: true,
        days: 0,
        hours: 0,
        minutes: 0,
      });
    });

    it('should handle auction ending exactly now', () => {
      // Arrange: Exactly current time
      const endsAt = '2024-01-01T12:00:00Z';

      // Act
      const result = calculateTimeLeft(endsAt);

      // Assert
      expect(result.isEnded).toBe(true);
    });

    it('should calculate time remaining for less than 1 day', () => {
      // Arrange: 5 hours, 20 minutes from now
      const endsAt = '2024-01-01T17:20:00Z';

      // Act
      const result = calculateTimeLeft(endsAt);

      // Assert
      expect(result).toEqual({
        isEnded: false,
        days: 0,
        hours: 5,
        minutes: 20,
      });
    });

    it('should handle invalid date string', () => {
      // Arrange: Invalid date
      const endsAt = 'invalid-date';

      // Act
      const result = calculateTimeLeft(endsAt);

      // Assert
      expect(result.isEnded).toBe(true);
    });
  });

  describe('formatTimeRemaining', () => {
    it('should format multiple days and hours', () => {
      // Arrange: 3 days, 2 hours from now
      const endsAt = '2024-01-04T14:00:00Z';

      // Act
      const result = formatTimeRemaining(endsAt);

      // Assert
      expect(result).toBe('3 Days 2 Hours');
    });

    it('should format single day and hour correctly', () => {
      // Arrange: 1 day, 1 hour from now
      const endsAt = '2024-01-02T13:00:00Z';

      // Act
      const result = formatTimeRemaining(endsAt);

      // Assert
      expect(result).toBe('1 Day 1 Hour');
    });

    it('should format hours only when less than 1 day', () => {
      // Arrange: 5 hours from now
      const endsAt = '2024-01-01T17:00:00Z';

      // Act
      const result = formatTimeRemaining(endsAt);

      // Assert
      expect(result).toBe('5 Hours');
    });

    it('should format single hour correctly', () => {
      // Arrange: 1 hour from now
      const endsAt = '2024-01-01T13:00:00Z';

      // Act
      const result = formatTimeRemaining(endsAt);

      // Assert
      expect(result).toBe('1 Hour');
    });

    it('should format minutes when less than 1 hour', () => {
      // Arrange: 30 minutes from now
      const endsAt = '2024-01-01T12:30:00Z';

      // Act
      const result = formatTimeRemaining(endsAt);

      // Assert
      expect(result).toBe('30 Minutes');
    });

    it('should format single minute correctly', () => {
      // Arrange: 1 minute from now
      const endsAt = '2024-01-01T12:01:00Z';

      // Act
      const result = formatTimeRemaining(endsAt);

      // Assert
      expect(result).toBe('1 Minute');
    });

    it('should return "Auction Ended" for past date', () => {
      // Arrange: 1 hour ago
      const endsAt = '2024-01-01T11:00:00Z';

      // Act
      const result = formatTimeRemaining(endsAt);

      // Assert
      expect(result).toBe('Auction Ended');
    });
  });

  describe('isAuctionEnded', () => {
    it('should return false for future date', () => {
      // Arrange: 1 hour from now
      const endsAt = '2024-01-01T13:00:00Z';

      // Act & Assert
      expect(isAuctionEnded(endsAt)).toBe(false);
    });

    it('should return true for past date', () => {
      // Arrange: 1 hour ago
      const endsAt = '2024-01-01T11:00:00Z';

      // Act & Assert
      expect(isAuctionEnded(endsAt)).toBe(true);
    });

    it('should return true for current time', () => {
      // Arrange: Exactly now
      const endsAt = '2024-01-01T12:00:00Z';

      // Act & Assert
      expect(isAuctionEnded(endsAt)).toBe(true);
    });
  });

  describe('getAuctionStatus', () => {
    it('should return active status for ongoing auction', () => {
      // Arrange: 2 hours from now
      const endsAt = '2024-01-01T14:00:00Z';

      // Act
      const result = getAuctionStatus(endsAt);

      // Assert
      expect(result).toEqual({
        isEnded: false,
        timeRemaining: '2 Hours',
        cssClass: 'text-green-600',
      });
    });

    it('should return ended status for past auction', () => {
      // Arrange: 1 hour ago
      const endsAt = '2024-01-01T11:00:00Z';

      // Act
      const result = getAuctionStatus(endsAt);

      // Assert
      expect(result).toEqual({
        isEnded: true,
        timeRemaining: 'Auction Ended',
        cssClass: 'text-red-600',
      });
    });
  });
});
