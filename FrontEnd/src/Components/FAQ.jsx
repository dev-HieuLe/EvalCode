import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const DISPLAY_FONT = `"Helvetica Now Display", "Inter", "Helvetica", Arial, sans-serif`;

const faqs = [
  {
    question: "What is EvalCode?",
    answer:
      "EvalCode is an AI-powered grading platform that helps educators save time and provide consistent, high-quality feedback to students.",
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
    question: "Can I try EvalCode for free?",
    answer:
      "Yes. Our Free plan gives you 20 credits per month to try out all basic features.",
  },
  {
    question: "Who can use EvalCode?",
    answer:
      "EvalCode is designed for teachers, instructors, and educational institutions of all sizes.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section
      id="faq"
      style={{
        background: "#fbfbf5",
        color: "#000000",
        paddingTop: 96,
        paddingBottom: 96,
        minHeight: "100vh",
      }}
    >
      <div className="max-w-3xl mx-auto px-6">
        <span
          className="inline-block uppercase mb-6"
          style={{
            fontSize: 12,
            fontWeight: 400,
            letterSpacing: "0.72px",
            color: "#52525b",
          }}
        >
          FAQ
        </span>
        <h2
          style={{
            fontFamily: DISPLAY_FONT,
            fontSize: "clamp(40px, 6vw, 55px)",
            fontWeight: 330,
            lineHeight: 1.16,
          }}
        >
          Frequently asked questions.
        </h2>
        <p
          className="mt-4"
          style={{ fontSize: 18, fontWeight: 550, lineHeight: 1.56 }}
        >
          Everything you need to know about EvalCode.
        </p>

        <div className="mt-12">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              style={{ borderBottom: "1px solid #e4e4e7" }}
            >
              <button
                className="w-full flex justify-between items-center py-6 text-left focus:outline-none"
                onClick={() => toggle(idx)}
                aria-expanded={openIndex === idx}
                style={{
                  fontFamily: DISPLAY_FONT,
                  fontSize: 20,
                  fontWeight: 500,
                  letterSpacing: "0.3px",
                  lineHeight: 1.4,
                  color: "#000000",
                }}
              >
                {faq.question}
                <ChevronDown
                  className={`ml-2 w-5 h-5 transition-transform duration-200 ${
                    openIndex === idx ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openIndex === idx && (
                <div
                  className="pb-6"
                  style={{
                    color: "#52525b",
                    fontSize: 16,
                    fontWeight: 420,
                    lineHeight: 1.5,
                  }}
                >
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
