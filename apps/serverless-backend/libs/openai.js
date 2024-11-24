import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // This is the default and can be omitted
});

async function getChatGptAnswer(content) {
  let response = "";
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      temperature: 0.5,
      messages: [
        {
          role: "user",
          content,
        },
      ],
    });
    if (completion && completion.choices && completion.choices[0]) {
      response = completion.choices[0].message.content ?? "";
    }
  } catch (err) {
    console.log("error generating chat gpt response: ", err);
  }
  return response;
}

export { getChatGptAnswer };
