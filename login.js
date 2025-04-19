import { Client, Account } from 'appwrite';

//initialize the client
const client = new Client().setEndpoint('https://fra.cloud.appwrite.io/v1').setProject('67fab4540027acd187eb');

//initialize the account service
const account = new Account(client);

const loginButton = document.getElementById("loginButton");

const email = document.getElementById("email").value.trim();
const password = document.getElementById("password").value;

loginButton.disabled = !(email && password);

document.getElementById("loginBtn").addEventListener("click", async () => {
    const errorText = document.getElementById("errorDisplay").value;

    try {
        //creating the session
        await account.createEmailSession(email, password);
    
        //get user data
        const user = await account.get();
        console.log("Logged in:", user.name);
    
        //redirecting to main
        window.location.href = "/Main.html";
    
    } catch (error) {

        if (error.type === 'invalid_credentials') { //if the user does not exist
            errorText.textContent = "Invalid email or password";
            if (confirm("Go to sign up?")) {
                window.location.href = "/index.html";
            }
        } else {
            errorElement.textContent = "Login failed.";
        }
    }
});