import express from "express";
import cors from "cors";
import projectsRouter from "./routes/projects.js";
import defillamaRouter from "./routes/defillama.js";
import projectRouter from "./routes/project.js";
import categoriesRouter from "./routes/categories.js";
import ecosystemsRouter from "./routes/ecosystems.js";

const app = express();
const PORT = Number(process.env.PORT) || 5000;

app.use(cors());
app.use(express.json());
app.use("/api/projects", projectsRouter);
app.use("/api/defillama", defillamaRouter);
app.use("/api/project", projectRouter);
app.use("/api/categories", categoriesRouter);
app.use("/api/ecosystems", ecosystemsRouter);

app.get("/api/health", (_req, res) => {
  res.json({
    success: true,
    message: "Sorvis API is running",
  });
});

app.listen(PORT, () => {
  console.log(`Sorvis API running on http://localhost:${PORT}`);
});