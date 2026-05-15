import { useState } from "react";
import { ArrowRight, Sparkles, Code2, Terminal, Zap } from "lucide-react";

const DISPLAY_FONT = `"Helvetica Now Display", "Inter", "Helvetica", Arial, sans-serif`;

const Hero = () => {
  const [email, setEmail] = useState("");

  return (
    <section style={{ background: "#000000", color: "#ffffff" }}>
      <div
        className="max-w-[1600px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
        style={{ paddingTop: 96, paddingBottom: 96, minHeight: "80vh" }}
      >
        {/* Left: Copy */}
        <div className="max-w-2xl">
          <span
            data-aos="fade-down"
            data-aos-duration="600"
            className="inline-flex items-center gap-2 uppercase mb-6"
            style={{
              color: "#9dabad",
              fontSize: 12,
              fontWeight: 400,
              letterSpacing: "0.72px",
              lineHeight: 1.2,
            }}
          >
            <Sparkles className="w-3.5 h-3.5" style={{ color: "#c1fbd4" }} />
            New · AI grading for educators
          </span>

          <h1
            data-aos="fade-up-right"
            data-aos-duration="900"
            style={{
              fontFamily: DISPLAY_FONT,
              fontWeight: 330,
              fontSize: "clamp(48px, 7vw, 96px)",
              lineHeight: 1.0,
              letterSpacing: "1.6px",
              color: "#ffffff",
            }}
          >
            The platform classrooms are built on.
          </h1>

          <p
            data-aos="fade-up"
            data-aos-delay="220"
            className="mt-8 max-w-lg"
            style={{
              fontSize: 18,
              fontWeight: 550,
              lineHeight: 1.56,
              color: "#ffffff",
            }}
          >
            Build, grade, and give feedback at speed. EvalCode gives
            educators an AI-powered workspace for the modern classroom.
          </p>

          {/* Email signup */}
          <form
            data-aos="zoom-in-up"
            data-aos-delay="340"
            data-aos-duration="700"
            className="mt-10 flex flex-wrap items-center gap-2 max-w-lg"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              style={{
                flex: 1,
                minWidth: 240,
                background: "#0a0a0a",
                color: "#ffffff",
                border: "1px solid #1e2c31",
                borderRadius: 9999,
                padding: "14px 22px",
                fontSize: 16,
                fontWeight: 420,
                outline: "none",
              }}
            />
            <button
              type="submit"
              className="inline-flex items-center gap-2"
              style={{
                background: "#ffffff",
                color: "#000000",
                borderRadius: 9999,
                padding: "14px 24px",
                fontSize: 16,
                fontWeight: 550,
                border: "none",
              }}
            >
              Start free trial
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <p
            data-aos="fade-up"
            data-aos-delay="320"
            className="mt-4"
            style={{
              color: "#9dabad",
              fontSize: 13,
              fontWeight: 500,
              letterSpacing: "-0.13px",
            }}
          >
            Try EvalCode free for 30 days. No credit card required.
          </p>
        </div>

        {/* Right: Photography */}
        <div
          data-aos="zoom-in-up"
          data-aos-delay="200"
          data-aos-duration="1000"
          style={{
            background: "#0a0a0a",
            borderRadius: 20,
            overflow: "hidden",
            position: "relative",
            aspectRatio: "4 / 5",
          }}
        >
          <img
            src="https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&w=1400&q=80"
            alt="Educator working on a laptop"
            className="w-full h-full object-cover block"
          />
        </div>
      </div>

      {/* Bottom: full-width student-coding photo with rounded top + overlay copy */}
      <div
        data-aos="fade-up"
        style={{
          position: "relative",
          background: "#0a0a0a",
          overflow: "hidden",
          borderTopLeftRadius: 32,
          borderTopRightRadius: 32,
        }}
      >
        <img
          src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=2400&q=80"
          alt="Students learning to code together"
          className="w-full h-[360px] md:h-[480px] object-cover block"
          style={{ opacity: 0.85 }}
        />

        {/* Dark gradient for legibility */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.25) 45%, rgba(0,0,0,0.75) 100%)",
            pointerEvents: "none",
          }}
        />

        {/* Overlay copy */}
        <div
          className="absolute inset-0 flex items-end"
          style={{ pointerEvents: "none" }}
        >
          <div className="max-w-[1600px] w-full mx-auto px-6 md:px-12 pb-10 md:pb-16">
            <span
              data-aos="fade-right"
              data-aos-duration="700"
              className="inline-flex items-center gap-2 uppercase mb-4"
              style={{
                color: "#c1fbd4",
                fontSize: 12,
                fontWeight: 400,
                letterSpacing: "0.72px",
              }}
            >
              <Terminal className="w-3.5 h-3.5" />
              Built for learners
            </span>
            <h2
              data-aos="fade-up"
              data-aos-delay="120"
              data-aos-duration="900"
              className="max-w-3xl"
              style={{
                fontFamily: DISPLAY_FONT,
                fontSize: "clamp(32px, 5vw, 55px)",
                fontWeight: 330,
                lineHeight: 1.05,
                color: "#ffffff",
              }}
            >
              Where students learn to ship code.
            </h2>
            <p
              data-aos="fade-up"
              data-aos-delay="240"
              className="mt-4 max-w-xl"
              style={{
                fontSize: 16,
                fontWeight: 550,
                lineHeight: 1.5,
                color: "#ffffff",
              }}
            >
              Real submissions, rubric-aligned feedback, and a clearer path
              from first draft to clean code.
            </p>

            {/* Tiny stat row with icons */}
            <div
              data-aos="fade-up"
              data-aos-delay="360"
              data-aos-duration="700"
              className="mt-8 flex flex-wrap gap-x-8 gap-y-3"
              style={{
                color: "#ffffff",
                fontSize: 13,
                fontWeight: 500,
                letterSpacing: "-0.13px",
              }}
            >
              <span className="inline-flex items-center gap-2">
                <Zap className="w-4 h-4" style={{ color: "#c1fbd4" }} />
                Feedback in seconds
              </span>
              <span className="inline-flex items-center gap-2">
                <Code2 className="w-4 h-4" style={{ color: "#c1fbd4" }} />
                5 languages supported
              </span>
              <span className="inline-flex items-center gap-2">
                <Sparkles className="w-4 h-4" style={{ color: "#c1fbd4" }} />
                Tunable AI tone
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
