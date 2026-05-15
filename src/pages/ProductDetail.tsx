import { useEffect, useState } from "react";
import { useParams, Link } from "wouter";
import { ShoppingBag, Star, ChevronRight, Check, ArrowLeft, Heart } from "lucide-react";
import { getProductBySlug, products, formatPrice } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/ProductCard";

export default function ProductDetail() {
  const { slug } = useParams<{ slug: string }>();
  const product = getProductBySlug(slug);
  const { addItem } = useCart();
  const [selectedColor, setSelectedColor] = useState(product?.colors[0] || "");
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [activeImage, setActiveImage] = useState(0);
  const [wished, setWished] = useState(false);

  useEffect(() => {
    if (product) {
      document.title = `${product.name} — SherenVogue`;
      setSelectedColor(product.colors[0]);
      setActiveImage(0);
    } else {
      document.title = "Product Not Found — SherenVogue";
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [slug, product]);

  if (!product) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="font-serif text-4xl text-muted-foreground">Product not found</p>
        <Link href="/shop">
          <Button variant="outline" className="rounded-none tracking-widest uppercase text-xs">
            Back to Shop
          </Button>
        </Link>
      </main>
    );
  }

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : null;

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(product, selectedColor);
    }
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <main className="min-h-screen">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <ol className="flex items-center gap-1.5 text-xs text-muted-foreground" itemScope itemType="https://schema.org/BreadcrumbList">
          <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
            <Link href="/" data-testid="breadcrumb-home">
              <span className="hover:text-primary cursor-pointer" itemProp="name">Home</span>
            </Link>
            <meta itemProp="position" content="1" />
          </li>
          <ChevronRight className="h-3 w-3" />
          <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
            <Link href={`/shop?category=${product.category}`} data-testid="breadcrumb-category">
              <span className="hover:text-primary cursor-pointer capitalize" itemProp="name">
                {product.category.replace("-", " ")}
              </span>
            </Link>
            <meta itemProp="position" content="2" />
          </li>
          <ChevronRight className="h-3 w-3" />
          <li className="text-foreground font-medium truncate max-w-[180px]" itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
            <span itemProp="name">{product.name}</span>
            <meta itemProp="position" content="3" />
          </li>
        </ol>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* ── IMAGES ── */}
          <div className="space-y-3">
            <div
              className="aspect-[4/5] bg-muted rounded-sm overflow-hidden"
              data-testid="product-main-image"
            >
              <img
                src={product.images[activeImage] || product.image}
                alt={`${product.name} — ${product.category.replace("-", " ")}`}
                className="w-full h-full object-cover"
                width={600}
                height={750}
              />
            </div>
            {product.images.length > 1 && (
              <div className="flex gap-2">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`w-16 h-20 bg-muted rounded-sm overflow-hidden border-2 transition-colors ${
                      activeImage === i ? "border-primary" : "border-transparent"
                    }`}
                    data-testid={`thumbnail-${i}`}
                    aria-label={`View image ${i + 1}`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ── DETAILS ── */}
          <div className="lg:pt-4">
            <p className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-2">
              {product.category.replace("-", " ")} &middot; {product.gender}
            </p>
            <h1
              className="font-serif text-3xl sm:text-4xl font-light mb-3"
              data-testid="text-product-title"
            >
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-5">
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < Math.floor(product.rating)
                        ? "fill-accent text-accent"
                        : "text-muted-foreground"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground" data-testid="text-product-rating">
                {product.rating} ({product.reviews} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-6">
              <span className="font-serif text-3xl font-medium" data-testid="text-product-price">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <>
                  <span className="text-lg line-through text-muted-foreground">
                    {formatPrice(product.originalPrice)}
                  </span>
                  <span className="text-sm text-destructive font-semibold bg-destructive/10 px-2 py-0.5 rounded-sm">
                    Save {discount}%
                  </span>
                </>
              )}
            </div>

            {/* Description */}
            <p className="text-muted-foreground text-sm leading-relaxed mb-6" data-testid="text-product-description">
              {product.description}
            </p>

            {/* Color selector */}
            <div className="mb-6">
              <p className="text-xs tracking-widest uppercase font-semibold mb-3">
                Color: <span className="text-muted-foreground font-normal">{selectedColor}</span>
              </p>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`text-xs px-3 py-1.5 border rounded-sm transition-all ${
                      selectedColor === color
                        ? "border-primary bg-primary/5 font-semibold text-primary"
                        : "border-border text-muted-foreground hover:border-foreground"
                    }`}
                    data-testid={`button-color-${color.toLowerCase().replace(/\s+/g, "-")}`}
                  >
                    {selectedColor === color && <Check className="inline h-3 w-3 mr-1" />}
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="flex items-center gap-3 mb-6">
              <p className="text-xs tracking-widest uppercase font-semibold">Quantity:</p>
              <div className="flex items-center border border-border rounded-sm">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-3 py-1.5 text-sm hover:bg-muted transition-colors"
                  data-testid="button-quantity-decrease"
                  aria-label="Decrease quantity"
                >
                  −
                </button>
                <span className="px-4 text-sm font-medium" data-testid="text-quantity">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="px-3 py-1.5 text-sm hover:bg-muted transition-colors"
                  data-testid="button-quantity-increase"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
            </div>

            {/* CTA buttons */}
            <div className="flex gap-3 mb-8">
              <Button
                onClick={handleAddToCart}
                className="flex-1 rounded-none tracking-widest uppercase text-xs h-12 gap-2"
                disabled={!product.inStock}
                data-testid="button-add-to-cart"
              >
                {added ? (
                  <>
                    <Check className="h-4 w-4" /> Added to Cart
                  </>
                ) : (
                  <>
                    <ShoppingBag className="h-4 w-4" />
                    {product.inStock ? "Add to Cart" : "Out of Stock"}
                  </>
                )}
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="rounded-none h-12 w-12"
                onClick={() => setWished(!wished)}
                data-testid="button-wishlist"
                aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
              >
                <Heart
                  className={`h-5 w-5 transition-colors ${wished ? "fill-destructive text-destructive" : ""}`}
                />
              </Button>
            </div>

            {/* Product details */}
            <div className="border-t border-border pt-6">
              <h2 className="text-xs tracking-widest uppercase font-semibold mb-3">Product Details</h2>
              <ul className="space-y-2">
                {product.details.map((detail, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="text-primary mt-0.5">•</span>
                    {detail}
                  </li>
                ))}
              </ul>
            </div>

            {/* Trust signals */}
            <div className="mt-6 p-4 bg-muted/40 rounded-sm flex flex-wrap gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Check className="h-3.5 w-3.5 text-primary" /> Free delivery over ৳3,000
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="h-3.5 w-3.5 text-primary" /> 7-day returns
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="h-3.5 w-3.5 text-primary" /> Secure checkout
              </span>
            </div>
          </div>
        </div>

        {/* ── RELATED PRODUCTS ── */}
        {relatedProducts.length > 0 && (
          <section className="mt-20" aria-labelledby="related-heading">
            <div className="flex items-end justify-between mb-8">
              <div>
                <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-2">You may also like</p>
                <h2 id="related-heading" className="font-serif text-3xl font-light">Related Products</h2>
              </div>
              <Link href={`/shop?category=${product.category}`}>
                <Button variant="ghost" size="sm" className="text-xs tracking-widest uppercase gap-1.5">
                  View All <ArrowLeft className="h-3.5 w-3.5 rotate-180" />
                </Button>
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
