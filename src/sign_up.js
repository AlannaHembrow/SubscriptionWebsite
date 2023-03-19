import app from "./firebase_config.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

const auth = getAuth(app);

const signupForm = document.querySelector(".signin__form");
signupForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = signupForm.email.value;
  const displayName = signupForm.username.value;
  const password = signupForm.password.value;

  createUserWithEmailAndPassword(auth, email, password)
    .then((cred) => {
      updateProfile(auth.currentUser, {
        displayName: displayName,
      });
      console.log("user created:", cred.user);
      console.log("displayName:", displayName);
      signupForm.reset();
      location.href = "dashboard.html";
    })
    .catch((err) => {
      console.log(err.message);
    });
});
