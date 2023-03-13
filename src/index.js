import app from './firebase_config.js'
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';

const auth = getAuth(app);
const loginStatus = document.getElementById("userOptions");
const hiddenUser = document.getElementById("hiddenUser");
const nightButton = document.getElementById("nightMode");
const footerCurrentDate = document.getElementById("currentDate");
const elements = document.querySelectorAll(".contact__form-input");
const header = document.querySelectorAll(".header");
const footer = document.querySelectorAll(".footer");
let darkMode = localStorage.getItem("dark-mode");
let userStatus = localStorage.getItem("userLoggedIn");
let siteBody = document.body;
let subscriptionBody = document.getElementById("container");
let contactForm = document.getElementById("contactForm");
let contactFormSubmit = document.getElementById("submitContact");
let contactHeader = document.getElementById("contactHeader");
let termsAndConditions = document.getElementById("termsAndConditions");
let subButton = document.querySelectorAll(".submitButton");

document.getElementById("userOptions").onclick = function() {userMenu()};
document.getElementById("logOut").onclick = function() {logOut()};

function userMenu() {
    if (userStatus == 'enabled') {
            hiddenUser.style.display = "block";
            hiddenUser.classList.add('hiddenUser.active');
            console.log('User is logged in, menu shown');
        } else {
            location.href = "../dist/sign_in.html";
        }
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
                localStorage.setItem("userLoggedIn", "disabled");
                console.log('user signed out');
                location.href = "../dist/sign_in.html";
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
    } else if (termsAndConditions != null) {
        termsAndConditions.classList.add('conditions__dark');
        termsAndConditions.classList.remove('conditions__light');
    } else if (subButton != null) {
        subButton.forEach((element) => {
            element.classList.add('index__submit-dark');
            element.classList.remove('index__submit-light');
          });
    }
    header.forEach((element) => {
        element.classList.remove('header_light');
        element.classList.add('header_dark');
      });

    footer.forEach((element) => {
        element.classList.remove('footer_light');
        element.classList.add('footer_dark');
    });
}

function disableDarkMode() {
    siteBody.classList.remove('dark-mode');
    siteBody.classList.add('light_mode');
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
    } else if (termsAndConditions != null) {
        termsAndConditions.classList.remove('conditions__dark');
        termsAndConditions.classList.add('conditions__light');
    } else if (subButton != null) {
        subButton.forEach((element) => {
            element.classList.remove('index__submit-dark');
            element.classList.add('index__submit-light');
          });
    }
    header.forEach((element) => {
        element.classList.add('header_light');
        element.classList.remove('header_dark');
      });

    footer.forEach((element) => {
        element.classList.add('footer_light');
        element.classList.remove('footer_dark');
    });
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

console.log(userStatus)

onAuthStateChanged(auth, (user) => {
    if (userStatus == 'enabled') {
        console.log('user status:', user)
        const displayName = user.displayName;
        loginStatus.innerHTML =  'Welcome, ' + displayName;
    } else {
        console.log('user status:', user);
        loginStatus.innerHTML = 'Log In';
    } 
}) 