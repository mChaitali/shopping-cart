import { useReducer, createContext, useContext, useEffect } from "react";
import { cartReducer, initialState } from "./CartReducer";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(cartReducer, initialState, (initial) => {
        const storedCart = localStorage.getItem("cart");
        return storedCart ? JSON.parse(storedCart) : initial;
    });

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(state));
    }, [state]);

    return (
        <CartContext.Provider value={{ state, dispatch }}>
            {children}
        </CartContext.Provider>
    )
}

export function useCart() {
    const context = useContext(CartContext)
    if (!context) throw new Error("useCart must be used inside CartProvider");
    return context;
}
