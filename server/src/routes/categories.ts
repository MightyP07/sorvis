import { Router } from "express";

import { fetchProtocols } from "../services/defillama.js";

const router = Router();

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

router.get("/", async (_req, res) => {
  try {
    const protocols = await fetchProtocols();

    const categoryCounts = new Map<string, number>();

    for (const protocol of protocols) {
      const category = protocol.category?.trim();

      if (!category) {
        continue;
      }

      categoryCounts.set(
        category,
        (categoryCounts.get(category) ?? 0) + 1,
      );
    }

    const categories = Array.from(categoryCounts.entries())
      .map(([name, count]) => ({
        name,
        slug: slugify(name),
        count,
      }))
      .sort((a, b) => {
        if (b.count !== a.count) {
          return b.count - a.count;
        }

        return a.name.localeCompare(b.name);
      });

    res.json({
      success: true,
      data: categories,
    });
  } catch (error) {
    console.error(
      "Failed to fetch DeFiLlama categories:",
      error,
    );

    res.status(500).json({
      success: false,
      message: "Failed to fetch DeFiLlama categories",
    });
  }
});

export default router;