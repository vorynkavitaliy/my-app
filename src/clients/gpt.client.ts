import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  organization: process.env.NEXT_PUBLIC_ORIGIN,
  dangerouslyAllowBrowser: true,
  project: process.env.NEXT_PUBLIC_PROJECT_ID,
});

export default openai;
