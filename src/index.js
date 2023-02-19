import app from './firebase_config.js'
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const auth = getAuth(app);

onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log('user status:', user)
        const displayName = user.displayName;
        document.getElementById("loginStatus").href="dashboard.html";
        document.getElementById("loginStatus").innerHTML =  'Welcome, ' + displayName;
    } else {
        console.log('user status:', user)
        document.getElementById("loginStatus").href="sign_in.html";
        document.getElementById("loginStatus").innerHTML = 'Log In';
    }
})