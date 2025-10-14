import { useState } from "react";
import Header from "./../components/Header/Header"
import ProductListingPage from "./../pages/ProductListingPage"
import Cart from "./../components/Cart/Cart"
import { CartProvider } from "./../context/CartContext"

export default function Home() {
    const [cartOpen, setCartOpen] = useState(false)

    return (
        <CartProvider>
            <Header onCartClick={() => setCartOpen(true)} />
            <main className="p-4 overflow-auto" style={{height: "calc(100vh - 64px)"}} data-testid="product-list">
                <ProductListingPage />
            </main>
            <Cart isOpen={cartOpen} onClose={() => setCartOpen(false)} />
        </CartProvider>
    )
}
