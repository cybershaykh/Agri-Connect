import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  MapPin,
  Star,
  Calendar,
  Truck,
  Award,
  MessageCircle,
} from "lucide-react";
import { Link } from "react-router-dom"; // or next/link if using Next.js

export default function FarmersPage() {
  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);

  const farmers = [
    {
      id: 1,
      name: "Green Valley Farm",
      owner: "John & Mary Smith",
      avatar: "https://images.unsplash.com/photo-1608890698183-391c39c27058?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Sm9obiUyMCUyNiUyME1hcnklMjBTbWl0aHxlbnwwfHwwfHx8MA%3D%3D",
      coverImage: "https://plus.unsplash.com/premium_photo-1726313836345-3524772937fe?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fEdyZWVuJTIwVmFsbGV5JTIwRmFybXxlbnwwfHwwfHx8MA%3D%3D",
      location: "Sonoma County, California",
      distance: "2.3 miles",
      rating: 4.8,
      totalReviews: 156,
      memberSince: "2019",
      specialties: ["Organic Vegetables", "Heirloom Tomatoes", "Herbs"],
      description: "Family-owned organic farm specializing in heirloom tomatoes and seasonal vegetables.",
      certifications: ["USDA Organic", "Non-GMO"],
      deliveryRadius: "15 miles",
      products: 24,
    },
    {
      id: 2,
      name: "Berry Fields",
      owner: "Sarah Johnson",
      avatar: "https://images.unsplash.com/photo-1573680352047-d0d8bda342b4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8U2FyYWglMjBKb2huc29ufGVufDB8fDB8fHww",
      coverImage: "https://images.unsplash.com/photo-1604479646367-8c2b3190f525?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fEJlcnJ5JTIwRmllbGRzfGVufDB8fDB8fHww",
      location: "Willamette Valley, Oregon",
      distance: "5.1 miles",
      rating: 4.9,
      totalReviews: 89,
      memberSince: "2020",
      specialties: ["Berries", "Stone Fruits", "Seasonal Produce"],
      description: "Sustainable berry farm focusing on strawberries, blueberries, and seasonal stone fruits.",
      certifications: ["Sustainable Agriculture", "Local Organic"],
      deliveryRadius: "20 miles",
      products: 18,
    },
    {
      id: 3,
      name: "Sunshine Acres",
      owner: "Mike Rodriguez",
      avatar: "https://images.unsplash.com/photo-1612190219911-286df0e14656?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8TWlrZSUyMFJvZHJpZ3VlenxlbnwwfHwwfHx8MA%3D%3D",
      coverImage: "https://media.istockphoto.com/id/1389765367/photo/beautiful-sunny-day-out.webp?a=1&b=1&s=612x612&w=0&k=20&c=xbkm8pAB9eLNEm2qNdTzscIRQjI8siCg9VDfABgtMVA=",
      location: "Cedar Falls, Iowa",
      distance: "8.7 miles",
      rating: 4.7,
      totalReviews: 134,
      memberSince: "2018",
      specialties: ["Corn", "Soybeans", "Root Vegetables"],
      description: "Traditional family farm growing corn, soybeans, and a variety of root vegetables.",
      certifications: ["Non-GMO", "Sustainable Farming"],
      deliveryRadius: "25 miles",
      products: 31,
    },
    {
      id: 4,
      name: "Leafy Greens Co",
      owner: "Emma Chen",
      avatar: "https://plus.unsplash.com/premium_photo-1661583648651-e00d6358037f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8RW1tYSUyMENoZW58ZW58MHx8MHx8fDA%3D",
      coverImage: "https://media.istockphoto.com/id/1446498502/photo/summer-corn-fields-in-southwestern-rural-western-colorado-usa-photo-series.webp?a=1&b=1&s=612x612&w=0&k=20&c=ePDifmaT5ny4TqY1IfxD-W_XSNMOsyhRoEExS6eYJdA=",
      location: "Hudson Valley, New York",
      distance: "3.2 miles",
      rating: 4.6,
      totalReviews: 78,
      memberSince: "2021",
      specialties: ["Leafy Greens", "Microgreens", "Herbs"],
      description: "Hydroponic farm specializing in fresh leafy greens and microgreens year-round.",
      certifications: ["Hydroponic Certified", "Pesticide-Free"],
      deliveryRadius: "10 miles",
      products: 15,
    },
    {
      id: 5,
      name: "AgriConnect Farm",
      owner: "Ngozi Okafor",
      avatar: "https://media.istockphoto.com/id/474255456/photo/beautiful-woman-doing-different-expressions-in-different-sets-of-clothes.webp?a=1&b=1&s=612x612&w=0&k=20&c=f4uE_muJUYNcIoiFIJvKNOrTa2VosPbyJ6YwRc8cDSI=",
      coverImage: "https://plus.unsplash.com/premium_photo-1664303828953-3e8ef4ac44e2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8QWdyaUNvbm5lY3QlMjBGYXJtfGVufDB8fDB8fHww",
      location: "Kaduna, Nigeria",
      distance: "12.0 miles",
      rating: 4.9,
      totalReviews: 102,
      memberSince: "2022",
      specialties: ["Yam", "Cassava", "Vegetables"],
      description: "Empowering local farmers with sustainable practices and direct-to-buyer produce delivery.",
      certifications: ["AgriConnect Verified"],
      deliveryRadius: "30 miles",
      products: 40,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto px-4 py-10">
        <div className="text-center mb-12" data-aos="fade-up">
          <h1 className="text-4xl font-bold mb-4">Meet Our Local Farmers</h1>
          <p className="text-gray-600 max-w-xl mx-auto">Connect directly with nearby farmers and get the freshest produce while supporting local agriculture.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {farmers.map((farmer) => (
            <div key={farmer.id} className="bg-white shadow rounded-lg overflow-hidden" data-aos="fade-up">
              <img src={farmer.coverImage} alt={farmer.name} className="w-full h-48 object-cover" />
              <div className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <img src={farmer.avatar} alt="Avatar" className="w-16 h-16 rounded-full" />
                  <div>
                    <h2 className="text-xl font-semibold">{farmer.name}</h2>
                    <p className="text-gray-500 text-sm">by {farmer.owner}</p>
                  </div>
                </div>

                <p className="text-gray-600 mb-4">{farmer.description}</p>

                <div className="text-sm text-gray-600 flex items-center gap-2 mb-2">
                  <MapPin className="w-4 h-4" />
                  {farmer.location} • {farmer.distance}
                </div>

                <div className="flex items-center text-sm text-gray-600 gap-4 mb-4">
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400" />
                    <span className="ml-1">{farmer.rating} ({farmer.totalReviews})</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    Since {farmer.memberSince}
                  </div>
                </div>

                <div className="mb-3">
                  <h4 className="text-sm font-medium mb-1">Specialties:</h4>
                  <div className="flex flex-wrap gap-2">
                    {farmer.specialties.map((spec, i) => (
                      <span key={i} className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">{spec}</span>
                    ))}
                  </div>
                </div>

                <div className="mb-3">
                  <h4 className="text-sm font-medium mb-1">Certifications:</h4>
                  <div className="flex flex-wrap gap-2">
                    {farmer.certifications.map((cert, i) => (
                      <span key={i} className="text-xs flex items-center gap-1 bg-green-50 text-green-700 px-2 py-1 rounded">
                        <Award className="w-3 h-3" /> {cert}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="text-sm text-gray-600 mb-4 flex items-center">
                  <Truck className="w-4 h-4 mr-1" />
                  {farmer.products} products available
                </div>

                <div className="flex gap-2">
                  <a href={`/farmers/${farmer.id}`} className="w-full">
                    <button className="w-full border border-gray-300 px-4 py-2 rounded hover:bg-gray-100">View Profile</button>
                  </a>
                  <button className="w-full bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 flex items-center justify-center gap-1">
                    <MessageCircle className="w-4 h-4" /> Contact
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
