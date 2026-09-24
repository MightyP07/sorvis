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

router.post("/sync", async (req, res) => {
  try {
    const offset = Math.max(
      Number.parseInt(String(req.query.offset ?? "0"), 10) || 0,
      0,
    );

    const limit = Math.min(
      Math.max(
        Number.parseInt(String(req.query.limit ?? "250"), 10) || 250,
        1,
      ),
      250,
    );

    console.log(
      `Starting DeFiLlama sync: offset=${offset}, limit=${limit}`,
    );

    const result = await syncProtocols(offset, limit);

    console.log("DeFiLlama batch completed:", result);

    res.json({
      success: true,
      message: "DeFiLlama batch synced successfully",
      data: result,
    });
  } catch (error) {
    console.error("Failed to sync DeFiLlama batch:", error);

    res.status(500).json({
      success: false,
      message: "Failed to sync DeFiLlama batch",
    });
  }
});

export default router;