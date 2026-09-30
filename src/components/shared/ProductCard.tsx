"use client";

import React from "react";
import Link from "next/link";
import { Product } from "@/types";
import { useApp } from "@/context/AppContext";
import { Star, ShoppingBag, Check } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useApp();
  const [added, setAdded] = React.useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart({
      id: `cart-prod-${product.id}`,
      type: "PRODUCT",
      title: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
      productId: product.slug,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="group bg-ivory border border-sand hover:border-gold/60 transition-all duration-300 shadow-sm flex flex-col justify-between overflow-hidden">
      <Link href={`/shop/${product.slug}`} className="block relative aspect-square overflow-hidden bg-sand/20">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover luxury-image-hover"
          loading="lazy"
        />

        {product.inStock && (
          <div className="absolute top-3 left-3 bg-charcoal/80 text-ivory text-[9px] uppercase tracking-widest px-2 py-0.5 font-medium">
            In Stock
          </div>
        )}

        <div className="absolute bottom-3 right-3 bg-ivory/90 backdrop-blur-sm text-charcoal px-2 py-0.5 text-[10px] flex items-center gap-1 font-medium">
          <Star className="w-3 h-3 fill-gold text-gold" />
          <span>{product.rating}</span>
        </div>
      </Link>

      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          <span className="text-[10px] uppercase tracking-wider text-taupe font-medium">
            {product.brand}
          </span>
          <h4 className="font-serif text-base text-charcoal group-hover:text-gold transition-colors font-medium mt-0.5 line-clamp-1">
            <Link href={`/shop/${product.slug}`}>{product.name}</Link>
          </h4>
          <p className="text-[11px] text-taupe line-clamp-2 mt-1">
            {product.shortDesc}
          </p>
        </div>

        <div className="pt-2 border-t border-sand/40 flex items-center justify-between">
          <div>
            <span className="text-sm font-semibold text-charcoal">€{product.price}</span>
            <span className="text-[10px] text-taupe block">{product.volume}</span>
          </div>

          <button
            onClick={handleAddToCart}
            className={`px-3 py-1.5 text-xs uppercase tracking-wider font-semibold transition-colors flex items-center gap-1.5 ${
              added
                ? "bg-green-700 text-ivory"
                : "bg-charcoal text-ivory hover:bg-gold hover:text-charcoal"
            }`}
          >
            {added ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Added</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Add</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
