export function createTagsDisplay(tags) {
    const container = document.querySelector("#single-listing-tag");
    if (tags && tags.length > 0) {
      container.innerHTML = tags
        .map(
          (tag) =>
            `<span class="px-4 py-2 bg-dropp-primary/10 text-dropp-primary rounded-lg text-sm font-medium border border-dropp-primary/20">${tag}</span>`
        )
        .join("");
    } else {
      container.innerHTML =
        '<span class="text-dropp-gray-500 text-sm">No tags</span>';
    }
  }