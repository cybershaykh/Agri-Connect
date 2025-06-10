import { createContext, useEffect, useState } from "react";
import sampleProducts from "../../assets/assets";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState({});
  const url = "http://localhost:3000";
  const [token, setToken] = useState("");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Initialize auth state from localStorage
  useEffect(() => {
    const initializeAuth = async () => {
      const storedToken = localStorage.getItem("token");
      const storedUser = localStorage.getItem("user");

      if (storedToken) {
        setToken(storedToken);
        
        if (storedUser) {
          try {
            setUser(JSON.parse(storedUser));
          } catch (e) {
            console.error("Failed to parse user data", e);
          }
        } else {
          await fetchUserData(storedToken);
        }
      }
      setLoading(false);
    };

    initializeAuth();
  }, []);

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

  // Fetch user data when token changes
  const fetchUserData = async (token) => {
    try {
      const response = await axios.get(`${url}/api/user/me`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUser(response.data.user);
      localStorage.setItem("user", JSON.stringify(response.data.user));
    } catch (error) {
      console.error("Failed to fetch user data", error);
      logout();
    }
  };

  const login = async (token, userData) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userData));
    setToken(token);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken("");
    setUser(null);
  };

  const updateUser = (updatedUser) => {
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
  };

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
    url,
    token,
    setToken,
    user,
    setUser,
    login,
    logout,
    updateUser,
    loading
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;