"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useApp } from "@/context/AppContext";
import {
  X,
  ShoppingBag,
  Calendar,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";

export function CartDrawer() {
  const { isCartOpen, setIsCartOpen, cart, removeFromCart, updateCartQuantity, clearCart } = useApp();
  const router = useRouter();
  const [promoCode, setPromoCode] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoApplied, setPromoApplied] = useState(false);
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);

  if (!isCartOpen) return null;

  const serviceItems = cart.filter((i) => i.type === "SERVICE");
  const productItems = cart.filter((i) => i.type === "PRODUCT");

  const rawSubtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discountAmount = (rawSubtotal * discountPercent) / 100;
  const finalTotal = Math.max(0, rawSubtotal - discountAmount);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === "ELANE10" || promoCode.trim().toUpperCase() === "MALTA") {
      setDiscountPercent(10);
      setPromoApplied(true);
    } else {
      alert("Invalid code. Try 'ELANE10' for demo 10% privilege.");
    }
  };

  const handleCompleteOrder = () => {
    setCheckoutSuccess(true);
    setTimeout(() => {
      clearCart();
      setCheckoutModalOpen(false);
      setCheckoutSuccess(false);
      setIsCartOpen(false);
      router.push("/account");
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-charcoal/60 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-md w-full bg-[#FAF7F2] shadow-drawer border-l border-sand flex flex-col z-50">
        {/* Header */}
        <div className="px-6 py-5 border-b border-sand/70 flex items-center justify-between bg-ivory">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-gold" />
            <h3 className="font-serif text-xl tracking-wide uppercase text-charcoal">
              Your Bag
            </h3>
            <span className="text-xs bg-sand/60 px-2 py-0.5 rounded-full text-charcoal font-medium">
              {cart.reduce((a, b) => a + b.quantity, 0)}
            </span>
          </div>

          <button
            onClick={() => setIsCartOpen(false)}
            className="p-1 text-taupe hover:text-charcoal transition-colors"
            aria-label="Close cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart Body */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-6">
          {cart.length === 0 ? (
            <div className="text-center py-16 space-y-4">
              <div className="w-16 h-16 rounded-full bg-sand/30 flex items-center justify-center mx-auto text-taupe">
                <ShoppingBag className="w-8 h-8 stroke-[1.5]" />
              </div>
              <div className="space-y-1">
                <h4 className="font-serif text-lg text-charcoal uppercase tracking-wider">
                  Your Cart Is Empty
                </h4>
                <p className="text-xs text-taupe max-w-xs mx-auto">
                  Your next beauty experience is waiting. Explore our bespoke services or botanical retail collection.
                </p>
              </div>
              <div className="pt-2">
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    router.push("/services");
                  }}
                  className="px-6 py-2.5 bg-charcoal text-ivory text-xs font-semibold uppercase tracking-widest hover:bg-charcoal-light transition-colors"
                >
                  Explore Services
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* Scheduled Services Section */}
              {serviceItems.length > 0 && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between border-b border-sand/40 pb-1.5">
                    <span className="text-[11px] uppercase tracking-wider font-bold text-charcoal flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-gold" /> Atelier Services (Requires Scheduling)
                    </span>
                    <span className="text-[10px] text-taupe">Online booking</span>
                  </div>

                  <div className="space-y-3">
                    {serviceItems.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center gap-3 p-3 bg-ivory border border-sand/60"
                      >
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-14 h-14 object-cover shrink-0 border border-sand"
                        />
                        <div className="flex-1 min-w-0">
                          <h5 className="font-serif text-sm text-charcoal font-medium truncate">
                            {item.title}
                          </h5>
                          {item.durationMin && (
                            <span className="text-[10px] text-taupe block">
                              Duration: ~{item.durationMin} mins
                            </span>
                          )}
                          <span className="text-xs font-semibold text-charcoal mt-1 block">
                            €{item.price}
                          </span>
                        </div>

                        <div className="flex flex-col items-end gap-2">
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-taupe hover:text-red-700 transition-colors p-1"
                            title="Remove"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                          <Link
                            href={`/booking?service=${item.serviceId}`}
                            onClick={() => setIsCartOpen(false)}
                            className="text-[10px] text-gold hover:text-gold-dark font-medium underline"
                          >
                            Schedule
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Retail Products Section */}
              {productItems.length > 0 && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between border-b border-sand/40 pb-1.5">
                    <span className="text-[11px] uppercase tracking-wider font-bold text-charcoal flex items-center gap-1.5">
                      <ShoppingBag className="w-3.5 h-3.5 text-gold" /> Boutique Products (Shipped or Atelier Pickup)
                    </span>
                  </div>

                  <div className="space-y-3">
                    {productItems.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center gap-3 p-3 bg-ivory border border-sand/60"
                      >
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-14 h-14 object-cover shrink-0 border border-sand"
                        />
                        <div className="flex-1 min-w-0">
                          <h5 className="font-serif text-sm text-charcoal font-medium truncate">
                            {item.title}
                          </h5>
                          <span className="text-xs font-semibold text-charcoal mt-0.5 block">
                            €{item.price}
                          </span>

                          {/* Quantity selector */}
                          <div className="flex items-center gap-2 mt-2">
                            <button
                              onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                              className="w-5 h-5 rounded border border-sand flex items-center justify-center text-charcoal hover:bg-sand/30"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-xs font-medium text-charcoal">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                              className="w-5 h-5 rounded border border-sand flex items-center justify-center text-charcoal hover:bg-sand/30"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>

                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-taupe hover:text-red-700 transition-colors p-1"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Promo Code Input */}
              <div className="pt-2">
                <form onSubmit={handleApplyPromo} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Privilege Code (try ELANE10)"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="flex-1 bg-ivory border border-sand px-3 py-1.5 text-xs text-charcoal placeholder:text-taupe focus:outline-none focus:border-gold uppercase"
                  />
                  <button
                    type="submit"
                    className="px-3 py-1.5 bg-sand/60 hover:bg-sand text-xs font-medium text-charcoal transition-colors"
                  >
                    Apply
                  </button>
                </form>
                {promoApplied && (
                  <span className="text-[11px] text-green-700 mt-1 block">
                    ✓ 10% Client Privilege Applied
                  </span>
                )}
              </div>
            </>
          )}
        </div>

        {/* Footer Subtotal & Action CTAs */}
        {cart.length > 0 && (
          <div className="p-6 border-t border-sand/80 bg-ivory space-y-4">
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-taupe">
                <span>Subtotal</span>
                <span>€{rawSubtotal.toFixed(2)}</span>
              </div>
              {discountPercent > 0 && (
                <div className="flex justify-between text-green-700 font-medium">
                  <span>Privilege ({discountPercent}%)</span>
                  <span>-€{discountAmount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between text-sm font-semibold text-charcoal border-t border-sand/40 pt-2">
                <span>Estimated Total</span>
                <span className="font-serif text-lg">€{finalTotal.toFixed(2)}</span>
              </div>
            </div>

            {/* Smart Dual CTA distinction */}
            <div className="space-y-2 pt-1">
              {serviceItems.length > 0 && (
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    const firstService = serviceItems[0];
                    router.push(
                      firstService.serviceId
                        ? `/booking?service=${firstService.serviceId}`
                        : "/booking"
                    );
                  }}
                  className="w-full py-3 bg-charcoal text-ivory text-xs font-semibold uppercase tracking-widest hover:bg-charcoal-light transition-colors flex items-center justify-center gap-2"
                >
                  <Calendar className="w-3.5 h-3.5 text-gold" />
                  <span>Proceed to Booking ({serviceItems.length} Service{serviceItems.length > 1 ? "s" : ""})</span>
                </button>
              )}

              {productItems.length > 0 && (
                <button
                  onClick={() => setCheckoutModalOpen(true)}
                  className="w-full py-3 bg-gold hover:bg-gold-light text-charcoal text-xs font-semibold uppercase tracking-widest transition-colors flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Proceed to Checkout ({productItems.length} Product{productItems.length > 1 ? "s" : ""})</span>
                </button>
              )}
            </div>

            <div className="flex items-center justify-center gap-2 text-[10px] text-taupe">
              <ShieldCheck className="w-3 h-3 text-gold" />
              <span>Complimentary Malta courier on orders over €75</span>
            </div>
          </div>
        )}
      </div>

      {/* Demo Checkout Modal for Retail Products */}
      {checkoutModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal/70 backdrop-blur-sm">
          <div className="bg-[#FAF7F2] border border-sand max-w-md w-full p-6 space-y-4 shadow-2xl relative">
            <button
              onClick={() => setCheckoutModalOpen(false)}
              className="absolute top-4 right-4 text-taupe hover:text-charcoal"
            >
              <X className="w-4 h-4" />
            </button>

            {checkoutSuccess ? (
              <div className="text-center py-6 space-y-3">
                <CheckCircle2 className="w-12 h-12 text-green-700 mx-auto" />
                <h4 className="font-serif text-2xl text-charcoal uppercase">Order Confirmed</h4>
                <p className="text-xs text-taupe">
                  Order #ELN-ORD-{Math.floor(1000 + Math.random() * 9000)} has been received! Our Sliema boutique concierge is preparing your package.
                </p>
                <div className="text-[11px] text-gold font-medium">Redirecting to customer account...</div>
              </div>
            ) : (
              <>
                <div className="border-b border-sand/60 pb-3">
                  <span className="text-[10px] uppercase tracking-widest text-gold font-bold">
                    ÉLANE Boutique Checkout (Demo)
                  </span>
                  <h4 className="font-serif text-xl text-charcoal mt-1">Delivery & Payment</h4>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <label className="block text-taupe-dark font-medium mb-1">Delivery Address (Malta)</label>
                    <input
                      type="text"
                      defaultValue="12 Triq Santa Marija, Sliema"
                      className="w-full bg-ivory border border-sand px-3 py-2 text-xs text-charcoal focus:outline-none focus:border-gold"
                    />
                  </div>

                  <div>
                    <label className="block text-taupe-dark font-medium mb-1">Contact Phone</label>
                    <input
                      type="text"
                      defaultValue="+356 7922 4118"
                      className="w-full bg-ivory border border-sand px-3 py-2 text-xs text-charcoal focus:outline-none focus:border-gold"
                    />
                  </div>

                  <div>
                    <label className="block text-taupe-dark font-medium mb-1">Payment Method</label>
                    <div className="p-3 bg-ivory border border-sand space-y-1.5">
                      <div className="flex items-center gap-2 font-medium text-charcoal">
                        <input type="radio" checked readOnly />
                        <span>Demo Card (Simulated •••• 4242)</span>
                      </div>
                      <p className="text-[10px] text-taupe">
                        No actual charges will be made. This is an interactive demo prototype.
                      </p>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-sand/60 flex justify-between font-semibold text-charcoal">
                    <span>Total Due</span>
                    <span>€{finalTotal.toFixed(2)}</span>
                  </div>
                </div>

                <button
                  onClick={handleCompleteOrder}
                  className="w-full py-3 bg-charcoal text-ivory text-xs font-semibold uppercase tracking-widest hover:bg-charcoal-light transition-colors"
                >
                  Confirm & Place Demo Order
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
