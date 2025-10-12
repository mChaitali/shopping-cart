import React from "react";
import { useCart } from "../../context/CartContext";
import Button from "./../../ui/Button.jsx"
import { ShoppingCart } from "lucide-react";

const Header = ({ onCartClick }) => {
    const { state } = useCart();
    const itemCount = Object.values(state.items).reduce(
        (acc, item) => acc + item.quantity,
        0
    );
    return (
        <header className="bg-[#185574] border-b border-gray-200 sticky top-0 z-40">
            <div className="mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0 ">
                        <h1 data-testid="home-title" className="flex flex-row text-white items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-store-icon lucide-store"><path d="M15 21v-5a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v5" /><path d="M17.774 10.31a1.12 1.12 0 0 0-1.549 0 2.5 2.5 0 0 1-3.451 0 1.12 1.12 0 0 0-1.548 0 2.5 2.5 0 0 1-3.452 0 1.12 1.12 0 0 0-1.549 0 2.5 2.5 0 0 1-3.77-3.248l2.889-4.184A2 2 0 0 1 7 2h10a2 2 0 0 1 1.653.873l2.895 4.192a2.5 2.5 0 0 1-3.774 3.244" /><path d="M4 10.95V19a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8.05" /></svg>
                            <div className="flex flex-col text-sm font-bold ml-2">
                                <span>Clothing</span>
                                <span>Store</span>
                            </div>
                        </h1>
                    </div>

                    <div className="flex items-center space-x-4">
                        {/* Cart Button */}
                        <Button data-testid="cart-button"
                            variant="primary"
                            size="sm"
                            onClick={onCartClick}
                            className="relative"
                            aria-label="cart"
                            data-drawer-target="drawer-right-example" data-drawer-show="drawer-right-example" data-drawer-placement="right" aria-controls="drawer-right-example"
                        >
                            <ShoppingCart className="w-7 h-7" />
                            {itemCount > 0 && (
                                <span data-testid="cart-badge"
                                    className="absolute -top-2 -right-2 text-[#185574] text-xs font-bold bg-white rounded-full w-5 h-5 flex items-center justify-center"
                                >
                                    {itemCount}
                                </span>
                            )}
                        </Button>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header;