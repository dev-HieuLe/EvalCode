import React from "react";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "USD / month",
    description: "20 credits each month.",
    features: [
      "Access to basic grading",
      "Limited feedback",
      "No code suggestions",
    ],
    popular: false,
  },
  {
    name: "Basic",
    price: "$15",
    period: "USD / month",
    description: "400 credits each month.",
    features: ["Full AI grading", "Textual feedback only", "Teacher dashboard"],
    popular: true,
  },
  {
    name: "Pro",
    price: "$35",
    period: "USD / month",
    description: "Infinite credits.",
    features: [
      "Full AI grading",
      "Feedback + code suggestions",
      "Advanced analytics",
    ],
    popular: false,
  },
];

const Pricing = () => {
  return (
    <section className="bg-white py-24 px-6 min-h-screen" id="pricing-page">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-4">
          Our Pricing Plans
        </h2>
        <p className="text-gray-600 text-lg mb-12">
          Choose the plan that fits your needs. No hidden fees.
        </p>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative rounded-2xl border p-8 shadow-md hover:shadow-xl transition duration-300 ${
                plan.popular
                  ? "border-black scale-105 z-10 bg-white"
                  : "border-gray-300 bg-white"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 text-xs font-semibold bg-black text-white rounded-full">
                  Most Popular
                </div>
              )}
              <h3
                className={`text-3xl font-extrabold mb-2 ${
                  plan.popular ? "text-black" : "text-gray-900"
                }`}
              >
                {plan.name}
              </h3>
              <p className="flex items-end justify-center text-5xl font-extrabold text-gray-900 mb-1">
                {plan.price}
                <span className="text-sm font-medium text-gray-500 ml-1 mb-1">
                  {plan.period}
                </span>
              </p>
              <p className="text-sm text-gray-600 mb-6">{plan.description}</p>
              <ul className="text-sm text-left space-y-2 mb-6">
                {plan.features.map((feature, i) => (
                  <li key={i} className="text-gray-800 flex items-start">
                    <Check className="w-4 h-4 text-black mt-1 mr-2" /> {feature}
                  </li>
                ))}
              </ul>
              <button
                className={`w-full py-2 px-4 rounded-xl font-medium transition duration-300 ${
                  plan.popular
                    ? "bg-black text-white hover:bg-gray-900"
                    : "bg-gray-800 text-white hover:bg-gray-900"
                }`}
              >
                Choose Plan
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
