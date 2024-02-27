import { useContext, useState, createContext } from "react";
import { Cart, Product } from "../../services/shopping/types";
import { CartContextModel } from "../../services/context/types";

const CartContext = createContext<CartContextModel>({
  cart: { items: [], totalPrice: 0, totalItems: 0 },
  setCart: () => {},
});

// eslint-disable-next-line react-refresh/only-export-components
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a Provider");
  }
  return context;
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cart, setCart] = useState<Cart>({
    items: [],
    totalPrice: 0,
    totalItems: 0,
  });

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// to handle the item add and remove from the cart and update the cart in the database
export function useShoppingCart(): {
  cart: Cart;
  addItem: (item: Product) => void;
  removeItem: (item: Product) => void;
} {
  const { cart, setCart } = useCart();

  async function updateDatabaseCart(item: Product, action: "add" | "remove") {
    const quantity = action === "add" ? 1 : -1;
    await fetch("/cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ productId: String(item.id), quantity }),
    });
  }

  const addItem = (item: Product) => {
    const newItems = [...cart.items, item];
    const newTotalPrice = cart.totalPrice + item.price;
    const newTotalItems = cart.totalItems + 1;
    setCart({
      ...cart,
      items: newItems,
      totalPrice: newTotalPrice,
      totalItems: newTotalItems,
    });
    updateDatabaseCart(item, "add");
  };

  const removeItem = (item: Product) => {
    const itemIndex = cart.items.findIndex((i) => i.id === item.id);
    if (itemIndex === -1) {
      return;
    }

    const newItems = [...cart.items];
    newItems.splice(itemIndex, 1);

    const newTotalPrice = cart.totalPrice - item.price;
    const newTotalItems = cart.totalItems - 1;

    setCart({
      ...cart,
      items: newItems,
      totalPrice: newTotalPrice,
      totalItems: newTotalItems,
    });
    updateDatabaseCart(item, "remove");
  };

  return { cart, addItem, removeItem };
}
