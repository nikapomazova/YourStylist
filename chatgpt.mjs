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
                    image_url: `https://yourstylist.stereopi.com/uploads/${uid}/${fileName}`,
                },
            ],
        }],
    });

    return descriptionResponse.output_text;
}

console.log("File executed");