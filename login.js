import {auth, signInWithEmailAndPassword} from "./firebaseInitializing.js?v=1.0";

const loginButton = document.getElementById("loginButton");

const email = document.getElementById("email").value.trim();
const password = document.getElementById("password").value;

loginButton.disabled = !(email && password);

document.getElementById("loginButton").addEventListener("click", async () => {
    const errorText = document.getElementById("errorDisplay").value;

    try {
        //logging the user in
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
    
        //checking if email is verified
        if (!user.emailVerified) {
          await auth.signOut(); //force logout if not verified
          errorText.textContent ='Please verify your email first. Check your inbox.';
        }
    
        //redirecting to main
        window.location.href = '/Main.html';
      } catch (error) {
        //handling specific errors
        switch(error.code) {
          case 'auth/user-not-found':
            errorText.textContent = 'Email not registered. Sign up first.';
            if (confirm("Go to sign up?")) {
                window.location.href = "/index.html";
            }
            break;
          case 'auth/wrong-password':
            errorText.textContent = 'Incorrect password.';
            break;
          default:
            errorText.textContent = error.message;
        }
      }
});