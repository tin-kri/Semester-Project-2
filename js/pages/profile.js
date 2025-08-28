import { initBioEditor } from "../components/bioEditor.js"
import { getMyProfile, updateMyProfile } from "../api/profiles.js" 

export async function initProfile() {
  console.log("Profile page initialized successfully")

  try {
    const profileData = await getMyProfile()
    const data = profileData.data

    renderProfileData(data)
    initializeBioEditor(data.bio)
    
  } catch (error) {
    console.error("Failed to load profile:", error)
    showErrorMessage("Failed to load profile data")
  }
}

function renderProfileData(data) {
  const avatarContainer = document.querySelector("#profile-user-img")
  if (data.avatar && data.avatar.url) {
    const img = document.createElement("img")
    img.src = data.avatar.url
    img.alt = data.avatar.alt || "Profile avatar"
    img.className = "w-24 h-24 rounded-full object-cover"

    avatarContainer.innerHTML = ""
    avatarContainer.appendChild(img)
  }

  document.querySelector("#profile-user-name").textContent = data.name
  document.querySelector("#profile-user-bio").textContent = data.bio || "No bio available"
  document.querySelector("#profile-credits").textContent = data.credits
  document.querySelector("#profile-listings-count").textContent = data._count.listings
  document.querySelector("#profile-bids-won-count").textContent = data._count.bids_won || data._count.wins || 0
}

function initializeBioEditor(currentBio) {
  const bioElement = document.querySelector("#profile-user-bio")
  const editButton = document.querySelector("#edit-bio")

  if (!bioElement || !editButton) {
    console.error("Bio editor elements not found")
    return
  }

  initBioEditor(bioElement, editButton, currentBio, handleBioUpdate)
}

async function handleBioUpdate(newBio) {
  try {
    await updateMyProfile({ bio: newBio })
    console.log("Bio updated successfully")
    return Promise.resolve()
  } catch (error) {
    console.error("Failed to update bio:", error)
    showErrorMessage("Failed to update bio")
    return Promise.reject(error)
  }
}


  // TODO implement a ´ notification or error display here
function showErrorMessage(message) {
  console.error(message)
  const errorDiv = document.createElement("div")
  errorDiv.className = "bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4"
  errorDiv.textContent = message

  const main = document.querySelector("main")
  if (main) {
    main.insertBefore(errorDiv, main.firstChild)
    setTimeout(() => errorDiv.remove(), 4000)
  }
}
