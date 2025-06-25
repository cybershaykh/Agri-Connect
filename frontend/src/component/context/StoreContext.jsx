import { createContext, useEffect, useState } from "react";
import { productsDummyData } from "../../assets/assets";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const StoreContext = createContext(null);

const StoreContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const url = "http://localhost:3000";

  const [cartItems, setCartItems] = useState({});
  const [token, setToken] = useState("");
  const [user, setUser] = useState(null);
  const [farmer, setFarmer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);

  // Fetch products from real API
  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${url}/api/product/getall`);
      setProducts(response.data.products);
    } catch (err) {
      console.error("Failed to fetch products", err);
      toast.error("Could not load products");
    }
  };
  // Fetch products on initial load
  useEffect(() => {
    fetchProducts();
  }, []);

  // Initialize with dummy products (fallback)
  const fetchProductData = async () => {
    setProducts(productsDummyData);
  };

  // Rehydrate auth on reload
  useEffect(() => {
    const initializeAuth = async () => {
      const storedToken = localStorage.getItem("token");
      const storedUser = localStorage.getItem("user");
      const storedFarmer = localStorage.getItem("farmer");

      if (storedToken) {
        setToken(storedToken);

        if (storedUser) {
          try {
            setUser(JSON.parse(storedUser));
          } catch (e) {
            console.error("Failed to parse user data", e);
          }
        } else if (storedFarmer) {
          try {
            setFarmer(JSON.parse(storedFarmer));
          } catch (e) {
            console.error("Failed to parse farmer data", e);
          }
        } else {
          await fetchUserData(storedToken);
        }
      }
      setLoading(false);
    };

    initializeAuth();
  }, []);

  // Load cart from localStorage
  useEffect(() => {
    const storedCart = localStorage.getItem("cartItems");
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);

  // Save cart to localStorage on update
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  // Fetch user profile
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

  // Login as user
  const login = async (token, userData) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userData));
    setToken(token);
    setUser(userData);
  };

  // Login as farmer
  const loginAsFarmer = async (token, farmerData) => {
    localStorage.setItem("token", token);
    localStorage.setItem("farmer", JSON.stringify(farmerData));
    setToken(token);
    setFarmer(farmerData);
  };

  // Logout
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("farmer");
    localStorage.removeItem("cartItems");
    setToken("");
    setUser(null);
    setFarmer(null);
  };

  // Update user info
  const updateUser = (updatedUser) => {
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
  };

  // Add to cart
  const addToCart = async (itemId) => {
    const cartData = structuredClone(cartItems);
    cartData[itemId] = (cartData[itemId] || 0) + 1;
    setCartItems(cartData);

    try {
      const token = localStorage.getItem("token");
      await axios.post(`${url}/api/cart/add`, { productId: itemId }, {
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch (err) {
      console.error("❌ Failed to sync with backend:", err.message);
    }
  };

  // Update quantity
  const updateCartQuantity = async (itemId, quantity) => {
    const cartData = structuredClone(cartItems);
    if (quantity === 0) {
      delete cartData[itemId];
    } else {
      cartData[itemId] = quantity;
    }
    setCartItems(cartData);

    try {
      const token = localStorage.getItem("token");
      await axios.post(`${url}/api/cart/add`, { productId: itemId }, {
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch (err) {
      console.error("❌ Failed to sync with backend:", err.message);
    }
  };

  // Total cart items count
  const getCartCount = () => {
    return Object.values(cartItems).reduce((sum, qty) => sum + qty, 0);
  };

  // Total amount
  const getCartAmount = () => {
    let totalAmount = 0;
    for (const itemId in cartItems) {
      const itemInfo = products.find((product) => product._id === itemId);
      if (itemInfo && cartItems[itemId] > 0) {
        totalAmount += itemInfo.offerPrice * cartItems[itemId];
      }
    }
    return Math.floor(totalAmount * 100) / 100;
  };
  useEffect(() => {
    fetchProductData();
  }, [])

  const contextValue = {
    products,
    cartItems,
    getCartCount,
    addToCart,
    navigate,
    fetchProductData,
    getCartAmount,
    loginAsFarmer,
    farmer,
    setFarmer,
    url,
    updateCartQuantity,
    token,
    setToken,
    user,
    setUser,
    login,
    logout,
    updateUser,
    loading,
    fetchProducts,
    fetchUserData,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
