import React, { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../component/context/StoreContext";
import { useNavigate, useParams } from "react-router-dom";
import ProductCard from "../../component/ProductCard";
import { Mail, MapPin, Phone, Star } from "lucide-react";
import Loading from "../../component/Loading";
import toast from "react-hot-toast";

const Product = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, addToCart } = useContext(StoreContext);

  const [mainImage, setMainImage] = useState(null);
  const [productData, setProductData] = useState(null);

  const fetchProductData = async () => {
    const product = products.find((product) => product._id === id);
    setProductData(product);
  };

  useEffect(() => {
    fetchProductData();
  }, [id, products.length]);

  return productData ? (
    <>
      <div className="px-6 md:px-16 lg:px-32 pt-14 space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {/* Images Section */}
          <div className="px-5 lg:px-16 xl:px-20">
            <div className="rounded-lg overflow-hidden bg-gray-500/10 mb-4">
              <img
                src={mainImage || productData.image[0]}
                alt="product"
                className="w-full h-auto object-cover mix-blend-multiply"
                width={1280}
                height={720}
              />
            </div>

            <div className="grid grid-cols-4 gap-4">
              {productData.image.map((image, index) => (
                <div
                  key={index}
                  onClick={() => setMainImage(image)}
                  className="cursor-pointer rounded-lg overflow-hidden bg-gray-500/10"
                >
                  <img
                    src={image}
                    alt={`thumb-${index}`}
                    className="w-full h-auto object-cover mix-blend-multiply"
                    width={1280}
                    height={720}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Info Section */}
          <div className="flex flex-col">
            <h1 className="text-3xl font-medium text-gray-800/90 mb-4">
              {productData.name}
            </h1>
            <p className="text-gray-500/80 text-sm mt-1">
              {productData.inStock ? "In Stock" : "Out of Stock"}
            </p>
            <p className="text-gray-500/80 text-sm mt-1">
              {productData.inStock ? "Free Shipping" : "No Shipping Available"}
            </p>
            <p className="text-gray-600 mt-3">{productData.description}</p>
            <p className="text-3xl font-medium mt-6">
              ₦{productData.offerPrice}
              <span className="text-base font-normal text-gray-800/60 line-through ml-2">
                ₦{productData.price}
              </span>
            </p>

            <hr className="bg-gray-600 my-2" />

            <div className="overflow-x-auto">
              <table className="table-auto border-collapse w-full max-w-72">
                <tbody>
                  <tr>
                    <td className="text-gray-600 font-medium">Location</td>
                    <td className="text-gray-800/50 flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {productData.location}
                    </td>
                  </tr>
                  <tr>
                    <td className="text-gray-600 font-medium">Rating</td>
                    <td className="text-gray-800/50 flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500" />
                      <span>{productData.rating}</span>
                    </td>
                  </tr>
                  <tr>
                    <td className="text-gray-600 font-medium">Category</td>
                    <td className="text-gray-800/50">{productData.category}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            {/* farmer information section */}
            <hr className="bg-gray-600 my-2" />
            <div className="border rounded-xl p-5 bg-gray-50 shadow-sm mt-5">
              <h2 className="text-xl font-semibold text-gray-700 mb-4 border-b pb-2">
                Farmer Information
              </h2>

              <div className="flex items-center justify-between mb-4">
                {/* Avatar & Name */}
                <div className="flex items-center gap-4">
                  <img
                    src={productData.farmerImage}
                    alt={productData.farmerName}
                    className="w-14 h-14 rounded-full object-cover border"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-gray-800 font-medium">
                        {productData.farmerName}
                      </p>
                      <span className="text-sm bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-semibold">
                        ⭐ Verified
                      </span>
                    </div>
                    <p className="flex items-center gap-1 text-sm text-gray-500 mt-1">
                      <MapPin size={14} /> {productData.farmerAddress}
                    </p>
                  </div>
                </div>
              </div>

              {/* Contact Info */}
              <div className="space-y-2 text-sm text-gray-600 mb-4">
                <a
                  href={`tel:${productData.farmerPhone}`}
                  className="flex items-center gap-2 hover:text-green-700 transition"
                >
                  <Phone size={16} className="text-green-600" />
                  {productData.farmerPhone}
                </a>

                <a
                  href={`mailto:${productData.farmerEmail}`}
                  className="flex items-center gap-2 hover:text-green-700 transition"
                >
                  <Mail size={16} className="text-green-600" />
                  {productData.farmerEmail}
                </a>
              </div>

              {/* View Profile Button */}
              <button
                onClick={() => navigate(`/farmer/${productData.farmerId}`)}
                className="px-4 py-2 border border-green-600 text-green-700 rounded hover:bg-green-50 transition text-sm"
              >
                View Full Profile
              </button>
            </div>

            {/* Buttons */}
            <div className="flex items-center mt-6 gap-4">
              <button
                onClick={() => {
                  if (!productData.inStock) {
                    toast.error("🚫 This product is out of stock!", {
                      position: "top-center",
                      duration: 2500,
                      style: {
                        fontSize: "16px",
                        fontWeight: "500",
                      },
                    });
                    return;
                  }
                  addToCart(productData._id);
                  toast.success("🛒 Added to cart!", {
                    position: "top-center",
                    duration: 2000,
                    style: {
                      fontSize: "16px",
                      fontWeight: "500",
                    },
                  });
                }}
                className="w-full py-3.5 bg-gray-100 text-gray-800/80 hover:bg-gray-200 transition"
              >
                Add to Cart
              </button>

              <button
                onClick={() => {
                  if (!productData.inStock) {
                    toast.error("🚫 This product is out of stock!", {
                      position: "top-center",
                      duration: 2500,
                      style: {
                        fontSize: "16px",
                        fontWeight: "500",
                      },
                    });
                    return;
                  }

                  addToCart(productData._id);
                  toast.success("🛒 Added to cart!", {
                    position: "top-center",
                    duration: 2000,
                    style: {
                      fontSize: "16px",
                      fontWeight: "500",
                    },
                  });
                  navigate("/cart");
                }}
                className="w-full py-3.5 bg-green-500 text-white hover:bg-green-600 transition"
              >
                Buy now
              </button>
            </div>
          </div>
        </div>

        {/* Featured Products Section */}
        <div className="flex flex-col items-center">
          <div className="flex flex-col items-center mb-4 mt-16">
            <p className="text-3xl font-medium">
              Featured{" "}
              <span className="font-medium text-green-600">Products</span>
            </p>
            <div className="w-28 h-0.5 bg-green-600 mt-2"></div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-6 pb-14 w-full">
            {products.slice(0, 5).map((product, index) => (
              <ProductCard key={index} product={product} />
            ))}
          </div>

          <button className="px-8 py-2 mb-16 border rounded text-gray-500/70 hover:bg-slate-50/90 transition">
            See more
          </button>
        </div>
      </div>
    </>
  ) : (
    <Loading />
  );
};

export default Product;
