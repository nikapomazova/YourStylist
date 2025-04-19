console.log("Script loaded!");

console.log("Client exists?", typeof Appwrite.Client); // Should print "function"

//initialize the client
const client = new Appwrite.Client().setEndpoint('https://fra.cloud.appwrite.io/v1').setProject('67fab4540027acd187eb');

//initialize the account service
const account = new Appwrite.Account(client);

const nameElement = document.getElementById("name");
const emailElement = document.getElementById("email");
const passElement = document.getElementById("pass");
const passRElement = document.getElementById("passRepeat");

nameElement.addEventListener("input", changeButton);
emailElement.addEventListener("input", changeButton);
passElement.addEventListener("input", changeButton);
passRElement.addEventListener("input", () => {
    changeButton();
    if (passElement.value !== passRElement.value) {
        passRElement.style.borderColor = "red";
    } else {
        passRElement.style.borderColor = "green";
    }
});

const signButton = document.getElementById("signupButton");

function changeButton() {
    const name = nameElement.value.trim();
    const email = emailElement.value.trim();
    const password = passElement.value;
    const passwordRepeat = passRElement.value;
    signButton.disabled = !(name && email && password && passwordRepeat && password === passwordRepeat && password.length >= 6);
}

signButton.addEventListener("click", async () => {

    const name = nameElement.value.trim();
    const email = emailElement.value.trim();
    const password = passElement.value;
    const passwordRepeat = passRElement.value;
  
    if (password === passwordRepeat && password.length>=6) {
        try {
            const response = await account.create('unique()', email, password, name);
            console.log("User created:", response); //DELETE LATER maybe
        
            //sending an email with verification
            await account.createVerification(`${window.location.origin}/verify.html`);
            alert("Verification email sent!");
          } catch (error) {

            if (error.type === 'user_already_exists') { //if the account with that email already exists
                if (confirm("Account already exists. Go to login?")) {
                  window.location.href = "/LogIn.html";
                }
            }

            console.error("Signup error:", error);
            alert("Something went wrong.");
          }
    } else {
        alert("Please, enter the same password (6 characters minimum) in the second field.");
    }

}); 