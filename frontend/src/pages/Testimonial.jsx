import React from "react";
import { Star } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";

const testimonials = [
  {
    name: "Aisha Bello",
    role: "Farmer, Kano State",
    message:
      "AgriConnect has transformed how I sell my produce. I now reach buyers directly, get better prices, and manage my inventory with ease!",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
    rating: 5,
  },
  {
    name: "Chinedu Okafor",
    role: "Restaurant Owner, Enugu",
    message:
      "The fresh produce I get from AgriConnect is unmatched. Plus, I love supporting local farmers through the platform!",
    image: "https://randomuser.me/api/portraits/men/75.jpg",
    rating: 5,
  },
  {
    name: "Grace Yakubu",
    role: "Retailer, Abuja",
    message:
      "AgriConnect has made it so easy to discover reliable farmers. The delivery and customer service are excellent!",
    image: "https://randomuser.me/api/portraits/women/65.jpg",
    rating: 4,
  },
];

const Testimonial = () => {
  React.useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <section className="bg-white py-20 px-6 md:px-16 lg:px-32" id="testimonials">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-green-700 mb-12" data-aos="fade-up">
        What Our Users Are Saying
      </h2>
      <div className="grid md:grid-cols-3 gap-8">
        {testimonials.map((t, i) => (
          <div
            key={i}
            className="bg-gray-50 border border-green-100 p-6 rounded-2xl shadow hover:shadow-lg transition"
            data-aos="fade-up"
            data-aos-delay={i * 150}
          >
            <div className="flex items-center space-x-4 mb-4">
              <img
                src={t.image}
                alt={t.name}
                className="w-14 h-14 rounded-full object-cover"
              />
              <div>
                <h4 className="font-semibold text-gray-800">{t.name}</h4>
                <p className="text-sm text-gray-500">{t.role}</p>
              </div>
            </div>
            <p className="text-gray-600 mb-4">"{t.message}"</p>
            <div className="flex text-yellow-400">
              {Array.from({ length: t.rating }).map((_, idx) => (
                <Star key={idx} className="w-5 h-5 fill-yellow-400 stroke-yellow-400" />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonial;
