import React, { useState, useEffect } from "react";
import {
  Star,
  User,
  Phone,
  Mail,
  MapPin,
  PencilLine,
  X,
  ChevronLeft,
} from "lucide-react";
import AOS from "aos";
import { Link } from "react-router-dom";
import "aos/dist/aos.css";

const ProductDetail = () => {
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewForm, setReviewForm] = useState({
    name: "",
    rating: 5,
    comment: "",
  });
  const [toast, setToast] = useState(null);

  useEffect(() => {
    AOS.init({ duration: 600 });
  }, []);

  const product = {
    id: 1,
    name: "Fresh Yam Tubers",
    price: 4.99,
    unit: "lb",
    description:
      "Premium Nigerian yam, perfect for boiling, frying, or pounding.",
    images: [
      "https://media.istockphoto.com/id/638094208/photo/sweet-potato.jpg?b=1&s=612x612&w=0&k=20&c=s_WNbthr_Jz3Pfu4iS-M1mD023aCrcjjZrJ9f_mzfmk=",
    ],
    farmer: {
      name: "Green Valley Farm",
      avatar: "https://plus.unsplash.com/premium_photo-1726313836345-3524772937fe?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fEdyZWVuJTIwVmFsbGV5JTIwRmFybXxlbnwwfHwwfHx8MA%3D%3D",
      location: "Sonoma County, California",
      distance: "2.3 miles",
      rating: 4.8,
      totalReviews: 156,
      memberSince: "2019",
      description:
        "Family-owned organic farm specializing in heirloom tomatoes and seasonal vegetables. We've been farming sustainably for over 20 years.",
      phone: "(555) 123-4567",
      email: "contact@greenvalleyfarm.com",
    },
    rating: 4.8,
    reviews: 124,
    badge: "Organic",
    inStock: true,
    harvestDate: "2024-03-15",
    certifications: ["USDA Organic", "Non-GMO"],
    nutritionFacts: {
      calories: 18,
      protein: "0.9g",
      carbs: "3.9g",
      fiber: "1.2g",
      vitaminC: "28% DV",
    },
  };

  const reviews = [
    {
      id: 1,
      user: "Sarah M.",
      avatar: "/placeholder.svg",
      rating: 5,
      date: "2024-03-10",
      comment:
        "Amazing tomatoes! So fresh and flavorful. Will definitely order again.",
      helpful: 12,
    },
    {
      id: 2,
      user: "Mike R.",
      avatar: "/placeholder.svg",
      rating: 4,
      date: "2024-03-08",
      comment:
        "Great quality, arrived fresh and well-packaged. Slightly pricey but worth it.",
      helpful: 8,
    },
    {
      id: 3,
      user: "Lisa K.",
      avatar: "/placeholder.svg",
      rating: 5,
      date: "2024-03-05",
      comment:
        "Best tomatoes I've had in years! Perfect for my homemade sauce.",
      helpful: 15,
    },
  ];

  // Submit review handler
  const handleReviewSubmit = (e) => {
    e.preventDefault();

    setToast("Review submitted successfully!");
    setShowReviewModal(false);
    setReviewForm({ name: "", rating: 5, comment: "" });

    // Hide toast after 3 seconds
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <div className="max-w-5xl mx-auto p-6" data-aos="fade-up">
      <Link
        to="/products"
        className="inline-flex items-center text-green-700 hover:text-green-900 hover:underline mb-4"
      >
        <ChevronLeft className="w-5 h-5 mr-1" />
        Back to Products
      </Link>
      {/* Product Images */}
      <div className="flex gap-4 mb-6">
        <div className="flex flex-col gap-2">
          {product.images.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`${product.name} ${idx + 1}`}
              className={`w-20 h-20 object-cover rounded cursor-pointer border-2 ${
                selectedImage === idx
                  ? "border-green-600"
                  : "border-transparent"
              }`}
              onClick={() => setSelectedImage(idx)}
            />
          ))}
        </div>
        <img
          src={product.images[selectedImage]}
          alt={product.name}
          className="w-96 h-96 object-cover rounded"
        />
      </div>

      {/* Product Info */}
      <div>
        <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
        <div className="flex items-center gap-2 mb-4">
          <Star className="text-yellow-400" />
          <span>
            {product.rating} ({product.reviews} reviews)
          </span>
          <span className="ml-4 px-2 py-1 bg-green-200 text-green-800 rounded text-xs font-semibold">
            {product.badge}
          </span>
        </div>
        <p className="mb-4">{product.description}</p>
        <p className="font-semibold mb-2">
          Price: ${product.price} per {product.unit}
        </p>
      </div>

      {/* Farmer Info */}
      <div className="border-t pt-4 mt-6">
        <h2 className="text-2xl font-semibold mb-2">Farmer Information</h2>
        <div className="flex items-center gap-4 mb-2">
          <img
            src={product.farmer.avatar}
            alt={product.farmer.name}
            className="w-12 h-12 rounded-full"
          />
          <div>
            <p className="font-semibold">{product.farmer.name}</p>
            <p className="flex items-center gap-1 text-sm text-gray-600">
              <MapPin size={14} /> {product.farmer.location} (
              {product.farmer.distance})
            </p>
            <p className="flex items-center gap-1 text-sm text-gray-600">
              <Star size={14} /> {product.farmer.rating} (
              {product.farmer.totalReviews} reviews)
            </p>
          </div>
        </div>
        <p className="mb-2">{product.farmer.description}</p>
        <p className="flex items-center gap-2 text-sm">
          <Phone size={16} /> {product.farmer.phone}
        </p>
        <p className="flex items-center gap-2 text-sm">
          <Mail size={16} /> {product.farmer.email}
        </p>
      </div>

      {/* Reviews Section */}
      <div className="border-t pt-6 mt-6">
        <h2 className="text-2xl font-semibold mb-4">Customer Reviews</h2>

        <button
          onClick={() => setShowReviewModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition mb-4"
        >
          <PencilLine size={18} />
          Write a Review
        </button>

        {reviews.map((review) => (
          <div
            key={review.id}
            className="border-b py-4 last:border-b-0"
            data-aos="fade-up"
          >
            <div className="flex items-center gap-3 mb-2">
              <img
                src={review.avatar}
                alt={review.user}
                className="w-10 h-10 rounded-full"
              />
              <div>
                <p className="font-semibold">{review.user}</p>
                <div className="flex items-center gap-1 text-yellow-400">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} size={16} />
                  ))}
                </div>
              </div>
              <span className="ml-auto text-sm text-gray-500">
                {review.date}
              </span>
            </div>
            <p>{review.comment}</p>
          </div>
        ))}
      </div>

      {/* Review Modal */}
      {showReviewModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center px-4">
          <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md relative">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-black"
              onClick={() => setShowReviewModal(false)}
              aria-label="Close review form"
            >
              <X size={24} />
            </button>
            <h3 className="text-xl font-semibold mb-4">Write a Review</h3>

            <form onSubmit={handleReviewSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Your name"
                value={reviewForm.name}
                onChange={(e) =>
                  setReviewForm({ ...reviewForm, name: e.target.value })
                }
                className="w-full border p-2 rounded"
                required
              />

              <select
                value={reviewForm.rating}
                onChange={(e) =>
                  setReviewForm({
                    ...reviewForm,
                    rating: parseInt(e.target.value),
                  })
                }
                className="w-full border p-2 rounded"
              >
                {[5, 4, 3, 2, 1].map((val) => (
                  <option key={val} value={val}>
                    {val} Stars
                  </option>
                ))}
              </select>

              <textarea
                placeholder="Your comment"
                value={reviewForm.comment}
                onChange={(e) =>
                  setReviewForm({ ...reviewForm, comment: e.target.value })
                }
                className="w-full border p-2 rounded"
                rows="4"
                required
              />

              <button
                type="submit"
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Submit Review
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-6 right-6 bg-green-600 text-white px-6 py-3 rounded shadow-lg animate-fade-in">
          {toast}
        </div>
      )}

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease forwards;
        }
      `}</style>
    </div>
  );
};

export default ProductDetail;
