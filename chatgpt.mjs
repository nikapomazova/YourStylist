import OpenAI from "openai";
const client = new OpenAI();

var response;

async function generateResponse() {
    console.log("Generating started");
    response = await client.responses.create({
        model: "o4-mini",
        input: "Write a one-sentence bedtime story about a unicorn."
    });
}

document.getElementById("generate").addEventListener("click", async () => {
    await generateResponse();
    console.log(response.output_text);
});