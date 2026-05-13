import { Router } from "express";
import { z } from "zod";
import { generateObject, generateText } from "ai";
import { groq } from "@ai-sdk/groq";
import { ChatResponseSchema } from "../lib/cartSchema.js";
import { buildSystemPrompt } from "../lib/buildPrompt.js";

const router = Router();
const MODEL = "openai/gpt-oss-20b";

console.log(`[chat] Using model: groq(${MODEL})`);

const RequestSchema = z.object({
  message: z.string(),
  history: z.array(z.object({
    role: z.enum(["user", "assistant"]),
    content: z.string(),
  })).optional(),
});

router.post("/", async (req, res) => {
  const result = RequestSchema.safeParse(req.body);
  if (!result.success) {
    res.status(400).json({ error: result.error.flatten() });
    return;
  }

  const { message, history } = result.data;
  const messages = [...(history ?? []), { role: "user" as const, content: message }];

  try {
    const { object } = await generateObject({
      model: groq(MODEL),
      schema: ChatResponseSchema,
      system: buildSystemPrompt(),
      messages,
    });

    res.json(object);
  } catch (primaryErr) {
    console.error("generateObject failed, falling back to generateText:", (primaryErr as Error).message);

    try {
      const { text } = await generateText({
        model: groq(MODEL),
        system:
          buildSystemPrompt() +
          "\n\nIMPORTANT: Respond with ONLY raw JSON (no markdown, no code fences) matching this exact shape: " +
          '{ "operations": [{ "action": "add"|"remove"|"modify"|"clear", "itemName": string, "quantity": number, "size"?: "small"|"medium"|"large", "modifiers"?: string[] }], "reply": string }',
        messages,
      });

      const parsed = ChatResponseSchema.parse(JSON.parse(text));
      res.json(parsed);
    } catch {
      res.json({ operations: [], reply: "Sorry, I didn't catch that. Could you rephrase?" });
    }
  }
});

export default router;
