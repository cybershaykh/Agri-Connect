import { createContext, useEffect, useState } from "react";
import sampleProducts from "../../assets/assets";

export const StoreContext = createContext(null);

const StoreContextProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState({});

  // Load cart from localStorage on first render
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);

  // Save cart to localStorage on changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (id) => {
    const product = sampleProducts.find((item) => item.id === id);
    if (!product) return;

    setCartItems((prev) => {
      const existingItem = prev[id];
      const updatedCart = {
        ...prev,
        [id]: {
          ...product,
          quantity: existingItem ? existingItem.quantity + 1 : 1,
        },
      };
      return updatedCart;
    });
  };

  const removeFromCart = (id) => {
    setCartItems((prev) => {
      const existingItem = prev[id];
      if (!existingItem) return prev;

      if (existingItem.quantity > 1) {
        return {
          ...prev,
          [id]: {
            ...existingItem,
            quantity: existingItem.quantity - 1,
          },
        };
      } else {
        const { [id]: _, ...rest } = prev;
        return rest;
      }
    });
  };

  const getTotalCartAmount = () => {
    return Object.values(cartItems).reduce((acc, item) => {
      return acc + item.price * item.quantity;
    }, 0);
  };

  const contextValue = {
    sampleProducts,
    cartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
