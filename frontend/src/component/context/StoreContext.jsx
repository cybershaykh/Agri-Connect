import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import foodItems from "../../assets/assets";
import sampleProducts from "../../assets/assets";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});

  const addToCart = (productId) => {
    if (!cartItems[productId]) {
      setCartItems((prev) => ({
        ...prev,
        [productId]: 1,
      }));
    } else {
      setCartItems((prev) => ({
        ...prev,
        [productId]: prev[productId] + 1,
      }));
    }
     toast.success("Item added to cart!");
  };
  const removeFromCart = (productId) => {
    setCartItems((prev) => ({ ...prev, [productId]: prev[productId] - 1 }));
    toast.info("Item removed from cart.");
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const product in cartItems) {
      if (cartItems[product] > 0) {
        let itemInfo = sampleProducts.find((product) => product._id === item);
        totalAmount += itemInfo.price * cartItems[product];
      }
    }
    return totalAmount;
  };
  // useEffect(() =>{
  //     console.log(cartItems);
  // }, [cartItems])

  const contextValue = {
    cartItems,
    setCartItems,
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
