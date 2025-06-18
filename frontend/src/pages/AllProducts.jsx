import { useContext } from "react";
import ProductCard from "../component/ProductCard";
import { StoreContext } from "../component/context/StoreContext";

const AllProducts = () => {
  const { products } = useContext(StoreContext);

  return (
    <>
      <div className="flex flex-col items-start px-6 md:px-16 lg:px-32">
        <div className="flex flex-col items-end pt-12">
          <p className="text-2xl font-medium">All products</p>
          <div className="w-16 h-0.5 bg-green-600 rounded-full"></div>
        </div>
        <div className="text-center my-8">
          <h1 className="text-3xl md:text-4xl font-bold text-green-800">
            Explore Fresh Farm Products near you
          </h1>
          <p className="mt-2 text-gray-600 max-w-2xl mx-auto">
            Browse a wide variety of agricultural products sourced directly from
            trusted Nigerian farmers. Get fresh, affordable, and quality produce
            all in one place.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 flex-col items-center gap-6 mt-12 pb-14 w-full">
          {products.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
        </div>
      </div>
    </>
  );
};

export default AllProducts;
