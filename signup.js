import { Client, Account } from 'appwrite';

//initialize the client
const client = new Client();
client.setEndpoint('https://cloud.appwrite.io/v1').setProject('67fab4540027acd187eb');

//initialize the account service
const account = new Account(client);

document.getElementById("signupBtn").addEventListener("click", async () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
  
    try {
      const response = await account.create('unique()', email, password);
      console.log("User created:", response);
  
      // Send email verification
      await account.createVerification('https://your-redirect-url.com');
      alert("Verification email sent!");
    } catch (error) {
      console.error("Signup error:", error);
      alert(error.message); //DELETE LATER
    }

});