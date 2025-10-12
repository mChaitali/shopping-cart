import React from "react";
import Button from "../../ui/Button";
import CartItem from "./CartItem";
import { X } from "lucide-react";
import { useCartSubtotal } from "../../hooks/useCartSubtotal";
import { formatNumberUtils } from "../../utils";

const Cart = ({ isOpen, onClose }) => {
    const { items, cartCount, subtotal } = useCartSubtotal();

    return (
        <div role="dialog" aria-label="shopping-cart"
            className={`fixed inset-0 z-40 transition ${isOpen ? "visible" : "invisible"
                }`}
        >
            {/* Overlay */}
            <div data-testid="overlay"
                className={`absolute inset-0 bg-black/50 ${isOpen ? "opacity-100" : "opacity-0"
                    } transition`}
                onClick={onClose}
            />

            {/* Cart Drawer */}
            <div
                className="absolute bg-white shadow-lg flex flex-col
          w-full sm:w-[400px] h-2/3 sm:h-full bottom-0 sm:top-0 sm:right-0 rounded-t-2xl sm:rounded-none">
                <header className="flex justify-between items-center p-4 border-b">
                    <h2 className="text-lg font-semibold">Your Cart
                        {cartCount > 0 ? <span> ({cartCount})</span> : ""}
                    </h2>
                    <Button variant="textButton" aria-label="close" onClick={onClose}
                        data-drawer-hide="drawer-right-example" aria-controls="drawer-right-example">
                        <X className="w-6 h-6 text-gray-500 hover:text-gray-700 curser-pointer" />
                    </Button>
                </header>

                {/* Cart Items */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4" data-testid="cart-product-list">
                    {cartCount === 0 ? (
                        <p className="text-gray-500">Your cart is empty</p>
                    ) : (
                        items.map(({ product, quantity }) => (
                            <CartItem key={product.id} product={product} quantity={quantity} />
                        ))
                    )}
                </div>

                {/* Footer */}
                <footer className="border-t p-4 flex flex-col justify-between items-center">
                    <div className="w-full flex justify-between" data-testid="product-subtotal">
                        <span className="font-semibold">Subtotal:</span>
                        <span className="font-bold items-end">${formatNumberUtils(subtotal)}</span>
                    </div>
                    <Button
                        className="w-full py-2 text-white mt-3"
                        variant="primary">
                        Proceed to Checkout
                    </Button>
                    <Button
                        variant="textButton"
                        onClick={onClose}
                        className="w-full py-2 mt-3"
                    >
                        Continue Shopping
                    </Button>
                </footer>
            </div>
        </div>
    );
};

export default Cart;
