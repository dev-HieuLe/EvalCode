import React from "react";

const JoinUsNow = () => {
  return (
    <section className="relative py-36 px-6 md:px-0 bg-white overflow-hidden">
      {/* Soft radial highlight background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 w-[80%] h-[80%] -translate-x-1/2 -translate-y-1/2 bg-gradient-radial from-black/5 via-gray-100/0 to-white opacity-40 blur-2xl rounded-full" />
      </div>

      <div className="max-w-3xl mx-auto text-center relative z-10">
        <h2 className="text-5xl md:text-6xl font-bold tracking-tight text-gray-900 mb-6 leading-tight">
          Join Us Now
        </h2>
        <p className="text-xl md:text-2xl text-gray-700 mb-10">
          Be part of the future of AI-powered grading. Start in seconds and feel
          the difference.
        </p>
        <a
          href="/signup"
          className="bg-black text-white text-lg md:text-xl px-12 py-4 rounded-full shadow-lg hover:scale-105 hover:shadow-xl transition-transform duration-300 ease-in-out outline-none ring-4 ring-black/30"
        >
          🚀 Get Started
        </a>
      </div>
    </section>
  );
};

export default JoinUsNow;
