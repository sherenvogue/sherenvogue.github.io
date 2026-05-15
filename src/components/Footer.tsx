import { Link } from "wouter";
import { Instagram, Facebook, Twitter, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-foreground text-background mt-20" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <h2 className="font-serif text-2xl font-bold tracking-widest mb-4">
              SHEREN<span className="text-accent">VOGUE</span>
            </h2>
            <p className="text-background/60 text-sm leading-relaxed mb-5">
              Premium fashion accessories crafted for the modern woman and man. Elegance meets everyday.
            </p>
            <div className="flex gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-background/60 hover:text-accent transition-colors"
                data-testid="link-instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="text-background/60 hover:text-accent transition-colors"
                data-testid="link-facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="text-background/60 hover:text-accent transition-colors"
                data-testid="link-twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xs tracking-widest uppercase font-semibold mb-4 text-background/80">
              Shop
            </h3>
            <ul className="space-y-2.5">
              {[
                { href: "/shop?category=ladies-bags", label: "Ladies Bags" },
                { href: "/shop?category=watches", label: "Watches" },
                { href: "/shop?category=belts", label: "Belts" },
                { href: "/shop?category=wallets", label: "Wallets" },
                { href: "/shop", label: "All Products" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>
                    <span className="text-sm text-background/60 hover:text-accent transition-colors cursor-pointer">
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help */}
          <div>
            <h3 className="text-xs tracking-widest uppercase font-semibold mb-4 text-background/80">
              Help
            </h3>
            <ul className="space-y-2.5">
              {[
                "Shipping Policy",
                "Return & Exchange",
                "Size Guide",
                "FAQs",
                "Track Order",
              ].map((item) => (
                <li key={item}>
                  <span className="text-sm text-background/60 hover:text-accent transition-colors cursor-pointer">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xs tracking-widest uppercase font-semibold mb-4 text-background/80">
              Contact
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5 text-sm text-background/60">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-accent" />
                Dhaka, Bangladesh
              </li>
              <li className="flex items-center gap-2.5 text-sm text-background/60">
                <Phone className="h-4 w-4 shrink-0 text-accent" />
                +880 1700-000000
              </li>
              <li className="flex items-center gap-2.5 text-sm text-background/60">
                <Mail className="h-4 w-4 shrink-0 text-accent" />
                hello@sherenvogue.com
              </li>
            </ul>

            {/* Newsletter */}
            <div className="mt-6">
              <p className="text-xs tracking-widest uppercase font-semibold text-background/80 mb-2">
                Newsletter
              </p>
              <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 bg-white/10 text-background placeholder:text-background/40 text-sm px-3 py-2 rounded-sm outline-none focus:ring-1 focus:ring-accent"
                  data-testid="input-newsletter-email"
                />
                <button
                  type="submit"
                  className="bg-accent text-accent-foreground text-xs px-3 py-2 rounded-sm font-medium hover:opacity-90 transition-opacity"
                  data-testid="button-newsletter-subscribe"
                >
                  Join
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-background/40">
          <p>&copy; {new Date().getFullYear()} SherenVogue. All rights reserved.</p>
          <p>Designed with passion for fashion lovers.</p>
        </div>
      </div>
    </footer>
  );
}
