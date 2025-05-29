import { createContext, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import sampleProducts from "../../assets/assets.jsx"

// Dummy products to simulate foodItems
// const sampleProducts = [
//   { id: 1, name: "Tomato", price: 2.5, image: "/img/tomato.jpg" },
//   { id: 2, name: "Yam", price: 4, image: "/img/yam.jpg" },
//   { id: 3, name: "Rice", price: 5.25, image: "/img/rice.jpg" },
// ];

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});

  const addToCart = (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1,
    }));
    toast.success("Product added to cart!");
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => {
      const currentQty = prev[itemId] || 0;
      if (currentQty <= 1) {
        const updated = { ...prev };
        delete updated[itemId];
        return updated;
      }
      return {
        ...prev,
        [itemId]: currentQty - 1,
      };
    });
    toast.info("Product removed from cart.");
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const itemId in cartItems) {
      const item = sampleProducts.find((p) => p.id === parseInt(itemId));
      if (item) {
        totalAmount += item.price * cartItems[itemId];
      }
    }
    return totalAmount;
  };

  const contextValue = {
    cartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    sampleProducts,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
