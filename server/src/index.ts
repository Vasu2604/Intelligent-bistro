import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import menuRouter from "./routes/menu.js";
import chatRouter from "./routes/chat.js";

const app = express();

// Dev only — lock this down before any real deployment
app.use(cors());
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ ok: true });
});

app.use("/api/menu", menuRouter);
app.use("/api/chat", chatRouter);

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err);
  res.status(500).json({ error: err.message });
});

const port = process.env.PORT ?? 3000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
