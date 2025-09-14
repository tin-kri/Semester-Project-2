import { createTagsDisplay } from './createTagsDisplay.js';

describe('createTagsDisplay', () => {
  it('should return formatted HTML for valid tags', () => {
    // Arrange
    const tags = ['electronics', 'laptop', 'gaming'];

    // Act
    const result = createTagsDisplay(tags);

    // Assert
    expect(result).toContain('electronics');
    expect(result).toContain('laptop');
    expect(result).toContain('gaming');
    expect(result).toContain('bg-dropp-secondary/10');
    expect(result).toContain('text-dropp-secondary');
    expect(result).toContain('<span');
  });

  it('should return "No tags" message for empty array', () => {
    // Arrange
    const tags = [];

    // Act
    const result = createTagsDisplay(tags);

    // Assert
    expect(result).toBe(
      '<span class="text-dropp-gray-500 text-sm">No tags</span>',
    );
  });

  it('should return "No tags" message for null input', () => {
    // Act
    const result = createTagsDisplay(null);

    // Assert
    expect(result).toBe(
      '<span class="text-dropp-gray-500 text-sm">No tags</span>',
    );
  });

  it('should return "No tags" message for undefined input', () => {
    // Act
    const result = createTagsDisplay(undefined);

    // Assert
    expect(result).toBe(
      '<span class="text-dropp-gray-500 text-sm">No tags</span>',
    );
  });

  it('should return "No tags" message for non-array input', () => {
    // Act
    const result = createTagsDisplay('not an array');

    // Assert
    expect(result).toBe(
      '<span class="text-dropp-gray-500 text-sm">No tags</span>',
    );
  });

  it('should filter out invalid values and return valid tags', () => {
    // Arrange - Mix of valid and invalid tags
    const tags = ['electronics', null, 'laptop', undefined, '', 'gaming', 123];

    // Act
    const result = createTagsDisplay(tags);

    // Assert
    expect(result).toContain('electronics');
    expect(result).toContain('laptop');
    expect(result).toContain('gaming');
    expect(result).not.toContain('null');
    expect(result).not.toContain('undefined');
    expect(result).not.toContain('123');
  });

  it('should return "No tags" when all tags are invalid', () => {
    // Arrange
    const tags = [null, undefined, '', 123, {}];

    // Act
    const result = createTagsDisplay(tags);

    // Assert
    expect(result).toBe(
      '<span class="text-dropp-gray-500 text-sm">No tags</span>',
    );
  });

  it('should handle single valid tag', () => {
    // Arrange
    const tags = ['electronics'];

    // Act
    const result = createTagsDisplay(tags);

    // Assert
    expect(result).toContain('electronics');
    expect(result).toMatch(/^<span.*>electronics<\/span>$/);
  });

  it('should return properly formatted HTML structure', () => {
    // Arrange
    const tags = ['test-tag'];

    // Act
    const result = createTagsDisplay(tags);

    // Assert
    expect(result).toBe(
      '<span class="px-4 py-2 bg-dropp-secondary/10 text-dropp-secondary rounded-lg text-sm font-medium border border-dropp-primary/20">test-tag</span>',
    );
  });

  it('should join multiple tags without separators', () => {
    // Arrange
    const tags = ['tag1', 'tag2'];

    // Act
    const result = createTagsDisplay(tags);

    // Assert
    expect(result).toContain('tag1');
    expect(result).toContain('tag2');
    // Should be concatenated spans with no space or separator
    expect(result).toMatch(/tag1<\/span><span.*>tag2/);
  });

  it('should handle tags with special characters', () => {
    // Arrange
    const tags = ['custom-made', 'eco-friendly', 'hand&crafted'];

    // Act
    const result = createTagsDisplay(tags);

    // Assert
    expect(result).toContain('custom-made');
    expect(result).toContain('eco-friendly');
    expect(result).toContain('hand&crafted');
  });
});
