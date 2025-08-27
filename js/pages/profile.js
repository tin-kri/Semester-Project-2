import { getMyProfile } from "../api/profiles.js";
import { initBioEditor } from "../components/bioEditor.js";

// export async function initProfile() {
//   console.log("Profile page initialized successfully");

//   try {
//     const profileData = await getMyProfile();
//     console.log("Profile data:", profileData);

//     const data = profileData.data;
//     const img = document.createElement("img");

//     //update img
//     img.src = data.avatar.url;
//     img.alt = data.avatar.alt;
//     img.className = "w-24 h-24 rounded-full object-cover";
//     const avatarContainer = document.querySelector("#profile-user-img");
   
//     avatarContainer.appendChild(img);

//     // Update the name
//     document.querySelector("#profile-user-name").textContent = data.name;
//     //Update the bio
//     document.querySelector("#profile-user-bio").textContent =
//       data.bio || "No bio available";
//     //update credits
//     document.querySelector("#profile-credits").textContent = data.credits;
//     //update active listings
//     document.querySelector("#profile-listings-count").textContent =
//       data._count.listings;
//     //TODO update active bids seperat api call? not_count.listings
//     // document.querySelector("#profile-bids-count").textContent = ;
//     //update auctions won
//     document.querySelector("#profile-bids-won-count").textContent =
//       data._count.wins;
//   } catch (error) {
//     console.error("Failed to load profile:", error);
//   }
// }

export async function initProfile() {
    console.log("Profile page initialized successfully");
    
    try {
        const profileData = await getMyProfile();
        const data = profileData.data;
        
        
        const avatarContainer = document.querySelector("#profile-user-img");
        if (data.avatar && data.avatar.url) {
            const img = document.createElement("img");
            img.src = data.avatar.url;
            img.alt = data.avatar.alt || '';
            img.className = "w-24 h-24 rounded-full object-cover";
            
            avatarContainer.innerHTML = ''; // Clear SVG
            avatarContainer.appendChild(img);
        }
        // no avatar, keep  existing SVG
        
        //  text content
        document.querySelector("#profile-user-name").textContent = data.name;
        document.querySelector("#profile-user-bio").textContent = data.bio || "No bio available";
        document.querySelector("#profile-credits").textContent = data.credits;
        document.querySelector("#profile-listings-count").textContent = data._count.listings;
        document.querySelector("#profile-bids-won-count").textContent = data._count.wins;

        addEventListener.querySelector('#edit-bio')
        
    } catch (error) {
        console.error("Failed to load profile:", error);
    }
}
 