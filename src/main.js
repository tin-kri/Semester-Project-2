// import './style.css'
// import javascriptLogo from './javascript.svg'
// import viteLogo from '/vite.svg'
// import { setupCounter } from './counter.js'

// import { FetchableDevEnvironment } from "vite";

// document.querySelector('#app').innerHTML = `
//   <div>
//     <a href="https://vite.dev" target="_blank">
//       <img src="${viteLogo}" class="logo" alt="Vite logo" />
//     </a>
//     <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
//       <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" />
//     </a>
//     <h1>Well hello there!</h1>
//     <div class="card">
//       <button id="counter" type="button"></button>
//     </div>
//     <p class="read-the-docs">
//       Click on the Vite logo to learn more
//     </p>
//   </div>
// `

// setupCounter(document.querySelector('#counter'))
console.log("working?");

// const API_KEY = {
//     headers: {
//       'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoidGlua3JpNTQxNzMiLCJlbWFpbCI6InRpbmtyaTU0MTczQHN0dWQubm9yb2ZmLm5vIiwiaWF0IjoxNzQ5NjM5MjQ0fQ.-uNJ7ifEKMUs0EcVPt1wXdPSY4mmrTHY7URJXmmo_tM',
//       'X-Noroff-API-Key': '4829af8a-6808-4656-99de-32c69a51c4d0'
//     }
//   };

//   const options = {
//     headers: {
//       Authorization: `Bearer ${accessToken}`,
//       "X-Noroff-API-Key": apiKey.data.key
//     }
//   }

//   const response = await fetch(`${NOROFF_API_URL}/social/posts`, options)
//   const data = await response.json()


const registerForm = document.querySelector("#register-form");


const API_BASE = "https://v2.api.noroff.dev";
const API_AUTH = `${API_BASE}/auth`;
const API_AUTH_REGISTER = `${API_AUTH}/register`;

//get user info formFields
//fetch request post request
//storage
async function registerUser(userDetails) {
  try {
    const fetchOptions = {
        method: 'POST',
        body: JSON.stringify(userDetails),
        headers: {
            'Content-Type': 'application/json',
        }
    };
    const response = await fetch(API_AUTH_REGISTER, fetchOptions);
    console.log(response);
  } catch (error) {
    console.log(error);
  }
}

//handler

function onRegisterFormSubmit(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const formFields = Object.fromEntries(formData);
  registerUser(formFields)
  console.log(formFields);
}

registerForm.addEventListener("submit", onRegisterFormSubmit);
