export function createTagsDisplay(tags) {
  if (!tags || !Array.isArray(tags)) {
    return '<span class="text-dropp-gray-500 text-sm">No tags</span>';
  }

  const validTags = tags.filter(
    tag =>
      tag != null && tag !== undefined && tag !== '' && typeof tag === 'string'
  );

  if (validTags.length > 0) {
    return validTags
      .map(
        tag =>
          `<span class="px-4 py-2 bg-dropp-secondary/10 text-dropp-secondary rounded-lg text-sm font-medium border border-dropp-primary/20">${tag}</span>`
      )
      .join('');
  } else {
    return '<span class="text-dropp-gray-500 text-sm">No tags</span>';
  }
}
