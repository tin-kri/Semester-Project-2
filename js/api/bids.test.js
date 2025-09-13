import { vi } from 'vitest';
import { placeBid } from './bids.js';

// Mock the dependencies
vi.mock('../utils/authUtils.js', () => ({
  getAuthHeaders: vi.fn(() => ({ Authorization: 'Bearer test-token' })),
}));

describe('placeBid', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn()),
    vi.spyOn(console, 'log').mockImplementation(() => {});
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should place bid successfully', async () => {
    // Arrange
    const mockResponse = { data: { id: 'bid-123', amount: 150 } };
    fetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockResponse),
    });

    // Act
    const result = await placeBid('listing-123', 150);

    // Assert
    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('/auction/listings/listing-123/bids'),
      expect.objectContaining({
        method: 'POST',
        body: JSON.stringify({ amount: 150 }),
      }),
    );
    expect(result).toEqual(mockResponse);
  });

  it('should handle API errors', async () => {
    // Arrange
    fetch.mockResolvedValue({
      ok: false,
      json: () =>
        Promise.resolve({
          errors: [{ message: 'Insufficient credits' }],
        }),
    });

    // Act & Assert
    await expect(placeBid('listing-123', 1000)).rejects.toThrow(
      'Insufficient credits',
    );
  });

  it('should handle network errors', async () => {
    // Arrange
    fetch.mockRejectedValue(new Error('Network failed'));

    // Act & Assert
    await expect(placeBid('listing-123', 150)).rejects.toThrow(
      'Network failed',
    );
  });
});
