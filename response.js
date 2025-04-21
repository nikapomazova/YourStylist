
import { auth, onAuthStateChanged, doc, db, collection, addDoc } from "./firebaseInitializing.js?v1.0.0";

let uid = null;

onAuthStateChanged(auth, (user) => {
    if (user) {
        uid = user.uid;
    } else {
        console.log("No user is signed in.");
    }
});

const fileUploaded = document.getElementById("fileToUpload");

fileUploaded.addEventListener("change", async () => {
    if (fileUploaded.files.length > 0) {
        const fileName = fileUploaded.files[0].name;

        let fileDescription = "Clothes description from ai";

        let prompt = "Describe this piece of clothing in 1 sentence"
        const imageUrl = `https://yourstylist.stereopi.com/uploads/${uid}/${fileName}`;

        try {
            const response = await fetch('https://yourstylist.stereopi.com:3000/openai', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    prompt: prompt,
                    image: imageUrl,
                }),
            });
            const data = await response.json();
            fileDescription = data.choices[0].message.content; // Use the AI response
            console.log("AI response: " + fileDescription);
        } catch (error) {
            console.error('Error: ', error);
        }

        await addDoc(collection(db, "users", uid, "images"), {
            name: fileName,
            description: fileDescription
        });
    }
});

window.location.href("/Wardrobe.html");