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

router.get("/projects", async (req, res) => {
  try {
    const search =
      typeof req.query.search === "string"
        ? req.query.search.trim().toLowerCase()
        : "";

    const category =
      typeof req.query.category === "string"
        ? req.query.category.trim().toLowerCase()
        : "";

    const ecosystem =
      typeof req.query.ecosystem === "string"
        ? req.query.ecosystem.trim().toLowerCase()
        : "";

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
          typeof req.query.limit === "string" ? req.query.limit : "24",
          10,
        ) || 24,
        1,
      ),
      100,
    );

    const protocols = await fetchProtocols();

    const filtered = protocols.filter((protocol) => {
      const protocolName = protocol.name?.toLowerCase() ?? "";
      const description = protocol.description?.toLowerCase() ?? "";
      const protocolCategory = protocol.category?.toLowerCase() ?? "";
      const chains = (protocol.chains ?? []).map((chain) =>
        chain.toLowerCase(),
      );

      const matchesSearch =
        !search ||
        protocolName.includes(search) ||
        description.includes(search);

      const matchesCategory =
        !category ||
        protocolCategory === category;

      const matchesEcosystem =
        !ecosystem ||
        chains.includes(ecosystem);

      return (
        matchesSearch &&
        matchesCategory &&
        matchesEcosystem
      );
    });

    const total = filtered.length;
    const totalPages = Math.ceil(total / limit);
    const skip = (page - 1) * limit;

    const projects = filtered
      .slice(skip, skip + limit)
      .map((protocol) => ({
        id: `defillama-${protocol.id}`,
        name: protocol.name,
        slug: protocol.slug,
        description:
          protocol.description?.trim() ||
          `${protocol.name} Web3 project.`,
        website: protocol.url ?? null,
        logoUrl: protocol.logo ?? null,

        userId: "defillama",
        categoryId: protocol.category
          ? protocol.category.toLowerCase().replace(/\s+/g, "-")
          : "defi",

        category: {
          id: protocol.category
            ? protocol.category.toLowerCase().replace(/\s+/g, "-")
            : "defi",
          name: protocol.category ?? "DeFi",
          slug: protocol.category
            ? protocol.category.toLowerCase().replace(/\s+/g, "-")
            : "defi",
        },

        ecosystems: (protocol.chains ?? []).map((chain) => ({
          projectId: `defillama-${protocol.id}`,
          ecosystemId: chain.toLowerCase().replace(/\s+/g, "-"),
          ecosystem: {
            id: chain.toLowerCase().replace(/\s+/g, "-"),
            name: chain,
            slug: chain.toLowerCase().replace(/\s+/g, "-"),
          },
        })),

        verification: null,

        metrics:
          typeof protocol.tvl === "number" ||
          typeof protocol.change_7d === "number"
            ? [
                {
                  id: `defillama-metric-${protocol.id}`,
                  projectId: `defillama-${protocol.id}`,
                  momentumScore: null,
                  users: null,
                  growth:
                    typeof protocol.change_7d === "number"
                      ? protocol.change_7d
                      : null,
                  tvl:
                    typeof protocol.tvl === "number"
                      ? protocol.tvl
                      : null,
                  recordedAt: new Date().toISOString(),
                },
              ]
            : [],

        fundings: [],

        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }));

    res.json({
      success: true,
      data: projects,
      pagination: {
        page,
        limit,
        total,
        totalPages,
      },
    });
  } catch (error) {
    console.error(
      "Failed to fetch DeFiLlama projects:",
      error,
    );

    res.status(500).json({
      success: false,
      message: "Failed to fetch DeFiLlama projects",
    });
  }
});

router.post("/sync", async (req, res) => {
  try {
    const offset = Math.max(
      Number.parseInt(
        String(req.query.offset ?? "0"),
        10,
      ) || 0,
      0,
    );

    const limit = Math.min(
      Math.max(
        Number.parseInt(
          String(req.query.limit ?? "250"),
          10,
        ) || 250,
        1,
      ),
      250,
    );

    console.log(
      `Starting DeFiLlama sync: offset=${offset}, limit=${limit}`,
    );

    const result = await syncProtocols(
      offset,
      limit,
    );

    console.log(
      "DeFiLlama batch completed:",
      result,
    );

    res.json({
      success: true,
      message:
        "DeFiLlama batch synced successfully",
      data: result,
    });
  } catch (error) {
    console.error(
      "Failed to sync DeFiLlama batch:",
      error,
    );

    res.status(500).json({
      success: false,
      message:
        "Failed to sync DeFiLlama batch",
    });
  }
});

export default router;