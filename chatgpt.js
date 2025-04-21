import OpenAI from "openai";
const client = new OpenAI();

var response;

async function generateResponse() {
    response = await client.responses.create({
        model: "o4-mini-2025-04-16",
        input: "Write a one-sentence bedtime story about a unicorn."
    });
}

document.getElementById("generate").addEventListener("click", async () => {
    await generateResponse();
    console.log(response.output_text);
});