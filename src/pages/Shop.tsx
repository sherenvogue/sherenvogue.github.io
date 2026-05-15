import { useEffect, useMemo, useState } from "react";
import { useSearch } from "wouter";
import { SlidersHorizontal, ChevronDown } from "lucide-react";
import { products, categories, formatPrice, type Category } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type SortOption = "default" | "price-asc" | "price-desc" | "rating" | "name";

const sortLabels: Record<SortOption, string> = {
  default: "Featured",
  "price-asc": "Price: Low to High",
  "price-desc": "Price: High to Low",
  rating: "Top Rated",
  name: "Name A–Z",
};

export default function Shop() {
  const searchStr = useSearch();
  const params = new URLSearchParams(searchStr);
  const categoryParam = params.get("category") as Category | null;
  const genderParam = params.get("gender");
  const queryParam = params.get("q");
  const badgeParam = params.get("badge");

  const [activeCategory, setActiveCategory] = useState<Category | "all">(categoryParam || "all");
  const [activeGender, setActiveGender] = useState<string>(genderParam || "all");
  const [sort, setSort] = useState<SortOption>("default");
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    setActiveCategory(categoryParam || "all");
  }, [categoryParam]);

  useEffect(() => {
    const title = activeCategory === "all"
      ? "All Products — SherenVogue"
      : `${categories.find((c) => c.id === activeCategory)?.label} — SherenVogue`;
    document.title = title;
  }, [activeCategory]);

  const filtered = useMemo(() => {
    let list = [...products];

    if (queryParam) {
      const q = queryParam.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }

    if (badgeParam) {
      list = list.filter((p) => p.badge === badgeParam);
    }

    if (activeCategory !== "all") {
      list = list.filter((p) => p.category === activeCategory);
    }

    if (activeGender !== "all") {
      list = list.filter((p) => p.gender === activeGender || p.gender === "unisex");
    }

    switch (sort) {
      case "price-asc":
        list.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        list.sort((a, b) => b.rating - a.rating);
        break;
      case "name":
        list.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }

    return list;
  }, [activeCategory, activeGender, sort, queryParam, badgeParam]);

  return (
    <main className="min-h-screen">
      {/* Page header */}
      <div className="bg-muted/40 border-b border-border py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-2">
            {queryParam ? `Search results for "${queryParam}"` : "Browse"}
          </p>
          <h1 className="font-serif text-3xl sm:text-4xl font-light">
            {activeCategory === "all"
              ? "All Products"
              : categories.find((c) => c.id === activeCategory)?.label}
          </h1>
          <p className="text-sm text-muted-foreground mt-2">{filtered.length} products</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters bar */}
        <div className="flex flex-wrap items-center gap-3 mb-8">
          {/* Category filter */}
          <div className="flex items-center gap-2 flex-wrap">
            <Button
              variant={activeCategory === "all" ? "default" : "outline"}
              size="sm"
              className="rounded-none text-xs tracking-widest uppercase h-8"
              onClick={() => setActiveCategory("all")}
              data-testid="filter-category-all"
            >
              All
            </Button>
            {categories.map((cat) => (
              <Button
                key={cat.id}
                variant={activeCategory === cat.id ? "default" : "outline"}
                size="sm"
                className="rounded-none text-xs tracking-widest uppercase h-8"
                onClick={() => setActiveCategory(cat.id as Category)}
                data-testid={`filter-category-${cat.id}`}
              >
                {cat.label}
              </Button>
            ))}
          </div>

          <div className="ml-auto flex items-center gap-2">
            {/* Gender filter */}
            <Button
              variant="ghost"
              size="sm"
              className="text-xs tracking-widest uppercase gap-1.5"
              onClick={() => setShowFilters(!showFilters)}
              data-testid="button-toggle-filters"
            >
              <SlidersHorizontal className="h-3.5 w-3.5" />
              Filters
            </Button>

            {/* Sort */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-none text-xs tracking-widest uppercase gap-1.5"
                  data-testid="dropdown-sort"
                >
                  {sortLabels[sort]} <ChevronDown className="h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {Object.entries(sortLabels).map(([key, label]) => (
                  <DropdownMenuItem
                    key={key}
                    className="text-xs"
                    onClick={() => setSort(key as SortOption)}
                    data-testid={`sort-option-${key}`}
                  >
                    {label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Extended filters */}
        {showFilters && (
          <div className="bg-muted/30 border border-border rounded-sm p-4 mb-8 flex flex-wrap gap-6">
            <div>
              <p className="text-[10px] tracking-widest uppercase text-muted-foreground mb-2 font-semibold">
                Gender
              </p>
              <div className="flex gap-2">
                {["all", "women", "men", "unisex"].map((g) => (
                  <Button
                    key={g}
                    variant={activeGender === g ? "default" : "outline"}
                    size="sm"
                    className="rounded-none text-xs tracking-widest uppercase h-7 capitalize"
                    onClick={() => setActiveGender(g)}
                    data-testid={`filter-gender-${g}`}
                  >
                    {g === "all" ? "All" : g}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Product grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4" data-testid="product-grid">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24" data-testid="empty-state-no-products">
            <p className="font-serif text-4xl text-muted-foreground mb-3">No products found</p>
            <p className="text-sm text-muted-foreground mb-6">
              Try adjusting your filters or search query.
            </p>
            <Button
              variant="outline"
              className="rounded-none tracking-widest uppercase text-xs"
              onClick={() => {
                setActiveCategory("all");
                setActiveGender("all");
              }}
              data-testid="button-clear-filters"
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </main>
  );
}
