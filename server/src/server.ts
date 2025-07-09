import express from "express";
import cors from "cors";
import * as trpcExpress from "@trpc/server/adapters/express";
import { appRouter } from "./router.js";
import { createContext } from "./context.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;
const supabaseURL = process.env.SUPABASE_URL;

app.use(cors());
app.use(express.json());

if (!process.env.SUPABASE_URL || !process.env.SUPABASE_ANON_KEY) {
  console.error("❌ Missing required environment variables:");
  console.error("   - SUPABASE_URL");
  console.error("   - SUPABASE_ANON_KEY");
  console.error(
    "Please create a .env file in the server directory with these variables."
  );
  process.exit(1);
}

app.use(
  "/trpc",
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
  })
);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
  console.log(`Connected to Supabase: ${supabaseURL}`);
});
