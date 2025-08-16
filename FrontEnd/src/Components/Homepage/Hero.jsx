import { useState, React } from "react";
import { PlayCircle } from "lucide-react";

const Hero = () => {
  const [showVideo, setShowVideo] = useState(false);
  return (
    <section className="relative bg-white overflow-hidden text-center px-6 py-44">
      {/* Background radial glow */}
      <div className="absolute inset-0 z-0 flex justify-center">
        <div className="h-[1000px] w-[1000px] rounded-full bg-[#e8e1ff] opacity-40 blur-3xl" />
      </div>

      {/* Main content */}
      <div className="relative z-10">
        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight max-w-4xl mx-auto">
          <span className="relative inline-block">
            Access all your AI tools in
            <img
              src="/YellowLine.png"
              alt="Yellow line"
              className="absolute inset-0 w-full h-full object-cover -z-10"
              style={{
                transform:
                  "rotate(-2deg) scaleX(1.3) scaleY(0.9) translateX(1rem)",
              }}
            />
          </span>
          <br />a single platform
        </h1>

        <p className="text-lg text-gray-600 max-w-xl mx-auto mt-6">
          Foster a collaborative environment where teams can manage
          <br className="hidden md:block" />
          all their ai tools on a unified platform.
        </p>

        <div className="mt-10 flex justify-center gap-4 flex-wrap">
          <button
            onClick={() => setShowVideo(true)}
            className="inline-flex items-center gap-2 bg-white hover:bg-gray-200 text-gray-900 px-6 py-3 rounded-full font-medium shadow-md transition duration-200 group"
          >
            <PlayCircle className="w-6 h-6 transition-transform duration-200 group-hover:scale-110" />
            See how it works
          </button>

          <button className="inline-flex items-center gap-2 text-white bg-gradient-to-r from-neutral-800 to-black hover:opacity-90 px-6 py-3 rounded-full font-medium shadow-md transition">
            Start for free
          </button>
          {showVideo && (
            <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center">
              <div className="relative w-full max-w-4xl aspect-video px-4">
                <iframe
                  className="w-full h-full rounded-lg"
                  src="https://www.youtube.com/embed/Scxs7L0vhZ4?autoplay=1"
                  title="Tutorial how to use AI"
                  frameBorder="0"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                ></iframe>
                <button
                  onClick={() => setShowVideo(false)}
                  className="absolute -top-8 right-0 text-white text-lg hover:bg-black/80 px-3 py-1 rounded-full"
                >
                  ✕
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Screenshot image section */}
        <div className="mt-24 flex justify-center">
          <img
            src="/demo.jpg" // <--- update this to your actual file path
            alt="App screenshot preview"
            className="w-full max-w-5xl rounded-3xl border-gray-100 border-10 shadow-md"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
