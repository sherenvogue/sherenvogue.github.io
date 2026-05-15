import { useEffect } from "react";
import { Link } from "wouter";
import { Trash2, ShoppingBag, ArrowLeft } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/data/products";
import { Button } from "@/components/ui/button";

export default function Cart() {
  const { items, removeItem, updateQuantity, clearCart, totalItems, totalPrice } = useCart();

  useEffect(() => {
    document.title = `Cart (${totalItems}) — SherenVogue`;
  }, [totalItems]);

  if (items.length === 0) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center gap-6 px-4" data-testid="empty-cart">
        <ShoppingBag className="h-16 w-16 text-muted-foreground" strokeWidth={1} />
        <div className="text-center">
          <h1 className="font-serif text-3xl font-light mb-2">Your cart is empty</h1>
          <p className="text-muted-foreground text-sm">
            Discover our curated collection and find something you love.
          </p>
        </div>
        <Link href="/shop" data-testid="link-continue-shopping-empty">
          <Button className="rounded-none tracking-widest uppercase text-xs gap-2">
            <ShoppingBag className="h-4 w-4" />
            Start Shopping
          </Button>
        </Link>
      </main>
    );
  }

  const shipping = totalPrice >= 3000 ? 0 : 120;
  const grandTotal = totalPrice + shipping;

  return (
    <main className="min-h-screen" data-testid="cart-page">
      <div className="bg-muted/40 border-b border-border py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-2">Review</p>
          <h1 className="font-serif text-3xl sm:text-4xl font-light">
            Shopping Cart
            <span className="text-muted-foreground text-2xl ml-3">({totalItems})</span>
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Cart items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => {
              const discount = item.product.originalPrice
                ? Math.round((1 - item.product.price / item.product.originalPrice) * 100)
                : null;

              return (
                <div
                  key={`${item.product.id}-${item.selectedColor}`}
                  className="flex gap-4 p-4 bg-card border border-card-border rounded-sm"
                  data-testid={`cart-item-${item.product.id}`}
                >
                  {/* Product image */}
                  <Link href={`/product/${item.product.slug}`}>
                    <div className="w-24 h-28 bg-muted rounded-sm overflow-hidden shrink-0 cursor-pointer">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        width={96}
                        height={112}
                      />
                    </div>
                  </Link>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] tracking-widest uppercase text-muted-foreground mb-0.5">
                      {item.product.category.replace("-", " ")}
                    </p>
                    <Link href={`/product/${item.product.slug}`}>
                      <h2
                        className="font-medium text-sm hover:text-primary transition-colors cursor-pointer truncate mb-1"
                        data-testid={`cart-item-name-${item.product.id}`}
                      >
                        {item.product.name}
                      </h2>
                    </Link>
                    <p className="text-xs text-muted-foreground mb-3">
                      Color: {item.selectedColor}
                    </p>

                    <div className="flex items-center justify-between flex-wrap gap-3">
                      {/* Quantity */}
                      <div className="flex items-center border border-border rounded-sm">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="px-2.5 py-1 text-sm hover:bg-muted transition-colors"
                          data-testid={`button-decrease-${item.product.id}`}
                          aria-label="Decrease quantity"
                        >
                          −
                        </button>
                        <span
                          className="px-3 text-sm font-medium"
                          data-testid={`text-cart-quantity-${item.product.id}`}
                        >
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="px-2.5 py-1 text-sm hover:bg-muted transition-colors"
                          data-testid={`button-increase-${item.product.id}`}
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>

                      {/* Price */}
                      <div className="text-right">
                        <p
                          className="font-semibold text-sm"
                          data-testid={`text-cart-price-${item.product.id}`}
                        >
                          {formatPrice(item.product.price * item.quantity)}
                        </p>
                        {discount && (
                          <p className="text-[10px] text-destructive">-{discount}% off</p>
                        )}
                      </div>

                      {/* Remove */}
                      <button
                        onClick={() => removeItem(item.product.id)}
                        className="text-muted-foreground hover:text-destructive transition-colors"
                        data-testid={`button-remove-${item.product.id}`}
                        aria-label={`Remove ${item.product.name} from cart`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Actions */}
            <div className="flex items-center justify-between pt-2">
              <Link href="/shop" data-testid="link-continue-shopping">
                <Button variant="ghost" className="text-xs tracking-widest uppercase gap-2">
                  <ArrowLeft className="h-3.5 w-3.5" />
                  Continue Shopping
                </Button>
              </Link>
              <button
                onClick={clearCart}
                className="text-xs text-muted-foreground hover:text-destructive transition-colors tracking-widest uppercase"
                data-testid="button-clear-cart"
              >
                Clear Cart
              </button>
            </div>
          </div>

          {/* Order summary */}
          <div className="lg:col-span-1">
            <div className="bg-card border border-card-border rounded-sm p-6 sticky top-24">
              <h2 className="font-serif text-xl font-light mb-5">Order Summary</h2>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal ({totalItems} items)</span>
                  <span data-testid="text-subtotal">{formatPrice(totalPrice)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span data-testid="text-shipping">
                    {shipping === 0 ? (
                      <span className="text-primary font-medium">Free</span>
                    ) : (
                      formatPrice(shipping)
                    )}
                  </span>
                </div>
                {totalPrice < 3000 && (
                  <p className="text-[11px] text-muted-foreground">
                    Add {formatPrice(3000 - totalPrice)} more for free shipping
                  </p>
                )}
                <div className="border-t border-border pt-3 flex justify-between font-semibold">
                  <span>Total</span>
                  <span data-testid="text-total">{formatPrice(grandTotal)}</span>
                </div>
              </div>

              <Button
                className="w-full mt-6 rounded-none tracking-widest uppercase text-xs h-12"
                data-testid="button-checkout"
                onClick={() => alert("Checkout coming soon! Thank you for shopping at SherenVogue.")}
              >
                Proceed to Checkout
              </Button>

              <p className="text-center text-[10px] text-muted-foreground mt-3">
                Secure payment · SSL encrypted
              </p>

              {/* Payment icons */}
              <div className="flex justify-center gap-2 mt-4">
                {["Visa", "bKash", "Nagad", "COD"].map((method) => (
                  <span
                    key={method}
                    className="text-[9px] border border-border rounded px-1.5 py-0.5 text-muted-foreground"
                  >
                    {method}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
