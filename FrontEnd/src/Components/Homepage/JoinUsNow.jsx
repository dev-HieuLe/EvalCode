import { useState } from "react";
import { ArrowRight, Sparkles, Rocket, Clock, ShieldCheck } from "lucide-react";

const DISPLAY_FONT = `"Helvetica Now Display", "Inter", "Helvetica", Arial, sans-serif`;

const JoinUsNow = () => {
  const [email, setEmail] = useState("");

  return (
    <section
      style={{
        background: "#000000",
        color: "#ffffff",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background photography layer */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.4,
        }}
      >
        <img
          src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=2400&q=80"
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover block"
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.8) 100%)",
          }}
        />
      </div>

      {/* Content */}
      <div
        className="relative max-w-[1600px] mx-auto px-6 md:px-12"
        style={{ paddingTop: 192, paddingBottom: 192 }}
      >
        <span
          data-aos="fade-down"
          data-aos-duration="600"
          className="inline-flex items-center gap-2 uppercase mb-8"
          style={{
            color: "#c1fbd4",
            fontSize: 12,
            fontWeight: 400,
            letterSpacing: "0.72px",
          }}
        >
          <Sparkles className="w-3.5 h-3.5" />
          Get started
        </span>

        <h2
          data-aos="zoom-in-up"
          data-aos-duration="1000"
          className="max-w-5xl"
          style={{
            fontFamily: DISPLAY_FONT,
            fontSize: "clamp(56px, 9vw, 96px)",
            fontWeight: 330,
            lineHeight: 1.0,
            letterSpacing: "1.6px",
            color: "#ffffff",
          }}
        >
          Build a smarter classroom today.
        </h2>

        <p
          data-aos="fade-up"
          data-aos-delay="160"
          className="mt-10 max-w-xl"
          style={{
            fontSize: 18,
            fontWeight: 550,
            lineHeight: 1.56,
            color: "#ffffff",
          }}
        >
          Be part of the future of AI-powered grading. Start in seconds and
          feel the difference.
        </p>

        <form
          data-aos="fade-up"
          data-aos-delay="240"
          className="mt-12 flex flex-wrap items-center gap-2 max-w-lg"
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
              background: "rgba(10,10,10,0.7)",
              color: "#ffffff",
              border: "1px solid rgba(255,255,255,0.2)",
              borderRadius: 9999,
              padding: "14px 22px",
              fontSize: 16,
              fontWeight: 420,
              outline: "none",
              backdropFilter: "blur(8px)",
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

        {/* Quick-feature trio with icons */}
        <div
          data-aos="fade-up"
          data-aos-delay="320"
          data-aos-duration="700"
          className="mt-16 flex flex-wrap gap-x-10 gap-y-4"
          style={{
            color: "#ffffff",
            fontSize: 14,
            fontWeight: 500,
            letterSpacing: "0.28px",
          }}
        >
          <span className="inline-flex items-center gap-2">
            <Rocket className="w-4 h-4" style={{ color: "#c1fbd4" }} />
            Ship your first graded batch in minutes
          </span>
          <span className="inline-flex items-center gap-2">
            <Clock className="w-4 h-4" style={{ color: "#c1fbd4" }} />
            Reclaim your evenings
          </span>
          <span className="inline-flex items-center gap-2">
            <ShieldCheck className="w-4 h-4" style={{ color: "#c1fbd4" }} />
            You stay in control
          </span>
        </div>
      </div>
    </section>
  );
};

export default JoinUsNow;
