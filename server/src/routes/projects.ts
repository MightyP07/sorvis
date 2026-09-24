import { Router } from "express";
import prisma from "../lib/prisma.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const search =
      typeof req.query.search === "string"
        ? req.query.search.trim()
        : "";

    const category =
      typeof req.query.category === "string"
        ? req.query.category
        : undefined;

    const ecosystem =
      typeof req.query.ecosystem === "string"
        ? req.query.ecosystem
        : undefined;

    const page = Math.max(
      Number.parseInt(
        typeof req.query.page === "string" ? req.query.page : "1",
        10,
      ) || 1,
      1,
    );

    const limit = Math.min(
      Math.max(
        Number.parseInt(
          typeof req.query.limit === "string"
            ? req.query.limit
            : "20",
          10,
        ) || 20,
        1,
      ),
      100,
    );

    const skip = (page - 1) * limit;

    const where = {
      ...(search
        ? {
            OR: [
              {
                name: {
                  contains: search,
                  mode: "insensitive" as const,
                },
              },
              {
                description: {
                  contains: search,
                  mode: "insensitive" as const,
                },
              },
            ],
          }
        : {}),

      ...(category
        ? {
            category: {
              slug: category,
            },
          }
        : {}),

      ...(ecosystem
        ? {
            ecosystems: {
              some: {
                ecosystem: {
                  slug: ecosystem,
                },
              },
            },
          }
        : {}),
    };

    const [projects, total] = await Promise.all([
      prisma.project.findMany({
        where,
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
            take: 1,
          },
        },
        orderBy: {
          createdAt: "desc",
        },
        skip,
        take: limit,
      }),

      prisma.project.count({
        where,
      }),
    ]);

    res.json({
      success: true,
      data: projects,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Failed to fetch projects:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch projects",
    });
  }
});

export default router;