import { createContext, useEffect, useState } from "react";
import sampleProducts from "/src/assets/assets";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const StoreContext = createContext(null);

const StoreContextProvider = ({ children }) => {
  const router = useEffect(() => {
  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${url}/api/product/getall`);
      setProducts(response.data.products); // adjust key if your API response is different
    } catch (err) {
      console.error("Failed to fetch products", err);
      toast.error("Could not load products");
    }
  };

  fetchProducts();
}, []);useNavigate
  const [cartItems, setCartItems] = useState({});
  const navigate = useNavigate();
  const url = "http://localhost:3000";
  const [token, setToken] = useState("");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);



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
    const storedCart = localStorage.getItem("cartItems");
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);

  // Save cart to localStorage on changes
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  // Fetch user data when token changes
  const fetchUserData = async (token) => {
    try {
      const response = await axios.get(`${url}/api/user/me`, {
        headers: { Authorization: `Bearer ${token}` },
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
    localStorage.removeItem("cart");
    localStorage.removeItem("cartItems");
    setToken("");
    setUser(null);
  };

  const updateUser = (updatedUser) => {
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
  };

  const addToCart = (id) => {
    const product = products.find((item) => item.id === id);
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
      toast.success("Added to cart");
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
        toast.success("🗑️ Removed from cart");
        return rest;
      }
    });
  };

  const getCartCount = () => {
    let totalCount = 0;
    for (const items in cartItems) {
      if (cartItems[items] > 0) {
        totalCount += cartItems[items];
      }
    }
    return totalCount;
  };

  const getCartAmount = () => {
    let totalAmount = 0;
    for (const items in cartItems) {
      let itemInfo = products.find((product) => product._id === items);
      if (cartItems[items] > 0) {
        totalAmount += itemInfo.offerPrice * cartItems[items];
      }
    }
    return Math.floor(totalAmount * 100) / 100;
  };

  // useEffect(() => {
  //   fetchUserData();
  // }, []);

  const contextValue = {
    products, router,
    cartItems, getCartCount,
    addToCart, navigate,
    removeFromCart,
    getCartAmount,
    url,
    token,
    setToken,
    user,
    setUser,
    login,
    logout,
    updateUser,
    loading,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
