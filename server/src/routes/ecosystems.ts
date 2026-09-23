import { Router } from "express";
import prisma from "../lib/prisma.js";

const router = Router();

router.get("/", async (_req, res) => {
  try {
    const ecosystems = await prisma.ecosystem.findMany({
      orderBy: {
        name: "asc",
      },
      include: {
        _count: {
          select: {
            projects: true,
          },
        },
      },
    });

    res.json({
      success: true,
      data: ecosystems,
    });
  } catch (error) {
    console.error("Failed to fetch ecosystems:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch ecosystems",
    });
  }
});

export default router;