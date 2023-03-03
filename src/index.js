import app from './firebase_config.js'
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';

const auth = getAuth(app);
const loginStatus = document.getElementById("userOptions");
const hiddenUser = document.getElementById("hiddenUser");

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

