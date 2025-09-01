export function initBioEditor(
  bioElement,
  editButton,
  currentBio,
  onBioUpdated,
  hideAvatarEditor,
  showAvatarEditor
) {
  editButton.addEventListener("click", enterEditMode);

  function enterEditMode() {
    const textarea = document.createElement("textarea");
    textarea.value = currentBio || "";
    textarea.className = "w-full m-5 p-2 border rounded rows";
    textarea.maxLength = 160;

    const saveBtn = document.createElement("button");
    saveBtn.textContent = "Save";
    saveBtn.className = "btn btn-primary mr-3 px-6 py-2  ";

    const cancelBtn = document.createElement("button");
    cancelBtn.textContent = "Cancel";
    cancelBtn.className = "btn .btn-light px-6 py-2 ";

    bioElement.innerHTML = "";
    bioElement.appendChild(textarea);
    bioElement.appendChild(saveBtn);
    bioElement.appendChild(cancelBtn);

    editButton.style.display = "none";
    hideAvatarEditor();
    saveBtn.onclick = () => saveBio(textarea.value);
    cancelBtn.onclick = exitEditMode;
  }

  function exitEditMode() {
    bioElement.textContent = currentBio || "No bio available";
    editButton.style.display = "block";

    showAvatarEditor();
  }

  function saveBio(newBio) {
    onBioUpdated(newBio)
      .then(() => {
        currentBio = newBio;
        exitEditMode();
      })
      .catch((error) => console.error("Save failed:", error));
  }
}
