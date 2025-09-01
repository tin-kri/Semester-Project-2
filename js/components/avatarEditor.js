export function initAvatarEditor(
  formElement,
  editButton,
  currentAvatar,
  onAvatarUpdated,
  hideOtherEditor,
  showOtherEditor
) {
  editButton.addEventListener("click", enterEditMode);

  function enterEditMode() {
    const urlInput = document.createElement("input");
    urlInput.type = "url";
    urlInput.value = currentAvatar?.url || "";
    urlInput.className = "w-full m-5 p-2 border rounded";
    urlInput.placeholder = "https://example.com/image.jpg";

    const altInput = document.createElement("input");
    altInput.value = currentAvatar?.alt || "";
    altInput.className = "w-full m-5 p-2 border rounded";
    altInput.placeholder = "Image description (optional)";
    altInput.maxLength = 120;

    const saveBtn = document.createElement("button");
    saveBtn.textContent = "Save";
    saveBtn.className = "btn btn-primary mr-3 px-6 py-2";

    const cancelBtn = document.createElement("button");
    cancelBtn.textContent = "Cancel";
    cancelBtn.className = "btn .btn-light px-6 py-2";

    formElement.innerHTML = "";
    formElement.appendChild(urlInput);
    formElement.appendChild(altInput);
    formElement.appendChild(saveBtn);
    formElement.appendChild(cancelBtn);

    formElement.classList.remove("hidden");
    editButton.classList.add("hidden");
    hideOtherEditor();

    saveBtn.onclick = () => saveAvatar(urlInput.value, altInput.value);
    cancelBtn.onclick = exitEditMode;

    urlInput.focus();
  }

  function exitEditMode() {
    formElement.innerHTML = "";
    formElement.classList.add("hidden");
    editButton.classList.remove("hidden");
    showOtherEditor();
  }
  function saveAvatar(url, alt) {
    const trimmedUrl = url.trim();
    const trimmedAlt = alt.trim();

    if (!trimmedUrl) {
      console.error("Validation failed: Image URL is required");
      return;
    }

    if (trimmedAlt.length > 120) {
      console.error("Validation failed: Alt text exceeds 120 characters");
      return;
    }

    onAvatarUpdated({ url: trimmedUrl, alt: trimmedAlt })
      .then(() => {
        currentAvatar = { url: trimmedUrl, alt: trimmedAlt };
        exitEditMode();
      })
      .catch((error) => console.error("Save failed:", error));
  }
}
