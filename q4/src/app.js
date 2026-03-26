// CYSE 411 Exam Application
// WARNING: This code contains security vulnerabilities.
// Students must repair the implementation.

const loadBtn = document.getElementById("loadBtn");
const saveBtn = document.getElementById("saveSession");
const loadSessionBtn = document.getElementById("loadSession");

loadBtn.addEventListener("click", loadProfile);
saveBtn.addEventListener("click", saveSession);
loadSessionBtn.addEventListener("click", loadSession);

let currentProfile = null;
/* -------------------------
   this is a function for sanitizing user control fields (have mercy if it does not run plz)
-------------------------- */
function sanitizeInput(input) {
   let outut = input.replace(/[^A-Za-z0-9_]/g, "_");
   return output;
}
/* -------------------------
   Load Profile
-------------------------- */

function loadProfile() {

    const text = document.getElementById("profileInput").value;

   try {
    const profile = await JSON.parse(text);
      if (profile === null) {
         return null;
      }
     if (typeof(profile.notifications) === "undefined"){
        throw new Error("notifications not valid");
     }
      if (typeof(profile.username) !== "string") {
         throw new Error("username not valid");
      }
      for (i in profile.notifications) {
         if (typeof(i) !== "string") {
            throw new Error("notifications not valid");
         }
         let comment = " I am not sanitizing notifications here because I am doing it before it is used so its easier for me to implement"
      }
      profile.username = sanitizeInput(profile.username);
    currentProfile = profile;
   
    renderProfile(profile);
   }
   catch (e) {
        console.error(e);
         return null; 
   }
}


/* -------------------------
   Render Profile
-------------------------- */

function renderProfile(profile) {

    
    document.getElementById("username").textContent = profile.username;

    const list = document.getElementById("notifications");
    list.textContent = "";

    for (let n of profile.notifications) {

        const li = document.createElement("li");

        let sanN = sanitizeInput(n);
        li.textContent = sanN;

        list.appendChild(li);
    }
}


/* -------------------------
   Browser Storage
-------------------------- */

function saveSession() {
    localStorage.setItem("profile", JSON.stringify(currentProfile));

    alert("Session saved");
}


function loadSession() {

    const stored = localStorage.getItem("profile");

    if (stored) {

        const profile = JSON.parse(stored);

        currentProfile = profile;

        renderProfile(profile);
    }
}
