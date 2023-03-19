import app from "./firebase_config.js";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

const auth = getAuth(app);

function sendResetPassword(event) {
  event.preventDefault();
  const email = forgotPass.email.value;
  sendPasswordResetEmail(auth, email)
    .then(() => {
      forgotPass.reset();
      location.href = "../Pages/reset_pass_success.html";
    })
    .catch((err) => {
      console.log(err.message);
      // ..
    });
}

const forgotPass = document.getElementById("resetPassForm");
forgotPass.addEventListener("submit", sendResetPassword);
