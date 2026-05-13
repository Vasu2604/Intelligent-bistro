import { z } from "zod";

export const CartOperationSchema = z.object({
  action: z.enum(["add", "remove", "modify", "clear"])
    .describe("The cart action to perform. Use 'clear' to empty entire cart."),
  itemName: z.string()
    .describe("Exact name of the menu item, e.g. 'Classic Cheeseburger'. Match against menu names."),
  quantity: z.number().int().positive()
    .describe("Number of units. For 'clear', set to 1."),
  size: z.enum(["small", "medium", "large"]).optional()
    .describe("Size, only for items with availableSizes (drinks, fries). Default medium if user doesn't say."),
  modifiers: z.array(z.string()).optional()
    .describe("Extras requested, e.g. ['extra cheese', 'no onions']. Match against availableModifiers."),
});

export const ChatResponseSchema = z.object({
  operations: z.array(CartOperationSchema)
    .describe("Ordered list of cart operations to apply. Empty if user just chatting."),
  reply: z.string()
    .describe("Friendly conversational response to show the user. Confirm what was done. Keep under 2 sentences."),
});

export type ChatResponse = z.infer<typeof ChatResponseSchema>;
