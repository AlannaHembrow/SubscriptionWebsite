import app from "./firebase_config.js";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const auth = getAuth(app);

const rememberMeCheck = document.getElementById("rememberMe"),
  emailInput = document.getElementById("emailAddress"),
  loginForm = document.getElementById("signinForm");

loginForm.addEventListener("submit", signIn);

if (localStorage.checkbox && localStorage.checkbox !== "") {
  rememberMeCheck.setAttribute("checked", "checked");
  emailInput.value = localStorage.email;
} else {
  rememberMeCheck.removeAttribute("checked");
  emailInput.value = "";
}

function signIn(event) {
  event.preventDefault();

  const email = loginForm.email.value;
  const password = loginForm.password.value;

  signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      if (rememberMeCheck.checked && emailInput.value !== "") {
        localStorage.email = emailInput.value;
        localStorage.checkbox = rememberMeCheck.value;
      } else {
        localStorage.email = "";
        localStorage.checkbox = "";
      }
      localStorage.setItem("userLoggedIn", "enabled");
      location.href = "dashboard.html";
    })
    .catch((err) => {
      console.log(err.message);
    });
}
