import app from './firebase_config.js'
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';

const auth = getAuth(app);
const loginStatus = document.getElementById("userOptions");
const hiddenUser = document.getElementById("hiddenUser");
const nightButton = document.getElementById("nightMode");
const footerCurrentDate = document.getElementById("currentDate");
const elements = document.querySelectorAll(".contact__form-input");
let darkMode = localStorage.getItem("dark-mode");
let siteBody = document.body;
let subscriptionBody = document.getElementById("container");
let headerDark = document.getElementById("header");
let footerDark = document.getElementById("footer");
let contactForm = document.getElementById("contactForm");
let contactFormSubmit = document.getElementById("submitContact");
let contactHeader = document.getElementById("contactHeader");

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
    siteBody.classList.remove('light_mode');
    siteBody.classList.add('dark-mode');
    headerDark.classList.add('header_dark');
    headerDark.classList.remove('header_light');
    footerDark.classList.remove('footer_light');
    footerDark.classList.add('footer_dark');
    nightButton.innerHTML = ('Light Mode');
    localStorage.setItem("dark-mode", "enabled");
    if (subscriptionBody != null) {
        subscriptionBody.classList.add('dark-mode');
    } else if (contactForm != null) {
        contactForm.classList.add('contact__form-dark');
        contactForm.classList.remove('contact__form-light');
        contactFormSubmit.classList.remove('contact__button-light');
        contactFormSubmit.classList.add('contact__button-dark');
        contactHeader.classList.add('contact__header-dark');
        contactHeader.classList.remove('contact__header-light');
        elements.forEach((element) => {
            element.classList.remove('contact__input-light');
            element.classList.add('contact__input-dark');
          });
    }
}

function disableDarkMode() {
    siteBody.classList.remove('dark-mode');
    siteBody.classList.add('light_mode');
    headerDark.classList.remove('header_dark');
    headerDark.classList.add('header_light');
    footerDark.classList.remove('footer_dark');
    footerDark.classList.add('footer_light');
    nightButton.innerHTML = ('Dark Mode');
    localStorage.setItem("dark-mode", "disabled");
    if (subscriptionBody != null) {
        subscriptionBody.classList.remove('dark-mode');
    } else if (contactForm != null) {
        contactForm.classList.remove('contact__form-dark');
        contactForm.classList.add('contact__form-light');
        contactFormSubmit.classList.add('contact__button-light');
        contactFormSubmit.classList.toggle('contact__button-dark');
        contactHeader.classList.remove('contact__header-dark');
        contactHeader.classList.add('contact__header-light');
        elements.forEach((element) => {
            element.classList.add('contact__input-light');
            element.classList.remove('contact__input-dark');
          });
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