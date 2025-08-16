// HowItWorksSection.jsx
import React from "react";
import { ClipboardCheck, Sliders, Sparkles } from "lucide-react";

const Tutorial = () => {
  const steps = [
    {
      icon: <ClipboardCheck className="w-6 h-6 text-blue-600" />,
      title: "Paste Student Code",
      description:
        "Copy and paste student code into the AI-powered grading interface.",
    },
    {
      icon: <Sliders className="w-6 h-6 text-purple-600" />,
      title: "Select Grading Style",
      description:
        "Customize AI output: score-only, feedback-only, or full correction suggestions.",
    },
    {
      icon: <Sparkles className="w-6 h-6 text-green-600" />,
      title: "Receive AI Feedback",
      description: "Get structured, readable scoring and feedback in seconds.",
    },
  ];

  return (
    <section
      className="relative bg-white py-20 px-4 md:px-8 overflow-hidden"
      id="how-it-works"
    >
      {/* Decorative blurred rainbow gradient circles */}
      <div className="absolute top-24 -left-29 w-80 h-80 bg-gradient-to-br from-pink-600 via-blue-500 to-purple-400 opacity-22 rounded-full blur-3xl z-0 pointer-events-none" />
      <div className="absolute bottom-24 -right-20 w-72 h-72 bg-gradient-to-tr from-yellow-300 via-green-300 to-purple-500 opacity-21 rounded-full blur-3xl z-0 pointer-events-none" />
      <div className="max-w-4xl mx-auto text-center mb-14 relative z-10">
        <h2 className="text-5xl md:text-6xl font-bold mb-4 tracking-tight">
          How It Works
        </h2>
        <p className="text-gray-600 text-lg md:text-xl max-w-xl mx-auto">
          Start grading code with AI in just three simple and powerful steps.
        </p>
      </div>

      <div className="relative max-w-4xl mx-auto z-10">
        <div className="relative z-10 grid grid-cols-1 gap-7 md:gap-9">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`relative flex flex-col md:flex-row items-center md:items-start gap-5 md:gap-8 ${
                index % 2 === 1 ? "md:flex-row-reverse" : ""
              }`}
            >
              <div className="relative z-10 flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-full bg-white shadow-xl border-2 border-blue-100">
                {step.icon}
              </div>

              <div className="relative z-10 bg-white/90 backdrop-blur-md p-5 md:p-7 rounded-2xl shadow-xl w-full md:w-[70%] border border-blue-100 hover:shadow-2xl transition-all duration-300">
                <h3 className="text-lg md:text-xl font-bold mb-2 text-gray-800">
                  Step {index + 1}: {step.title}
                </h3>
                <p className="text-gray-600 text-base md:text-lg leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="text-center mt-14 md:mt-18 relative z-10">
        <button
          className="bg-black text-white text-base md:text-lg px-8 md:px-10 py-3 md:py-4 rounded-3xl shadow-xl hover:bg-gray-800 hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
          aria-label="Try EvalAI now"
        >
          🚀 Try It Now
        </button>
      </div>
    </section>
  );
};

export default Tutorial;
