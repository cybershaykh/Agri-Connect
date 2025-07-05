import React from "react";
import { useContext } from "react";
import { StoreContext } from "./context/StoreContext";
import { MapPin } from "lucide-react";

const ProductCard = ({ product }) => {
  const { navigate } = useContext(StoreContext);

  return (
    <div
      onClick={() => {
        navigate("/product/" + product._id);
        scrollTo(0, 0);
      }}
      className="flex flex-col items-start gap-0.5 max-w-[200px] w-full cursor-pointer"
    >
      <div className="cursor-pointer group relative bg-gray-500/10 rounded-lg w-full h-52 flex items-center justify-center">
        <img
          src={product.image[0]}
          alt={product.name}
          className="group-hover:scale-105 transition object-cover w-4/5 h-4/5 md:w-full md:h-full"
          width={800}
          height={800}
        />
        <div
          className={`absolute top-2 right-2 text-xs px-3 py-1 rounded-full font-semibold select-none ${
            product.inStock
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {product.inStock ? "In Stock" : "Out of Stock"}
        </div>
      </div>

      <p className="md:text-base font-medium pt-2 w-full truncate">
        {product.name}
      </p>
      <p className="w-full text-xs text-gray-500/70 max-sm:hidden truncate">
        {product.description}
      </p>
      <div className="text-sm text-blue-600 font-semibold flex items-center space-x-1">
        <MapPin className="w-4 h-4" />
        <span>{product.location}</span>
      </div>
      <div className="flex items-center gap-2">
        {/* <p className="text-xs"></p> */}
        <div className="text-yellow-500 text-sm">
          <span className="text-gray-500 ">
            ({(product.rating || 0).toFixed(1)})
          </span>
          {"★".repeat(Math.floor(product.rating)) +
            "☆".repeat(5 - Math.floor(product.rating))}
        </div>
      </div>
      <p className="text-xs text--500/70 max-sm:hidden">{product.category}</p>

      <div className="flex items-end justify-between w-full mt-1">
        <p className="text-base font-medium">₦{product.price}</p>
        <button className=" max-sm:hidden px-4 py-1.5 text-gray-500 border border-gray-500/20 rounded-full text-xs hover:bg-slate-50 transition">
          Buy now
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
