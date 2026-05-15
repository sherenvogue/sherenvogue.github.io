import { useState } from "react";
import { Link, useLocation } from "wouter";
import { ShoppingBag, Menu, X, Search } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "All Products" },
  { href: "/shop?category=ladies-bags", label: "Ladies Bags" },
  { href: "/shop?category=watches", label: "Watches" },
  { href: "/shop?category=belts", label: "Belts" },
  { href: "/shop?category=wallets", label: "Wallets" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { totalItems } = useCart();
  const [, navigate] = useLocation();
  const [location] = useLocation();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery("");
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
      {/* Top announcement bar */}
      <div className="bg-primary text-primary-foreground text-center py-1.5 text-xs tracking-widest uppercase font-medium">
        Free Delivery on Orders Over ৳3,000 &nbsp;|&nbsp; New Collection Arrived
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" data-testid="link-logo">
            <span className="font-serif text-2xl font-bold tracking-widest text-foreground cursor-pointer select-none">
              SHEREN<span className="text-primary">VOGUE</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-7" aria-label="Main navigation">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                data-testid={`link-nav-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
              >
                <span
                  className={`text-xs tracking-widest uppercase font-medium cursor-pointer transition-colors hover:text-primary ${
                    location === link.href ? "text-primary" : "text-foreground/70"
                  }`}
                >
                  {link.label}
                </span>
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* Search toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSearchOpen(!searchOpen)}
              data-testid="button-search-toggle"
              aria-label="Search"
            >
              <Search className="h-5 w-5" />
            </Button>

            {/* Cart */}
            <Link href="/cart" data-testid="link-cart">
              <Button variant="ghost" size="icon" className="relative" aria-label="Shopping cart">
                <ShoppingBag className="h-5 w-5" />
                {totalItems > 0 && (
                  <span
                    data-testid="badge-cart-count"
                    className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center"
                  >
                    {totalItems}
                  </span>
                )}
              </Button>
            </Link>

            {/* Mobile menu */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setMenuOpen(!menuOpen)}
              data-testid="button-menu-toggle"
              aria-label="Menu"
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Search bar */}
        {searchOpen && (
          <div className="border-t border-border py-3">
            <form onSubmit={handleSearch} className="flex gap-2">
              <input
                type="search"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
                className="flex-1 bg-muted rounded-md px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-primary"
                data-testid="input-search"
              />
              <Button type="submit" size="sm" data-testid="button-search-submit">
                Search
              </Button>
            </form>
          </div>
        )}
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <nav
          className="lg:hidden border-t border-border bg-background px-4 pb-4"
          aria-label="Mobile navigation"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              data-testid={`link-mobile-nav-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
            >
              <span
                className="block py-3 text-sm tracking-widest uppercase font-medium border-b border-border last:border-0 cursor-pointer hover:text-primary transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </span>
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
