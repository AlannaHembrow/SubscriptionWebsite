import app from './firebase_config.js'
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';

const auth = getAuth(app);
const loginStatus = document.getElementById("userOptions");
const hiddenUser = document.getElementById("hiddenUser");
const nightButton = document.getElementById("nightMode");
const footerCurrentDate = document.getElementById("currentDate");
let darkMode = localStorage.getItem("dark-mode");
let siteBody = document.body;
let subscriptionBody = document.getElementById("container");

document.getElementById("userOptions").onclick = function() {userMenu()};
document.getElementById("logOut").onclick = function() {logOut()};

onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log('user status:', user)
        const displayName = user.displayName;
        loginStatus.innerHTML =  'Welcome, ' + displayName;
    } else {
        console.log('user status:', user)
        loginStatus.innerHTML = 'Log In';
    } 
}) 

function userMenu() {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            hiddenUser.style.display = "block";
            hiddenUser.classList.add('hiddenUser.active');
            console.log('User is logged in, menu shown');
        } else {
            location.href = "../dist/sign_in.html";
        }
  })
}


window.onclick = function(e){
    if (!e.target.matches('#userOptions') && !e.target.matches('.user__link') && hiddenUser.classList.contains('hiddenUser.active')) {
        hiddenUser.style.display = "none";
    }
}

function logOut() {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            signOut(auth)
            .then(() => {
              console.log('user signed out')
            })
            .catch(err => {
              console.log(err.message)
            })
        }
  })
}

function enableDarkMode() {
    siteBody.classList.add('dark-mode');
    nightButton.innerHTML = ('Light Mode');
    localStorage.setItem("dark-mode", "enabled");
    if (subscriptionBody != null) {
        subscriptionBody.classList.add('dark-mode');
    }
}

function disableDarkMode() {
    siteBody.classList.remove('dark-mode');
    nightButton.innerHTML = ('Dark Mode');
    localStorage.setItem("dark-mode", "disabled");
    if (subscriptionBody != null) {
        subscriptionBody.classList.remove('dark-mode');
    }
}

if (darkMode === "enabled") {
    enableDarkMode(); // set state of darkMode on page load
}

nightButton.addEventListener("click", (e) => {
    darkMode = localStorage.getItem("dark-mode"); // update darkMode when clicked
    if (darkMode === "disabled") {
      enableDarkMode();
    } else {
      disableDarkMode();
    }
});

var footerDate = new Date()
footerCurrentDate.innerHTML = (footerDate.getFullYear())