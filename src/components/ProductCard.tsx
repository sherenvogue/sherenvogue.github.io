import { useState } from "react";
import { Link } from "wouter";
import { ShoppingBag, Star, Heart } from "lucide-react";
import { type Product, formatPrice } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  const [wished, setWished] = useState(false);
  const [added, setAdded] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, product.colors[0]);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setWished((w) => !w);
  };

  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : null;

  return (
    <article
      className="group relative bg-card rounded-sm overflow-hidden border border-card-border hover:shadow-lg transition-all duration-300"
      data-testid={`card-product-${product.id}`}
    >
      {/* Image container */}
      <Link href={`/product/${product.slug}`} data-testid={`link-product-${product.id}`}>
        <div className="relative overflow-hidden aspect-[4/5] bg-muted">
          <img
            src={product.image}
            alt={`${product.name} — ${product.category.replace("-", " ")}`}
            loading="lazy"
            width={400}
            height={500}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            data-testid={`img-product-${product.id}`}
          />
          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors duration-300" />

          {/* Badge */}
          {product.badge && (
            <div className="absolute top-3 left-3">
              <Badge
                className={`text-[10px] tracking-widest uppercase px-2 py-0.5 font-semibold ${
                  product.badge === "Sale"
                    ? "bg-destructive text-destructive-foreground"
                    : product.badge === "New"
                    ? "bg-primary text-primary-foreground"
                    : product.badge === "Premium"
                    ? "bg-accent text-accent-foreground"
                    : "bg-foreground text-background"
                }`}
                data-testid={`badge-product-${product.id}`}
              >
                {product.badge}
              </Badge>
            </div>
          )}

          {/* Wishlist */}
          <button
            onClick={handleWishlist}
            className="absolute top-3 right-3 bg-background/90 rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-background"
            aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
            data-testid={`button-wishlist-${product.id}`}
          >
            <Heart
              className={`h-4 w-4 transition-colors ${wished ? "fill-destructive text-destructive" : "text-foreground"}`}
            />
          </button>

          {/* Quick add to cart */}
          <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <Button
              onClick={handleAddToCart}
              className="w-full rounded-none h-10 text-xs tracking-widest uppercase font-semibold"
              data-testid={`button-add-cart-${product.id}`}
            >
              <ShoppingBag className="h-3.5 w-3.5 mr-2" />
              {added ? "Added!" : "Add to Cart"}
            </Button>
          </div>
        </div>
      </Link>

      {/* Info */}
      <div className="p-3.5">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <p className="text-[10px] tracking-widest uppercase text-muted-foreground mb-1">
              {product.category.replace("-", " ")} &middot; {product.gender}
            </p>
            <Link href={`/product/${product.slug}`}>
              <h3
                className="text-sm font-medium text-foreground truncate cursor-pointer hover:text-primary transition-colors"
                data-testid={`text-product-name-${product.id}`}
              >
                {product.name}
              </h3>
            </Link>
          </div>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-1.5 mt-1.5">
          <div className="flex items-center gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`h-3 w-3 ${
                  i < Math.floor(product.rating)
                    ? "fill-accent text-accent"
                    : "text-muted-foreground"
                }`}
              />
            ))}
          </div>
          <span className="text-[10px] text-muted-foreground" data-testid={`text-rating-${product.id}`}>
            ({product.reviews})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2 mt-2">
          <span
            className="text-sm font-semibold text-foreground"
            data-testid={`text-price-${product.id}`}
          >
            {formatPrice(product.price)}
          </span>
          {product.originalPrice && (
            <>
              <span className="text-xs line-through text-muted-foreground">
                {formatPrice(product.originalPrice)}
              </span>
              <span className="text-[10px] text-destructive font-semibold">
                -{discount}%
              </span>
            </>
          )}
        </div>

        {/* Colors */}
        <div className="flex gap-1.5 mt-2">
          {product.colors.slice(0, 4).map((color) => (
            <span
              key={color}
              className="text-[9px] text-muted-foreground border border-border px-1.5 py-0.5 rounded-sm"
            >
              {color}
            </span>
          ))}
          {product.colors.length > 4 && (
            <span className="text-[9px] text-muted-foreground">+{product.colors.length - 4}</span>
          )}
        </div>
      </div>
    </article>
  );
}
