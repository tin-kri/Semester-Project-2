export function select(selector) {
  return document.querySelector(selector);
}

export function setHTML(selector, html) {
  const element = select(selector);
  if (element) {
    element.innerHTML = html;
  }
}

export function showLoading(selector, message = 'Loading...') {
  setHTML(
    selector,
    `
        <div class="col-span-full text-center py-8">
            <p class="text-dropp-gray-600">${message}</p>
        </div>
    `,
  );
}

export function showError(selector, message = 'Something went wrong') {
  setHTML(
    selector,
    `
        <div class="col-span-full text-center py-8">
            <p class="text-red-600 mb-4">${message}</p>
            <button onclick="location.reload()" class="text-dropp-primary hover:underline">
                Try Again
            </button>
        </div>
    `,
  );
}

export function showEmpty(selector, message = 'No items found') {
  setHTML(
    selector,
    `
        <div class="col-span-full text-center py-8">
            <p class="text-dropp-gray-600">${message}</p>
        </div>
    `,
  );
}
