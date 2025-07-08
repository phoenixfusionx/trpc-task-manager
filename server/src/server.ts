import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;
const supabaseURL = process.env.SUPABASE_URL;

app.use(cors());
app.use(express.json());

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
  console.log(`Connected to Supabase: ${supabaseURL}`);
});
