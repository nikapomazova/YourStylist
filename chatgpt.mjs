import { doc, collection, query, where, getDocs, updateDoc } from "./firebaseInitializing.js";
import OpenAI from "openai";
const client = new OpenAI();

// const response = await client.responses.create({
//     model: "o4-mini",
//     input: "Write a one-sentence bedtime story about a unicorn."
// });

export async function describePic(db, uid, fileName) {

    const descriptionResponse = await client.responses.create({
        model: "o4-mini",
        input: [{
            role: "user",
            content: [
                { type: "input_text", text: "Describe the object of clothing in this photo in 1 sentence" },
                {
                    type: "input_image",
                    image_url: `yourstylist.stereopi.com/uploads/${uid}/${fileName}`,
                },
            ],
        }],
    });

    const description = descriptionResponse.output_text;

    const imagesRef = collection(db, "users", uid, "images");
    const q = query(imagesRef, where("name", "==", fileName));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
        console.log("No matching image found in database.");
        return;
    }

    querySnapshot.forEach(async (docSnap) => {
        const docRef = doc(db, "users", uid, "images", docSnap.id);
        await updateDoc(docRef, {
            description: description
        });
    });
}

console.log("File executed");