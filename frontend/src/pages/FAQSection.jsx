import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { ChevronDown, ChevronUp } from "lucide-react";

const faqs = [
  {
    question: "What is AgriConnect?",
    answer:
      "AgriConnect is a platform that connects Nigerian farmers with buyers, markets, and vital agricultural resources including weather forecasts and market prices.",
  },
  {
    question: "How can I register as a farmer or buyer?",
    answer:
      "You can sign up directly on our website by choosing your role—either as a farmer, buyer, or partner. Simply follow the registration prompts.",
  },
  {
    question: "Is AgriConnect free to use?",
    answer:
      "Yes, the platform is free for farmers. Buyers may be charged a small service fee for premium features and logistics support.",
  },
  {
    question: "Can I get weather and market price updates?",
    answer:
      "Absolutely. We provide real-time weather forecasts and up-to-date market prices for agricultural products relevant to your location.",
  },
  {
    question: "How do I contact support?",
    answer:
      "You can reach us through our contact page, email (support@agricconnect.com), or call us at +234 800 123 4567.",
  },
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-white py-20 px-4" id="faq" data-aos="fade-up">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-green-700 mb-4">Frequently Asked Questions</h2>
          <p className="text-gray-600">Here are answers to some of the most common questions we get.</p>
        </div>

        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-lg p-4 shadow-sm transition-all duration-300"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="flex justify-between items-center w-full text-left text-lg font-medium text-green-800"
              >
                {faq.question}
                {openIndex === index ? (
                  <ChevronUp className="text-green-600 w-6 h-6" />
                ) : (
                  <ChevronDown className="text-green-600 w-6 h-6" />
                )}
              </button>
              {openIndex === index && (
                <div className="mt-3 text-gray-700 text-sm">{faq.answer}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
