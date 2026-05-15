import OpenAI from "openai";

if (!process.env.DEEPINFRA_API_KEY) {
  console.warn(
    "⚠️  DEEPINFRA_API_KEY is not set — AI features will fail until it is configured in .env"
  );
}

const ai = new OpenAI({
  baseURL: "https://api.deepinfra.com/v1/openai",
  apiKey: process.env.DEEPINFRA_API_KEY,
});

export const AI_MODEL =
  process.env.DEEPINFRA_MODEL || "deepseek-ai/DeepSeek-V4-Flash";

export default ai;
