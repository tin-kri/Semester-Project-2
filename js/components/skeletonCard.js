export function createSkeletonCard() {
  return `
        <div class="bg-dropp-gray-50 rounded-lg p-6">
            <!-- Image placeholder -->
            <div class="w-full h-48 bg-dropp-gray-300 rounded-lg mb-4"></div>
            
            <!-- Title placeholder -->
            <div class="h-4 bg-dropp-gray-300 rounded mb-3 w-3/4"></div>
            
            <!-- Price info placeholder -->
            <div class="flex items-center justify-between mb-2">
                <div class="flex-1">
                    <div class="h-3 bg-dropp-gray-300 rounded mb-1 w-1/2"></div>
                    <div class="h-2 bg-dropp-gray-300 rounded w-1/3"></div>
                </div>
                <div class="h-3 bg-dropp-gray-300 rounded w-1/4"></div>
            </div>
            
            <!-- Description placeholder -->
            <div class="space-y-2 mb-4">
                <div class="h-3 bg-dropp-gray-300 rounded"></div>
                <div class="h-3 bg-dropp-gray-300 rounded w-5/6"></div>
                <div class="h-3 bg-dropp-gray-300 rounded w-4/6"></div>
            </div>
            
            <!-- Button placeholder -->
            <div class="h-10 bg-dropp-gray-300 rounded w-full"></div>
        </div>
    `;
}

export function createSkeletonCards(count = 3) {
  if (!count || count < 1) {
    count = 3;
  }
  if (count > 10) {
    count = 10;
  }

  return Array(count)
    .fill(null)
    .map(() => createSkeletonCard())
    .join('');
}
