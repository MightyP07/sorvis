import { Router } from "express";

import {
  fetchProtocols,
  syncProtocols,
} from "../services/defillama.js";

const router = Router();

router.get("/protocols", async (_req, res) => {
  try {
    const protocols = await fetchProtocols();

    res.json({
      success: true,
      count: protocols.length,
      data: protocols,
    });
  } catch (error) {
    console.error("Failed to fetch DeFiLlama protocols:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch DeFiLlama protocols",
    });
  }
});

router.post("/sync", async (_req, res) => {
  try {
    console.log("Starting DeFiLlama sync...");

    const result = await syncProtocols();

    console.log("DeFiLlama sync completed:", result);

    res.json({
      success: true,
      message: "DeFiLlama projects synced successfully",
      data: result,
    });
  } catch (error) {
    console.error("Failed to sync DeFiLlama projects:", error);

    res.status(500).json({
      success: false,
      message: "Failed to sync DeFiLlama projects",
    });
  }
});

export default router;