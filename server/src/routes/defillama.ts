import { Router } from "express";
import { fetchProtocols } from "../services/defillama.js";

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

export default router;