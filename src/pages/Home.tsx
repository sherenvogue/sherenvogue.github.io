import { useEffect, useRef } from "react";
import { Link } from "wouter";
import { ArrowRight, ShieldCheck, Truck, RefreshCw, Headphones, Star } from "lucide-react";
import { products, getFeaturedProducts, formatPrice } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";

/* ─── Marquee strip data ───────────────────────────────────────────── */
const marqueeItems = [
  "Ladies Bags", "Luxury Watches", "Premium Belts", "Designer Wallets",
  "Free Delivery Over ৳3,000", "New 2025 Collection", "Ladies Bags", "Luxury Watches",
  "Premium Belts", "Designer Wallets", "Free Delivery Over ৳3,000", "New 2025 Collection",
];

/* ─── Stat counter ──────────────────────────────────────────────────── */
const stats = [
  { value: "40+", label: "Curated Products" },
  { value: "2K+", label: "Happy Customers" },
  { value: "4.9★", label: "Average Rating" },
  { value: "100%", label: "Authentic Quality" },
];

/* ─── Categories editorial ──────────────────────────────────────────── */
const editorialCats = [
  {
    id: "ladies-bags",
    label: "Ladies Bags",
    sub: "10 Styles",
    img: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=900&q=85",
    alt: "Premium ladies bags collection — SherenVogue",
    count: "10",
  },
  {
    id: "watches",
    label: "Watches",
    sub: "Men & Women",
    img: "https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=900&q=85",
    alt: "Luxury watches for men and women — SherenVogue",
    count: "10",
  },
  {
    id: "belts",
    label: "Belts",
    sub: "Leather & More",
    img: "https://images.unsplash.com/photo-1603487742131-4160ec999306?w=900&q=85",
    alt: "Premium leather belts — SherenVogue",
    count: "10",
  },
  {
    id: "wallets",
    label: "Wallets",
    sub: "Slim & Classic",
    img: "https://images.unsplash.com/photo-1627123424574-724758594785?w=900&q=85",
    alt: "Slim leather wallets — SherenVogue",
    count: "10",
  },
];

export default function Home() {
  useEffect(() => {
    document.title = "SherenVogue — Premium Ladies Bags, Watches, Belts & Wallets";
  }, []);

  const featured = getFeaturedProducts();
  const newArrivals = products.filter((p) => p.badge === "New").slice(0, 4);

  return (
    <main className="overflow-x-hidden">

      {/* ═══════════════════════════════════════════════════════════
          HERO — Split layout
      ═══════════════════════════════════════════════════════════ */}
      <section
        className="relative min-h-screen flex overflow-hidden bg-foreground"
        aria-label="Hero — SherenVogue premium fashion"
      >
        {/* Left text panel */}
        <div className="relative z-10 flex flex-col justify-center px-8 sm:px-14 lg:px-20 py-24 w-full lg:w-[52%]">
          {/* Decorative vertical line */}
          <div className="absolute left-0 top-0 bottom-0 w-px bg-white/10 hidden lg:block" />

          <p
            className="text-accent text-[10px] tracking-[0.5em] uppercase font-semibold mb-6"
            style={{ animationDelay: "0ms" }}
          >
            — New Collection 2025
          </p>

          <h1 className="font-serif font-light leading-[1.05] mb-8 text-background">
            <span className="block text-5xl sm:text-6xl lg:text-7xl xl:text-8xl">Wear</span>
            <span className="block text-5xl sm:text-6xl lg:text-7xl xl:text-8xl italic text-accent">
              Your Grace
            </span>
            <span className="block text-5xl sm:text-6xl lg:text-7xl xl:text-8xl">Daily</span>
          </h1>

          <p className="text-background/55 text-sm sm:text-base leading-relaxed max-w-sm mb-10 font-light">
            Premium ladies bags, luxury timepieces, hand-finished belts and wallets —
            curated for those who move through the world with intention.
          </p>

          <div className="flex flex-wrap gap-4 mb-16">
            <Link href="/shop" data-testid="link-hero-shop">
              <button className="group inline-flex items-center gap-3 bg-accent text-accent-foreground px-8 py-4 text-[11px] tracking-[0.3em] uppercase font-semibold hover:bg-accent/90 transition-all duration-300">
                Explore Collection
                <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
            <Link href="/shop?category=ladies-bags" data-testid="link-hero-bags">
              <button className="inline-flex items-center gap-3 border border-white/25 text-background/80 px-8 py-4 text-[11px] tracking-[0.3em] uppercase font-semibold hover:border-white/60 hover:text-background transition-all duration-300">
                Ladies Bags
              </button>
            </Link>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-4 gap-4 border-t border-white/10 pt-8">
            {stats.map((s) => (
              <div key={s.label}>
                <p className="font-serif text-xl sm:text-2xl text-background font-light mb-0.5">{s.value}</p>
                <p className="text-[9px] tracking-widest uppercase text-background/40">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right image mosaic */}
        <div className="hidden lg:flex lg:w-[48%] relative">
          {/* Main image */}
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1200&q=85"
              alt="SherenVogue luxury fashion model"
              className="w-full h-full object-cover"
              width={800}
              height={1000}
            />
            <div className="absolute inset-0 bg-gradient-to-l from-transparent via-foreground/5 to-foreground/40" />
          </div>

          {/* Floating product card — top right */}
          <div className="absolute top-8 right-8 bg-background/95 backdrop-blur-sm p-4 shadow-2xl w-52">
            <img
              src="https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=300&q=80"
              alt="Velvet Rose Tote"
              className="w-full h-28 object-cover mb-3"
            />
            <p className="text-[9px] tracking-widest uppercase text-muted-foreground mb-0.5">Ladies Bag</p>
            <p className="text-sm font-medium text-foreground mb-1">Velvet Rose Tote</p>
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-primary">৳4,200</span>
              <div className="flex gap-0.5">
                {[1,2,3,4,5].map(i => <Star key={i} className="h-2.5 w-2.5 fill-accent text-accent" />)}
              </div>
            </div>
          </div>

          {/* Floating badge — bottom left */}
          <div className="absolute bottom-10 left-0 -translate-x-1/2 bg-primary text-primary-foreground p-5 shadow-2xl text-center w-36">
            <p className="font-serif text-3xl font-light">40</p>
            <p className="text-[9px] tracking-widest uppercase mt-1 opacity-80">Products</p>
          </div>
        </div>

        {/* Mobile image */}
        <div className="absolute inset-0 lg:hidden">
          <img
            src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&q=80"
            alt="SherenVogue fashion"
            className="w-full h-full object-cover opacity-20"
          />
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          MARQUEE STRIP
      ═══════════════════════════════════════════════════════════ */}
      <div
        className="bg-accent py-3 overflow-hidden"
        aria-hidden="true"
      >
        <div className="flex animate-[marquee_30s_linear_infinite] whitespace-nowrap">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span key={i} className="text-accent-foreground text-[10px] tracking-[0.3em] uppercase font-semibold mx-8">
              {item} <span className="mx-4 opacity-40">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════
          EDITORIAL CATEGORIES — Asymmetric grid
      ═══════════════════════════════════════════════════════════ */}
      <section className="py-20 px-4 sm:px-6 lg:px-8" aria-labelledby="collections-heading">
        <div className="max-w-7xl mx-auto">
          {/* Section header */}
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-[10px] tracking-[0.4em] uppercase text-muted-foreground mb-2">Shop by</p>
              <h2 id="collections-heading" className="font-serif text-4xl sm:text-5xl font-light">
                Our Collections
              </h2>
            </div>
            <div className="hidden sm:block h-px flex-1 bg-border mx-8 mb-3" />
            <Link href="/shop" data-testid="link-all-collections">
              <span className="text-[10px] tracking-widest uppercase text-muted-foreground hover:text-primary transition-colors cursor-pointer whitespace-nowrap flex items-center gap-2">
                All Products <ArrowRight className="h-3 w-3" />
              </span>
            </Link>
          </div>

          {/* Asymmetric 2-column + 2-stacked layout */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-3">
            {/* Large card — Ladies Bags */}
            <Link href="/shop?category=ladies-bags" className="lg:col-span-3" data-testid="link-cat-ladies-bags">
              <div className="group relative overflow-hidden bg-muted cursor-pointer" style={{ height: "520px" }}>
                <img
                  src={editorialCats[0].img}
                  alt={editorialCats[0].alt}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  width={900}
                  height={520}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/10 to-transparent" />

                {/* Corner accent */}
                <div className="absolute top-5 right-5 w-12 h-12 border border-accent/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <ArrowRight className="h-4 w-4 text-accent rotate-[-45deg]" />
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <p className="text-[9px] tracking-[0.35em] uppercase text-background/60 mb-2">{editorialCats[0].count} Styles</p>
                  <h3 className="font-serif text-3xl sm:text-4xl text-background font-light mb-3">{editorialCats[0].label}</h3>
                  <span className="inline-flex items-center gap-2 text-[10px] tracking-widest uppercase text-accent font-semibold">
                    Shop Now <ArrowRight className="h-3 w-3" />
                  </span>
                </div>
              </div>
            </Link>

            {/* Right column — 3 stacked cards */}
            <div className="lg:col-span-2 grid grid-rows-3 gap-3" style={{ height: "520px" }}>
              {editorialCats.slice(1).map((cat) => (
                <Link key={cat.id} href={`/shop?category=${cat.id}`} data-testid={`link-cat-${cat.id}`}>
                  <div className="group relative overflow-hidden bg-muted cursor-pointer h-full">
                    <img
                      src={cat.img}
                      alt={cat.alt}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      width={400}
                      height={165}
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-foreground/60 to-transparent" />
                    <div className="absolute inset-0 flex items-center px-6">
                      <div>
                        <p className="text-[8px] tracking-[0.3em] uppercase text-background/55 mb-1">{cat.sub}</p>
                        <h3 className="font-serif text-xl text-background font-light">{cat.label}</h3>
                      </div>
                    </div>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <ArrowRight className="h-4 w-4 text-accent" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          BRAND STORY STRIP
      ═══════════════════════════════════════════════════════════ */}
      <section className="bg-foreground text-background py-20" aria-label="About SherenVogue">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-[10px] tracking-[0.4em] uppercase text-accent mb-4">Our Story</p>
              <h2 className="font-serif text-4xl sm:text-5xl font-light leading-tight mb-6">
                Crafted for the<br />
                <span className="italic text-accent">Discerning Eye</span>
              </h2>
              <p className="text-background/55 leading-relaxed mb-4 text-sm">
                SherenVogue was born from a belief that accessories are not mere additions — they are statements. Every piece in our collection is chosen with obsessive care for quality, craftsmanship, and timeless appeal.
              </p>
              <p className="text-background/55 leading-relaxed mb-8 text-sm">
                From buttery-soft leather totes to precision-engineered chronographs, we bring the world's finest everyday luxury to your doorstep.
              </p>
              <Link href="/shop" data-testid="link-story-cta">
                <button className="group inline-flex items-center gap-3 border border-white/25 text-background px-7 py-3.5 text-[10px] tracking-[0.3em] uppercase font-semibold hover:border-accent hover:text-accent transition-all duration-300">
                  Discover the Collection
                  <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=85"
                alt="SherenVogue — premium craftsmanship and quality accessories"
                className="w-full object-cover"
                style={{ height: "420px" }}
                loading="lazy"
                width={700}
                height={420}
              />
              {/* Decorative frame */}
              <div className="absolute -bottom-4 -right-4 w-full h-full border border-accent/30 -z-10" />
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          BESTSELLERS — Elegant product grid
      ═══════════════════════════════════════════════════════════ */}
      <section className="py-20" aria-labelledby="bestsellers-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-14">
            <p className="text-[10px] tracking-[0.4em] uppercase text-muted-foreground mb-3">Handpicked</p>
            <h2 id="bestsellers-heading" className="font-serif text-4xl sm:text-5xl font-light mb-4">
              Our Bestsellers
            </h2>
            <div className="flex items-center justify-center gap-3">
              <div className="h-px w-16 bg-border" />
              <span className="text-accent text-sm">✦</span>
              <div className="h-px w-16 bg-border" />
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-10">
            {featured.slice(0, 8).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center">
            <Link href="/shop" data-testid="link-view-all-bestsellers">
              <button className="group inline-flex items-center gap-3 border border-border text-foreground/70 px-10 py-3.5 text-[10px] tracking-[0.3em] uppercase font-semibold hover:border-primary hover:text-primary transition-all duration-300">
                View All Products
                <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          FULL-BLEED WATCH BANNER
      ═══════════════════════════════════════════════════════════ */}
      <section className="relative h-[70vh] overflow-hidden" aria-label="Luxury watches promotion">
        <img
          src="https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?w=1800&q=85"
          alt="Luxury watch — SherenVogue timepieces collection"
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
          width={1800}
          height={800}
        />
        {/* Dual gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 via-foreground/40 to-foreground/10" />

        <div className="relative h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="max-w-lg">
              <p className="text-accent text-[10px] tracking-[0.5em] uppercase font-semibold mb-5">
                Timepieces
              </p>
              <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light text-background leading-tight mb-5">
                Time Tells<br />
                <span className="italic">a Story</span>
              </h2>
              <p className="text-background/55 text-sm mb-8 leading-relaxed">
                10 meticulously selected watches — from slim dress pieces to bold chronographs. Your wrist deserves better.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/shop?category=watches" data-testid="link-banner-watches">
                  <button className="group inline-flex items-center gap-3 bg-accent text-accent-foreground px-8 py-3.5 text-[10px] tracking-[0.3em] uppercase font-semibold hover:bg-accent/90 transition-all">
                    Shop Watches <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                  </button>
                </Link>
                <Link href="/shop?category=watches&gender=men" data-testid="link-banner-men-watches">
                  <button className="inline-flex items-center gap-3 border border-white/30 text-background px-8 py-3.5 text-[10px] tracking-[0.3em] uppercase font-semibold hover:border-white/70 transition-all">
                    Men's Watches
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          NEW ARRIVALS
      ═══════════════════════════════════════════════════════════ */}
      {newArrivals.length > 0 && (
        <section className="py-20 bg-muted/30" aria-labelledby="new-arrivals-heading">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-12">
              <div>
                <p className="text-[10px] tracking-[0.4em] uppercase text-muted-foreground mb-2">Just In</p>
                <h2 id="new-arrivals-heading" className="font-serif text-4xl font-light">
                  New Arrivals
                </h2>
              </div>
              <Link href="/shop?badge=New" data-testid="link-view-all-new">
                <span className="hidden sm:flex items-center gap-2 text-[10px] tracking-widest uppercase text-muted-foreground hover:text-primary transition-colors cursor-pointer">
                  View All <ArrowRight className="h-3 w-3" />
                </span>
              </Link>
            </div>

            {/* Featured new arrival — large card + 3 small */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
              {/* Big card */}
              {newArrivals[0] && (
                <Link href={`/product/${newArrivals[0].slug}`} data-testid={`link-new-large-${newArrivals[0].id}`}>
                  <div className="group relative overflow-hidden bg-muted cursor-pointer" style={{ height: "460px" }}>
                    <img
                      src={newArrivals[0].image}
                      alt={newArrivals[0].name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      width={700}
                      height={460}
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-transparent to-transparent" />
                    <div className="absolute top-4 left-4 bg-primary text-primary-foreground text-[9px] tracking-widest uppercase px-3 py-1 font-semibold">
                      New
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-7">
                      <p className="text-[9px] tracking-widest uppercase text-background/60 mb-1">
                        {newArrivals[0].category.replace("-", " ")}
                      </p>
                      <h3 className="font-serif text-2xl text-background font-light mb-2">
                        {newArrivals[0].name}
                      </h3>
                      <div className="flex items-center justify-between">
                        <span className="text-background font-semibold">{formatPrice(newArrivals[0].price)}</span>
                        <span className="text-[10px] tracking-widest uppercase text-accent flex items-center gap-1.5 group-hover:gap-2.5 transition-all">
                          Shop Now <ArrowRight className="h-3 w-3" />
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              )}

              {/* 3 small new arrivals */}
              <div className="grid grid-rows-3 gap-4" style={{ height: "460px" }}>
                {newArrivals.slice(1, 4).map((product) => (
                  <Link key={product.id} href={`/product/${product.slug}`} data-testid={`link-new-small-${product.id}`}>
                    <div className="group flex h-full bg-card border border-card-border overflow-hidden cursor-pointer hover:border-primary/30 transition-colors">
                      <div className="w-1/3 overflow-hidden">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                          width={200}
                          height={150}
                        />
                      </div>
                      <div className="flex-1 p-4 flex flex-col justify-center">
                        <p className="text-[9px] tracking-widest uppercase text-muted-foreground mb-1">
                          {product.category.replace("-", " ")}
                        </p>
                        <h3 className="font-medium text-sm text-foreground mb-1 group-hover:text-primary transition-colors">
                          {product.name}
                        </h3>
                        <p className="text-sm font-semibold text-foreground">{formatPrice(product.price)}</p>
                      </div>
                      <div className="flex items-center pr-4 opacity-0 group-hover:opacity-100 transition-opacity">
                        <ArrowRight className="h-4 w-4 text-primary" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════════════════════
          WHY SHERENVOGUE — Luxury features bar
      ═══════════════════════════════════════════════════════════ */}
      <section className="border-y border-border py-14" aria-labelledby="features-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 id="features-heading" className="sr-only">Why choose SherenVogue</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-y lg:divide-y-0 divide-x-0 lg:divide-x divide-border">
            {[
              { icon: Truck, title: "Free Delivery", desc: "On all orders over ৳3,000 across Bangladesh" },
              { icon: RefreshCw, title: "Easy Returns", desc: "7-day no-questions-asked return policy" },
              { icon: ShieldCheck, title: "Secure Payment", desc: "bKash, Nagad, Visa, COD — always encrypted" },
              { icon: Headphones, title: "24/7 Support", desc: "Dedicated style advisors at your service" },
            ].map(({ icon: Icon, title, desc }, i) => (
              <div key={title} className="flex flex-col items-center text-center px-6 py-8 gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/8 flex items-center justify-center">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm tracking-wide text-foreground mb-1.5">{title}</h3>
                  <p className="text-muted-foreground text-xs leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          TESTIMONIALS — Premium cards
      ═══════════════════════════════════════════════════════════ */}
      <section className="py-20" aria-labelledby="testimonials-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-[10px] tracking-[0.4em] uppercase text-muted-foreground mb-3">Real Reviews</p>
            <h2 id="testimonials-heading" className="font-serif text-4xl sm:text-5xl font-light">
              Customer Stories
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              {
                name: "Tasnim Rahman",
                role: "Fashion Blogger",
                text: "The Velvet Rose Tote is absolutely breathtaking. The quality far exceeded my expectations — I get compliments every single day. SherenVogue is my go-to now.",
                product: "Velvet Rose Tote",
                rating: 5,
                avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&q=80",
              },
              {
                name: "Arif Hossain",
                role: "Entrepreneur",
                text: "Got the Chronos Elite watch as a gift for myself. The weight, the finish, the movement — everything is perfect. Genuinely feels like a watch worth twice the price.",
                product: "Chronos Elite Watch",
                rating: 5,
                avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80",
              },
              {
                name: "Sumaiya Khan",
                role: "Interior Designer",
                text: "Fast delivery, gorgeous packaging, and the quilted wallet is even more luxurious in person. I've already recommended SherenVogue to all my friends and colleagues.",
                product: "Quilted Chain Wallet",
                rating: 5,
                avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80",
              },
            ].map((t, i) => (
              <div
                key={i}
                className="bg-card border border-card-border p-7 relative overflow-hidden group hover:border-primary/30 transition-colors duration-300"
              >
                {/* Large quote mark */}
                <span className="absolute -top-2 -left-1 font-serif text-8xl text-primary/8 leading-none select-none pointer-events-none">
                  "
                </span>

                {/* Stars */}
                <div className="flex gap-1 mb-4 relative">
                  {Array.from({ length: t.rating }).map((_, s) => (
                    <Star key={s} className="h-3.5 w-3.5 fill-accent text-accent" />
                  ))}
                </div>

                <p className="text-sm text-muted-foreground leading-relaxed mb-6 relative italic">
                  "{t.text}"
                </p>

                <div className="flex items-center gap-3 pt-4 border-t border-border">
                  <img
                    src={t.avatar}
                    alt={`${t.name} — verified SherenVogue customer`}
                    className="w-10 h-10 rounded-full object-cover"
                    loading="lazy"
                    width={40}
                    height={40}
                  />
                  <div>
                    <p className="text-xs font-semibold tracking-wide text-foreground">{t.name}</p>
                    <p className="text-[10px] text-muted-foreground tracking-wide">{t.role} &middot; Bought: {t.product}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          FINAL CTA STRIP
      ═══════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden py-24" aria-label="Final call to action">
        <img
          src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1800&q=80"
          alt="SherenVogue premium fashion accessories"
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
          width={1800}
          height={400}
        />
        <div className="absolute inset-0 bg-foreground/75" />
        <div className="relative text-center text-background px-4">
          <p className="text-[10px] tracking-[0.5em] uppercase text-accent mb-4 font-semibold">
            Start Your Journey
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light mb-5 leading-tight">
            Elevate Every<br />
            <span className="italic text-accent">Moment</span>
          </h2>
          <p className="text-background/55 max-w-md mx-auto text-sm mb-9 leading-relaxed">
            40 premium products. Free delivery. Easy returns. Your signature style awaits.
          </p>
          <Link href="/shop" data-testid="link-final-cta">
            <button className="group inline-flex items-center gap-3 bg-accent text-accent-foreground px-10 py-4 text-[11px] tracking-[0.3em] uppercase font-semibold hover:bg-accent/90 transition-all duration-300">
              Shop the Full Collection
              <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
            </button>
          </Link>
        </div>
      </section>

    </main>
  );
}
