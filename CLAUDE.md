# Intelligent Bistro - Project Instructions

## Project Overview
A mobile food ordering app where users browse a menu, manage a cart via UI, AND talk to an AI assistant in natural language ("add 2 burgers and a coke") to update their cart. Built for an engineering assessment, due in 4 days.

## Architecture
- **Frontend**: React Native + Expo (in `/app` folder)
  - Expo Router for navigation (file-based routing)
  - NativeWind v4 for styling (Tailwind CSS for RN)
  - Zustand for cart state management
  - Three main screens: Menu, Cart, Chat
- **Backend**: Node.js + Express + TypeScript (in `/server` folder)
  - Endpoints: `GET /api/menu`, `POST /api/chat`
  - Uses Vercel AI SDK with Google Gemini (free tier)
  - Returns structured JSON via Zod schemas
- **AI**: Google Gemini 2.0 Flash (free, via @ai-sdk/google)

## Tech Stack Rules
- Use **TypeScript** everywhere — no plain JS files
- Use **functional components** with hooks, never class components
- Use **NativeWind** className syntax for styling, NOT StyleSheet
- Use **Zustand** for global state (cart), useState for local
- Use **Expo Router** file-based routing (`app/(tabs)/menu.tsx` etc.), NOT React Navigation directly
- Backend uses **ES modules** (import/export), not CommonJS

## The AI Flow (most important part)
1. User types a message in Chat screen → POST to `/api/chat`
2. Backend sends message + menu context to Gemini
3. Gemini returns structured JSON: `{ operations: [{action, itemName, quantity, size?, modifiers?}], reply: string }`
4. Frontend applies operations to Zustand cart store
5. User sees both: updated cart AND assistant's chat reply

## Cart Operation Schema (Zod)
```typescript
const CartUpdateSchema = z.object({
  operations: z.array(z.object({
    action: z.enum(["add", "remove", "modify", "clear"]),
    itemName: z.string(),
    quantity: z.number().int().positive(),
    size: z.enum(["small", "medium", "large"]).optional(),
    modifiers: z.array(z.string()).optional(),
  })),
  reply: z.string(),
});
```

## Code Style
- Prefer clarity over cleverness — this is a 2-day build
- Add brief comments only where logic isn't obvious
- Keep files under 200 lines; split into components when bigger
- Use descriptive names: `addItemToCart` not `add`
- Error handling: wrap API calls in try/catch, show user-friendly errors

## What NOT to do
- Don't add authentication (out of scope for this assessment)
- Don't add a database — keep menu hardcoded, cart in Zustand only
- Don't add payment processing
- Don't over-engineer — this is a demo, not production
- Don't use external UI kits unless I ask — NativeWind + custom components only

## When generating code
- Always show me which file you're editing
- Run TypeScript/ESLint checks mentally before showing code
- If a library isn't installed yet, tell me the `npm install` command first
- Test imports — don't import from packages we haven't installed