import { Router } from "express";

import prisma from "../lib/prisma.js";

const router = Router();

router.get("/:slug", async (req, res) => {
  try {
    const { slug } = req.params;

    const project = await prisma.project.findUnique({
      where: {
        slug,
      },
      include: {
        category: true,

        ecosystems: {
          include: {
            ecosystem: true,
          },
        },

        verification: true,

        metrics: {
          orderBy: {
            recordedAt: "desc",
          },
          take: 30,
        },

        fundings: {
          orderBy: {
            announcedAt: "desc",
          },
        },
      },
    });

    if (!project) {
      res.status(404).json({
        success: false,
        message: "Project not found",
      });

      return;
    }

    res.json({
      success: true,
      data: project,
    });
  } catch (error) {
    console.error("Failed to fetch project:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch project",
    });
  }
});

export default router;