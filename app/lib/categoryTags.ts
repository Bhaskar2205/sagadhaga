type CategoryNode = {
  slug: string;
  label: string;
  query: string;
  children?: CategoryNode[];
};

type FilterOption = {
  slug: string;
  label: string;
  query: string;
  depth: number;
};

const CATEGORY_TREE: CategoryNode[] = [
  {
    slug: "bedding",
    label: "Bedding",
    query:
      "tag:bedding OR tag:bedsheets OR tag:king-size OR tag:queen-size OR tag:bed-covers OR tag:bedding-sets OR tag:cushions",
    children: [
      {
        slug: "bedsheets",
        label: "Bedsheets",
        query: "tag:bedsheets OR tag:king-size OR tag:queen-size",
        children: [
          { slug: "king-size", label: "King size", query: "tag:king-size" },
          { slug: "queen-size", label: "Queen size", query: "tag:queen-size" },
        ],
      },
      { slug: "bed-covers", label: "Bed covers", query: "tag:bed-covers" },
      { slug: "bedding-sets", label: "Bedding sets", query: "tag:bedding-sets" },
      { slug: "cushions", label: "Cushions", query: "tag:cushions" },
    ],
  },
  { slug: "bathrobe", label: "Bathrobe", query: "tag:bathrobe OR tag:bathrobes" },
  { slug: "tote-bags", label: "Tote bags", query: "tag:tote-bags" },
  {
    slug: "utilities-pouches",
    label: "Utilities pouches",
    query: "tag:utilities-pouches OR tag:pouches",
  },
  {
    slug: "kids",
    label: "Kids",
    query: "tag:kids OR tag:kids-bedsheet OR tag:kids-bag",
    children: [
      { slug: "kids-bedsheet", label: "Kids bedsheet", query: "tag:kids-bedsheet" },
      { slug: "kids-bag", label: "Kids bag", query: "tag:kids-bag" },
    ],
  },
  {
    slug: "jewels",
    label: "Jewels",
    query: "tag:jewels OR tag:neckless-sets OR tag:earings",
    children: [
      { slug: "neckless-sets", label: "Neckless sets", query: "tag:neckless-sets" },
      { slug: "earings", label: "Earings", query: "tag:earings" },
    ],
  },
];

// Keep existing homepage cards working without changing their constant.
const LEGACY_CATEGORY_ALIASES: CategoryNode[] = [
  {
    slug: "clothing",
    label: "Clothing",
    query: "tag:clothing OR tag:bathrobe OR tag:bathrobes OR tag:towels",
  },
  {
    slug: "accessories",
    label: "Accessories",
    query: "tag:accessories OR tag:tote-bags OR tag:utilities-pouches OR tag:pouches",
  },
];

const CATEGORY_ROOTS = [...CATEGORY_TREE, ...LEGACY_CATEGORY_ALIASES];
const ROOT_SLUGS = CATEGORY_ROOTS.map((n) => n.slug) as [string, ...string[]];
export const CATEGORY_SLUGS = ROOT_SLUGS;
export type CategorySlug = (typeof CATEGORY_SLUGS)[number];

function findRootBySlug(slug: string): CategoryNode | null {
  return CATEGORY_ROOTS.find((n) => n.slug === slug) ?? null;
}

function findInTree(nodes: CategoryNode[], slug: string): CategoryNode | null {
  for (const node of nodes) {
    if (node.slug === slug) return node;
    if (node.children?.length) {
      const found = findInTree(node.children, slug);
      if (found) return found;
    }
  }
  return null;
}

function flattenDescendants(nodes: CategoryNode[], depth: number): FilterOption[] {
  const out: FilterOption[] = [];
  for (const n of nodes) {
    out.push({ slug: n.slug, label: n.label, query: n.query, depth });
    if (n.children?.length) out.push(...flattenDescendants(n.children, depth + 1));
  }
  return out;
}

function findPath(nodes: CategoryNode[], slug: string, path: CategoryNode[] = []): CategoryNode[] | null {
  for (const node of nodes) {
    const nextPath = [...path, node];
    if (node.slug === slug) return nextPath;
    if (node.children?.length) {
      const found = findPath(node.children, slug, nextPath);
      if (found) return found;
    }
  }
  return null;
}

export function isCategorySlug(s: string): s is CategorySlug {
  return (CATEGORY_SLUGS as readonly string[]).includes(s);
}

export function getStorefrontQueryForSlug(slug: string): string | null {
  const root = findRootBySlug(slug);
  return root?.query ?? null;
}

export function getCategoryLabel(slug: string): string | null {
  const root = findRootBySlug(slug);
  return root?.label ?? null;
}

export function getCategoryFilterOptions(slug: string): FilterOption[] {
  const root = findRootBySlug(slug);
  if (!root?.children?.length) return [];
  return flattenDescendants(root.children, 1);
}

export function getVisibleCategoryFilterOptions(
  slug: string,
  activeFilterSlug?: string
): FilterOption[] {
  const root = findRootBySlug(slug);
  if (!root?.children?.length) return [];

  const levelOne = root.children.map((n) => ({
    slug: n.slug,
    label: n.label,
    query: n.query,
    depth: 1,
  }));

  if (!activeFilterSlug) return levelOne;

  const path = findPath(root.children, activeFilterSlug);
  if (!path || path.length === 0) return levelOne;

  const selected = path[path.length - 1];
  const selectedPathOptions: FilterOption[] = path.map((node, idx) => ({
    slug: node.slug,
    label: node.label,
    query: node.query,
    depth: idx + 1,
  }));

  const children = selected.children?.map((n) => ({
    slug: n.slug,
    label: n.label,
    query: n.query,
    depth: path.length + 1,
  })) ?? [];

  // Focused mode: keep selected path visible (parent + selected) and show children.
  return [...selectedPathOptions, ...children];
}

export function getStorefrontQueryForFilter(
  categorySlug: string,
  filterSlug: string
): string | null {
  const root = findRootBySlug(categorySlug);
  if (!root) return null;
  const allowed = root.children ? findInTree(root.children, filterSlug) : null;
  return allowed?.query ?? null;
}

export const CATEGORY_NAV = CATEGORY_TREE;
