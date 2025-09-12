let searchTimeout;

export function initSearchComponent(onSearchChange) {
  const searchInput = document.querySelector('#search-filter');

  if (!searchInput) {
    console.warn('Filter search input not found');
    return;
  }

  searchInput.addEventListener('input', e => {
    const query = e.target.value.trim();

    // Debounced search
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      onSearchChange(query);
    }, 300);
  });
}
