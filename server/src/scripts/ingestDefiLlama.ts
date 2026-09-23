import "dotenv/config";

import prisma from "../lib/prisma.js";

const DEFILLAMA_API = "https://api.llama.fi";

type DefiLlamaProtocol = {
  id: string;
  name: string;
  slug: string;
  symbol?: string | null;
  url?: string | null;
  logo?: string | null;
  description?: string | null;
  category?: string | null;
  chains?: string[];
  tvl?: number | null;
  change_1d?: number | null;
  change_7d?: number | null;
  change_1m?: number | null;
};

const CATEGORY_MAP: Record<string, string> = {
  // Core Sorvis categories
  DeFi: "DeFi",
  AI: "AI",
  Infrastructure: "Infrastructure",
  Gaming: "Gaming",
  NFT: "NFTs",
  NFTs: "NFTs",
  Social: "Social",
  Payments: "Payments",
  DePIN: "DePIN",

  // DeFi aliases
  "Liquid Staking": "DeFi",
  "Yield Aggregator": "DeFi",
  Yield: "DeFi",
  Dexes: "DeFi",
  DEXes: "DeFi",
  Lending: "DeFi",
  Derivatives: "DeFi",
  "Leveraged Farming": "DeFi",
  "Liquid Restaking": "DeFi",
  Restaking: "DeFi",
  CDP: "DeFi",
  "Asset Management": "DeFi",
  Insurance: "DeFi",
  Stablecoin: "DeFi",
  Options: "DeFi",
  "Prediction Market": "DeFi",

  // Infrastructure aliases
  Bridge: "Infrastructure",
  Bridges: "Infrastructure",
  Oracle: "Infrastructure",
  Oracles: "Infrastructure",
  RWA: "Infrastructure",
  "Real World Assets": "Infrastructure",
  "Developer Tools": "Infrastructure",
  Security: "Infrastructure",
  "Cross Chain": "Infrastructure",
  Interoperability: "Infrastructure",
  "Data Availability": "Infrastructure",
  "Layer 1": "Infrastructure",
  "Layer 2": "Infrastructure",
  Rollup: "Infrastructure",
  ZK: "Infrastructure",
  "ZK Rollup": "Infrastructure",

  // Gaming aliases
  Games: "Gaming",

  // Social aliases
  SocialFi: "Social",

  // Payments aliases
  Payment: "Payments",

  // DePIN aliases
  "Decentralized Physical Infrastructure": "DePIN",
};

function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

async function fetchProtocols(): Promise<DefiLlamaProtocol[]> {
  const response = await fetch(`${DEFILLAMA_API}/protocols`);

  if (!response.ok) {
    throw new Error(`DeFiLlama request failed: ${response.status}`);
  }

  return (await response.json()) as DefiLlamaProtocol[];
}

async function main() {
  console.log("Fetching protocols from DeFiLlama...");

  const protocols = await fetchProtocols();

  console.log(`Received ${protocols.length} protocols.`);

  const systemUser = await prisma.user.upsert({
    where: {
      email: "system@sorvis.local",
    },
    update: {},
    create: {
      email: "system@sorvis.local",
      name: "Sorvis",
    },
  });

  let imported = 0;
  let skipped = 0;

  for (const protocol of protocols) {
    if (!protocol.name || !protocol.slug) {
      skipped++;
      continue;
    }

    const categoryName = protocol.category
      ? CATEGORY_MAP[protocol.category]
      : undefined;

    if (!categoryName) {
      skipped++;
      continue;
    }

    const category = await prisma.category.upsert({
      where: {
        name: categoryName,
      },
      update: {},
      create: {
        name: categoryName,
        slug: slugify(categoryName),
      },
    });

    const project = await prisma.project.upsert({
      where: {
        slug: protocol.slug,
      },
      update: {
        name: protocol.name,
        description:
          protocol.description ||
          `${protocol.name} Web3 project discovered through Sorvis.`,
        website: protocol.url || null,
        logoUrl: protocol.logo || null,
        categoryId: category.id,
      },
      create: {
        name: protocol.name,
        slug: protocol.slug,
        description:
          protocol.description ||
          `${protocol.name} Web3 project discovered through Sorvis.`,
        website: protocol.url || null,
        logoUrl: protocol.logo || null,
        userId: systemUser.id,
        categoryId: category.id,
      },
    });

    /*
     * Rebuild the project's ecosystem relationships from the
     * latest DeFiLlama chain data.
     *
     * Example:
     *
     * Project
     *   ├── Ethereum
     *   ├── Base
     *   └── Arbitrum
     */
    await prisma.projectEcosystem.deleteMany({
      where: {
        projectId: project.id,
      },
    });

    const chains = Array.from(
      new Set(
        (protocol.chains ?? [])
          .map((chain) => chain.trim())
          .filter(Boolean),
      ),
    );

    for (const chain of chains) {
      const ecosystem = await prisma.ecosystem.upsert({
        where: {
          name: chain,
        },
        update: {},
        create: {
          name: chain,
          slug: slugify(chain),
        },
      });

      await prisma.projectEcosystem.create({
        data: {
          projectId: project.id,
          ecosystemId: ecosystem.id,
        },
      });
    }

    /*
     * Keep a historical metric snapshot for this ingestion run.
     *
     * TVL is optional. A project does NOT need positive TVL
     * to be imported into Sorvis.
     */
    await prisma.projectMetric.create({
      data: {
        projectId: project.id,
        tvl: protocol.tvl ?? null,
        growth: protocol.change_1m ?? null,
      },
    });

    imported++;

    if (imported % 50 === 0) {
      console.log(`Imported ${imported} projects...`);
    }
  }

  console.log("");
  console.log("Sorvis ingestion complete.");
  console.log(`Imported: ${imported}`);
  console.log(`Skipped: ${skipped}`);
}

main()
  .catch((error) => {
    console.error("Ingestion failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });