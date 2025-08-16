import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "What is EvalAI?",
    answer:
      "EvalAI is an AI-powered grading platform that helps educators save time and provide consistent, high-quality feedback to students.",
  },
  {
    question: "How does the credit system work?",
    answer:
      "Each plan comes with a set number of credits. Credits are used each time you submit an assignment for grading. You can top up credits as needed.",
  },
  {
    question: "Is my data secure?",
    answer:
      "Absolutely. We use industry-standard encryption and never share your data with third parties.",
  },
  {
    question: "Can I try EvalAI for free?",
    answer:
      "Yes! Our Free plan gives you 20 credits per month to try out all basic features.",
  },
  {
    question: "Who can use EvalAI?",
    answer:
      "EvalAI is designed for teachers, instructors, and educational institutions of all sizes.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="bg-white py-24 px-6 min-h-screen" id="faq">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
          Frequently Asked Questions
        </h2>
        <p className="text-gray-600 text-lg mb-12">
          Everything you need to know about EvalAI.
        </p>
        <div className="space-y-4 text-left">
          {faqs.map((faq, idx) => (
            <div key={idx} className="border-b">
              <button
                className="w-full flex justify-between items-center py-4 text-xl font-semibold text-gray-900 focus:outline-none"
                onClick={() => toggle(idx)}
                aria-expanded={openIndex === idx}
              >
                {faq.question}
                <ChevronDown
                  className={`ml-2 w-6 h-6 transition-transform duration-200 ${
                    openIndex === idx ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openIndex === idx && (
                <div className="pb-4 text-gray-700 text-base animate-fade-in">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
