import { createContext, useEffect, useState } from "react";
import { productsDummyData } from "../../assets/assets";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const StoreContext = createContext(null);

const StoreContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const url = "http://localhost:3000";

  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const [token, setToken] = useState("");
  const [user, setUser] = useState(null);
  const [farmer, setFarmer] = useState(null);
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🟢 Fetch products from API
  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${url}/api/product/getall`);
      setProducts(res.data.products || []);
    } catch (err) {
      console.error("❌ Product fetch error:", err);
      toast.error("Failed to load products");
    }
  };

  // 🛒 Load cart from localStorage
  useEffect(() => {
    const storedCart = localStorage.getItem("cartItems");
    if (storedCart) setCartItems(JSON.parse(storedCart));
  }, []);

  // 💾 Save cart to localStorage
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  // 🧠 Rehydrate auth on reload
  useEffect(() => {
    const initializeAuth = async () => {
      const storedToken = localStorage.getItem("token");
      const storedUser = localStorage.getItem("user");
      const storedFarmer = localStorage.getItem("farmer");
      const storedAdmin = localStorage.getItem("admin");

      if (storedToken) {
        setToken(storedToken);
        try {
          if (storedUser) {
            setUser(JSON.parse(storedUser));
          } else if (storedFarmer) {
            setFarmer(JSON.parse(storedFarmer));
          } else if (storedAdmin) {
            setAdmin(JSON.parse(storedAdmin));
          } else {
            await fetchUserData(storedToken);
          }
        } catch (e) {
          console.error("❌ Error parsing stored auth", e);
        }
      }

      setLoading(false);
    };

    initializeAuth();
    fetchProducts();
  }, []);

  // 🔐 Fetch authenticated user
  const fetchUserData = async (token) => {
    try {
      const res = await axios.get(`${url}/api/user/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(res.data.user);
      localStorage.setItem("user", JSON.stringify(res.data.user));
    } catch (err) {
      console.error("❌ Failed to fetch user profile", err);
      logout();
    }
  };

  // 👉 Login as user
  const login = (token, userData) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userData));
    setToken(token);
    setUser(userData);
  };

  // 👉 Login as farmer
  const loginAsFarmer = (token, farmerData) => {
    localStorage.setItem("token", token);
    localStorage.setItem("farmer", JSON.stringify(farmerData));
    setToken(token);
    setFarmer(farmerData);
  };

  // 👉 Login as admin
  const loginAsAdmin = (token, adminData) => {
    localStorage.setItem("token", token);
    localStorage.setItem("admin", JSON.stringify(adminData));
    setToken(token);
    setAdmin(adminData);
  };

  // 🔓 Logout all roles
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("farmer");
    localStorage.removeItem("admin");
    localStorage.removeItem("cartItems");
    setToken("");
    setUser(null);
    setFarmer(null);
    setAdmin(null);
    setCartItems({});
  };

  // 🛠 Update user profile
  const updateUser = (updatedUser) => {
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
  };

  // 🛒 Add to cart
  const addToCart = async (itemId) => {
    const updatedCart = { ...cartItems, [itemId]: (cartItems[itemId] || 0) + 1 };
    setCartItems(updatedCart);

    try {
      const token = localStorage.getItem("token");
      await axios.post(`${url}/api/cart/add`, { productId: itemId }, {
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch (err) {
      console.error("❌ Sync error:", err.message);
    }
  };

  // ➖ Update quantity
  const updateCartQuantity = async (itemId, quantity) => {
    const updatedCart = { ...cartItems };
    if (quantity === 0) {
      delete updatedCart[itemId];
    } else {
      updatedCart[itemId] = quantity;
    }
    setCartItems(updatedCart);

    try {
      const token = localStorage.getItem("token");
      await axios.post(`${url}/api/cart/add`, { productId: itemId }, {
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch (err) {
      console.error("❌ Failed to sync cart quantity:", err.message);
    }
  };

  // 🧮 Get cart count
  const getCartCount = () =>
    Object.values(cartItems).reduce((acc, qty) => acc + qty, 0);

  // 💰 Get cart total
  const getCartAmount = () => {
    return Object.entries(cartItems).reduce((total, [id, qty]) => {
      const item = products.find((p) => p._id === id);
      return item ? total + item.offerPrice * qty : total;
    }, 0);
  };

  const contextValue = {
    url,
    products,
    cartItems,
    token,
    user,
    farmer,
    admin,
    loading,
    navigate,

    // Auth
    login,
    loginAsFarmer,
    loginAsAdmin,
    logout,
    updateUser,
    fetchUserData,

    // Cart
    addToCart,
    updateCartQuantity,
    getCartCount,
    getCartAmount,

    // State setters
    setToken,
    setUser,
    setFarmer,
    setAdmin,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
