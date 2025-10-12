import { useMemo } from "react";
import { useCart } from "../context/CartContext";

export function useCartSubtotal() {
  const { state } = useCart();

  const { items, cartCount, subtotal } = useMemo(() => {
    const items = Object.values(state.items);
    const cartCount = items.length;
    const subtotal = items.reduce(
      (acc, item) => acc + item.product.price * item.quantity,
      0
    );
    return { items, cartCount, subtotal };
  }, [state.items]);

  return { items, cartCount, subtotal };
}
