export const initialState = {
  items: {},
};

export function cartReducer(state = initialState, action) {
  switch (action.type) {
    case "ADD_ITEM": {
      const product = action.payload;

      const existing = state.items[product.id];
      const updatedItem = existing
        ? { ...existing, quantity: existing.quantity + 1 }
        : { product, quantity: 1 };
      return { ...state, items: { ...state.items, [product.id]: updatedItem } };
    }
    case "INCREASE_QTY": {
      const id = action.payload;
      const item = state.items[id];
      if (!item) return state;

      return {
        ...state,
        items: {
          ...state.items,
          [id]: { ...item, quantity: item.quantity + 1 },
        },
      };
    }
    case "DECREASE_QTY": {
      const id = action.payload;
      const item = state.items[id];

      if (!item) return state;

      if (item.quantity <= 1) {
        const { [id]: _, ...rest } = state.items;
        return { ...state, items: rest };
      }

      return {
        ...state,
        items: {
          ...state.items,
          [id]: { ...item, quantity: item.quantity - 1 },
        },
      };
    }
    case "REMOVE_QTY": {
      const { [action.payload]: _, ...rest } = state.items;
      return { ...state, items: rest };
    }
    default:
      return state;
  }
}
