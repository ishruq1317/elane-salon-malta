"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Product } from "@/types";
import { useApp } from "@/context/AppContext";
import {
  Star,
  ShoppingBag,
  ShieldCheck,
  Check,
  Sparkles,
  Leaf,
  Plus,
  Minus,
} from "lucide-react";

interface ShopDetailClientProps {
  product: Product;
}

export function ShopDetailClient({ product }: ShopDetailClientProps) {
  const { addToCart } = useApp();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    addToCart({
      id: `cart-prod-${product.id}`,
      type: "PRODUCT",
      title: product.name,
      price: product.price,
      image: product.image,
      quantity,
      productId: product.slug,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="space-y-16 py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-[11px] uppercase tracking-wider text-taupe">
        <Link href="/" className="hover:text-charcoal">Home</Link>
        <span>/</span>
        <Link href="/shop" className="hover:text-charcoal">Shop</Link>
        <span>/</span>
        <span className="text-charcoal font-medium">{product.name}</span>
      </div>

      {/* Main Product Showcase */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Media */}
        <div className="lg:col-span-6 bg-sand/20 border border-sand p-6 flex items-center justify-center">
          <div className="aspect-square w-full max-w-md overflow-hidden bg-ivory shadow-card">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Right Info */}
        <div className="lg:col-span-6 space-y-6">
          <div className="space-y-2">
            <span className="text-xs uppercase tracking-widest text-gold font-bold">
              {product.brand}
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl text-charcoal font-light leading-tight">
              {product.name}
            </h1>
            <div className="flex items-center gap-3 pt-1">
              <div className="flex items-center gap-1 text-gold text-xs">
                <Star className="w-4 h-4 fill-gold" />
                <span className="font-semibold text-charcoal">{product.rating}</span>
                <span className="text-taupe">({product.reviewsCount} reviews)</span>
              </div>
              <span className="text-sand-dark">•</span>
              <span className="text-xs text-taupe font-medium">{product.volume}</span>
              <span className="text-sand-dark">•</span>
              <span className="text-xs text-olive font-semibold">
                {product.inStock ? "In Stock (Sliema Atelier)" : "Out of Stock"}
              </span>
            </div>
          </div>

          <div className="font-serif text-3xl text-charcoal">
            €{product.price}
          </div>

          <p className="text-xs sm:text-sm text-taupe-dark leading-relaxed">
            {product.description}
          </p>

          {/* Quantity and Add to Bag */}
          <div className="pt-4 border-t border-sand/60 space-y-4">
            <div className="flex items-center gap-4">
              <span className="text-xs uppercase tracking-wider text-taupe font-medium">
                Quantity:
              </span>
              <div className="flex items-center border border-sand bg-ivory">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-2 text-charcoal hover:bg-sand/30"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="px-4 text-xs font-semibold text-charcoal">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-2 text-charcoal hover:bg-sand/30"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <button
              onClick={handleAddToCart}
              className={`w-full py-4 text-xs font-semibold uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 ${
                added
                  ? "bg-green-700 text-ivory"
                  : "bg-charcoal text-ivory hover:bg-gold hover:text-charcoal btn-luxury shadow-md"
              }`}
            >
              {added ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Added To Bag</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add To Bag — €{product.price * quantity}</span>
                </>
              )}
            </button>
          </div>

          {/* In-Salon Assurance */}
          <div className="p-4 bg-ivory border border-sand text-xs text-taupe space-y-1">
            <div className="flex items-center gap-1.5 font-semibold text-charcoal">
              <ShieldCheck className="w-4 h-4 text-gold" />
              <span>Certified Atelier Formulation</span>
            </div>
            <p className="text-[11px] leading-relaxed">
              Every bottle is filled under clean European cosmetic protocols, free from parabens, phthalates, and synthetic animal musks.
            </p>
          </div>
        </div>
      </div>

      {/* Ingredients & Ritual Usage Tabs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-sand/60">
        <div className="p-6 bg-ivory border border-sand space-y-3">
          <h3 className="font-serif text-xl text-charcoal flex items-center gap-2">
            <Leaf className="w-4 h-4 text-olive" /> Key Botanical Actives
          </h3>
          <ul className="space-y-2 text-xs text-taupe">
            {product.ingredients.map((ing, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-gold mt-0.5">•</span>
                <span>{ing}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="p-6 bg-ivory border border-sand space-y-3">
          <h3 className="font-serif text-xl text-charcoal flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-gold" /> Application Ritual
          </h3>
          <ul className="space-y-2 text-xs text-taupe">
            {product.usage.map((u, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="font-serif font-bold text-gold text-xs">{i + 1}.</span>
                <span>{u}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
