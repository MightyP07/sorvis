import prisma from "../lib/prisma.js";

const DEFILLAMA_API = "https://api.llama.fi";

type DefiLlamaProtocol = {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  url?: string | null;
  logo?: string | null;
  category?: string | null;
  chains?: string[];
  tvl?: number | null;
  change_7d?: number | null;
};

const CATEGORY_MAP: Record<string, string> = {
  CEX: "Payments",
  DEX: "DeFi",
  Lending: "DeFi",
  "Liquid Staking": "DeFi",
  "Liquid Restaking": "DeFi",
  Restaking: "DeFi",
  Yield: "DeFi",
  Derivatives: "DeFi",
  CDP: "DeFi",
  Bridge: "Infrastructure",
  RWA: "DeFi",
  "Asset Management": "DeFi",
  "Algo-Stables": "DeFi",
  "Stablecoin Issuer": "Payments",
  "Prediction Market": "DeFi",
  "Insurance": "DeFi",
  "NFT Lending": "NFTs",
  "NFT Marketplace": "NFTs",
  "NFTs": "NFTs",
  Gaming: "Gaming",
  "Gaming Lending": "Gaming",
  "NFT Aggregator": "NFTs",
  "NFT Launchpad": "NFTs",
  "Options Vault": "DeFi",
  "Indexes": "DeFi",
  "Cross Chain": "Infrastructure",
  "Infrastructure": "Infrastructure",
  "Payments": "Payments",
  Social: "Social",
  DePIN: "DePIN",
  AI: "AI",
};

const DEFAULT_CATEGORY = "DeFi";

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function getSorvisCategory(defiLlamaCategory?: string | null) {
  if (!defiLlamaCategory) {
    return DEFAULT_CATEGORY;
  }

  return CATEGORY_MAP[defiLlamaCategory] ?? DEFAULT_CATEGORY;
}

export async function fetchProtocols(): Promise<DefiLlamaProtocol[]> {
  const response = await fetch(`${DEFILLAMA_API}/protocols`);

  if (!response.ok) {
    throw new Error(`DeFiLlama request failed: ${response.status}`);
  }

  return response.json() as Promise<DefiLlamaProtocol[]>;
}

export async function syncProtocols() {
  const protocols = await fetchProtocols();

  const systemUser = await prisma.user.upsert({
    where: {
      email: "system@sorvis.app",
    },
    update: {},
    create: {
      email: "system@sorvis.app",
      name: "Sorvis System",
    },
  });

  const categoryNames = [
    "DeFi",
    "AI",
    "Infrastructure",
    "Gaming",
    "NFTs",
    "Social",
    "Payments",
    "DePIN",
  ];

  const categories = new Map<string, string>();

  for (const name of categoryNames) {
    const category = await prisma.category.upsert({
      where: {
        name,
      },
      update: {},
      create: {
        name,
        slug: slugify(name),
      },
    });

    categories.set(name, category.id);
  }

  const ecosystemNames = new Set<string>();

  for (const protocol of protocols) {
    for (const chain of protocol.chains ?? []) {
      if (chain?.trim()) {
        ecosystemNames.add(chain.trim());
      }
    }
  }

  const ecosystems = new Map<string, string>();

  for (const name of ecosystemNames) {
    const ecosystem = await prisma.ecosystem.upsert({
      where: {
        name,
      },
      update: {},
      create: {
        name,
        slug: slugify(name),
      },
    });

    ecosystems.set(name, ecosystem.id);
  }

  let created = 0;
  let updated = 0;

  for (const protocol of protocols) {
    if (!protocol.name || !protocol.slug) {
      continue;
    }

    const categoryName = getSorvisCategory(protocol.category);
    const categoryId = categories.get(categoryName);

    if (!categoryId) {
      continue;
    }

    const slug = protocol.slug || slugify(protocol.name);

    const existing = await prisma.project.findUnique({
      where: {
        slug,
      },
      select: {
        id: true,
      },
    });

    const project = await prisma.project.upsert({
      where: {
        slug,
      },
      update: {
        name: protocol.name,
        description:
          protocol.description?.trim() ||
          `${protocol.name} Web3 project.`,
        website: protocol.url || null,
        logoUrl: protocol.logo || null,
        categoryId,
      },
      create: {
        name: protocol.name,
        slug,
        description:
          protocol.description?.trim() ||
          `${protocol.name} Web3 project.`,
        website: protocol.url || null,
        logoUrl: protocol.logo || null,
        userId: systemUser.id,
        categoryId,
      },
    });

    if (existing) {
      updated++;
    } else {
      created++;
    }

    await prisma.projectEcosystem.deleteMany({
      where: {
        projectId: project.id,
      },
    });

    const projectEcosystems = (protocol.chains ?? [])
      .map((chain) => ecosystems.get(chain))
      .filter((id): id is string => Boolean(id));

    if (projectEcosystems.length > 0) {
      await prisma.projectEcosystem.createMany({
        data: projectEcosystems.map((ecosystemId) => ({
          projectId: project.id,
          ecosystemId,
        })),
        skipDuplicates: true,
      });
    }

    if (
      typeof protocol.tvl === "number" ||
      typeof protocol.change_7d === "number"
    ) {
      await prisma.projectMetric.create({
        data: {
          projectId: project.id,
          tvl:
            typeof protocol.tvl === "number"
              ? protocol.tvl
              : null,
          growth:
            typeof protocol.change_7d === "number"
              ? protocol.change_7d
              : null,
        },
      });
    }
  }

  return {
    totalProtocols: protocols.length,
    created,
    updated,
    categories: categories.size,
    ecosystems: ecosystems.size,
  };
}