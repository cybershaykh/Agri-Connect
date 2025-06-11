import React, { useContext } from "react";
import { StoreContext } from "../component/context/StoreContext";
import { X, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cartItems, removeFromCart, addToCart, getTotalCartAmount } =
    useContext(StoreContext);

  // const handleRemoveItem = (productId) => {
  //   removeFromCart(productId);
  //   toast.success("Item removed from cart");
  // };

  // const handleIncreaseQuantity = (productId) => {
  //   addToCart(productId);
  //   toast.success("Item quantity increased");
  // };

  // const handleDecreaseQuantity = (productId) => {
  //   removeFromCart(productId);
  //   toast.success("Item quantity decreased");
  // };

  return (
    <div className="container mx-auto px-4 py-12">
      
      <h1 className="text-3xl font-bold text-green-800 mb-8">Your Shopping Cart</h1>

      {Object.keys(cartItems).length === 0 ? (
        <div className="text-center py-12">
          <ShoppingCart className="w-16 h-16 mx-auto text-gray-400 mb-4" />
          <h2 className="text-xl font-semibold text-gray-600 mb-2">
            Your cart is empty
          </h2>
          <p className="text-gray-500 mb-6">
            Looks like you haven't added any items to your cart yet.
          </p>
          <Link
            to="/products"
            className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
          >
            Browse Products
          </Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="grid grid-cols-12 bg-gray-100 p-4 font-semibold text-gray-700">
                <div className="col-span-6">Product</div>
                <div className="col-span-2 text-center">Price</div>
                <div className="col-span-2 text-center">Quantity</div>
                <div className="col-span-2 text-center">Total</div>
              </div>

              {Object.entries(cartItems).map(([productId, quantity]) => {
                const product = sampleProducts.find((p) => p.id === productId);
                if (!product) return null;

                return (
                  <div
                    key={productId}
                    className="grid grid-cols-12 items-center p-4 border-b"
                  >
                    <div className="col-span-6 flex items-center">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-16 h-16 object-cover rounded mr-4"
                      />
                      <div>
                        <h3 className="font-medium">{product.name}</h3>
                        <p className="text-sm text-gray-500">
                          {product.category}
                        </p>
                      </div>
                    </div>
                    <div className="col-span-2 text-center">
                      ${product.price.toFixed(2)}
                    </div>
                    <div className="col-span-2 flex justify-center items-center">
                      <button
                        onClick={() => removeFromCart(productId)}
                        className="p-1 rounded bg-gray-200 hover:bg-gray-300"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="mx-2">{quantity}</span>
                      <button
                        onClick={() => addToCart(productId)}
                        className="p-1 rounded bg-gray-200 hover:bg-gray-300"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                    <div className="col-span-2 text-center">
                      ${(product.price * quantity).toFixed(2)}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6 h-fit">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${getTotalCartAmount().toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="border-t pt-4 flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>${getTotalCartAmount().toFixed(2)}</span>
              </div>
            </div>
            <button className="w-full mt-6 py-3 bg-green-600 text-white rounded hover:bg-green-700 transition">
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;