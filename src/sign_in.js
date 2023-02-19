import app from './firebase_config.js'
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';

const auth = getAuth(app);

// logging in and out

const logoutButton = document.querySelector('.logout')
logoutButton.addEventListener('click', () => {
    signOut(auth)
        .catch((err) => {
            console.log(err.message)
    })
})

function signIn(event) {
    event.preventDefault()

    const email = loginForm.email.value
    const password = loginForm.password.value

    signInWithEmailAndPassword(auth, email, password)
        .then(() => {
        loginForm.reset()
        location.href = "dashboard.html";
        })
        .catch((err) => {
            console.log(err.message)
        })
}

const loginForm = document.getElementById('signinForm') 
loginForm.addEventListener('submit', signIn);
