import { ArrowRight } from "lucide-react";

const DISPLAY_FONT = `"Helvetica Now Display", "Inter", "Helvetica", Arial, sans-serif`;

function Reviews() {
  return (
    <section
      id="reviews"
      style={{
        background: "#fbfbf5",
        color: "#000000",
        paddingTop: 128,
        paddingBottom: 128,
        minHeight: "100vh",
      }}
    >
      <div className="max-w-[1280px] mx-auto px-6 md:px-12">
        <span
          className="inline-block uppercase mb-6"
          style={{
            fontSize: 12,
            fontWeight: 400,
            letterSpacing: "0.72px",
            color: "#52525b",
          }}
        >
          Reviews
        </span>
        <h1
          className="max-w-3xl"
          style={{
            fontFamily: DISPLAY_FONT,
            fontSize: "clamp(40px, 6vw, 55px)",
            fontWeight: 330,
            lineHeight: 1.16,
          }}
        >
          We’re just getting started.
        </h1>
        <p
          className="mt-6 max-w-xl"
          style={{ fontSize: 18, fontWeight: 550, lineHeight: 1.56 }}
        >
          EvalCode is new. We haven’t collected reviews from classrooms yet —
          we wanted to ship the product to early educators first and let them
          shape what comes next.
        </p>
        <p
          className="mt-4 max-w-xl"
          style={{
            fontSize: 16,
            fontWeight: 420,
            lineHeight: 1.5,
            color: "#52525b",
          }}
        >
          If you’re an educator trying EvalCode, we’d love to hear your
          honest experience — what works, what doesn’t, and what we should
          build next.
        </p>

        <div className="mt-12 flex flex-wrap gap-3">
          <a
            href="/signup"
            className="inline-flex items-center gap-2"
            style={{
              background: "#000000",
              color: "#ffffff",
              borderRadius: 9999,
              padding: "12px 24px",
              fontSize: 16,
              fontWeight: 550,
              textDecoration: "none",
            }}
          >
            Start free trial
            <ArrowRight className="w-4 h-4" />
          </a>
          <a
            href="mailto:hello@evalcode.app"
            className="inline-flex items-center gap-2"
            style={{
              background: "#ffffff",
              color: "#000000",
              border: "1px solid #000000",
              borderRadius: 9999,
              padding: "12px 24px",
              fontSize: 16,
              fontWeight: 550,
              textDecoration: "none",
            }}
          >
            Send us feedback
          </a>
        </div>
      </div>
    </section>
  );
}

export default Reviews;
