import {
  ClipboardCheck,
  Sliders,
  Sparkles,
  ArrowRight,
} from "lucide-react";

const DISPLAY_FONT = `"Helvetica Now Display", "Inter", "Helvetica", Arial, sans-serif`;

const steps = [
  {
    number: "01",
    icon: ClipboardCheck,
    title: "Paste student code",
    description:
      "Drop a submission into the grading workspace. Plain text, file upload, or paste from anywhere — we keep your formatting.",
  },
  {
    number: "02",
    icon: Sliders,
    title: "Choose your grading style",
    description:
      "Set the rubric, the tone, and the depth of feedback. Score-only, comment-only, or full rewrite suggestions — your call.",
  },
  {
    number: "03",
    icon: Sparkles,
    title: "Review the AI feedback",
    description:
      "Get structured, rubric-aligned feedback in seconds. Edit, finalize, and send — every grade is yours, AI just does the draft.",
  },
];

const Tutorial = () => {
  return (
    <section
      id="how-it-works"
      style={{
        background: "#000000",
        color: "#ffffff",
        paddingTop: 128,
        paddingBottom: 128,
      }}
    >
      <div className="max-w-[1600px] mx-auto px-6 md:px-12">
        <span
          data-aos="fade-down"
          data-aos-duration="600"
          className="inline-flex items-center gap-2 uppercase mb-6"
          style={{
            color: "#9dabad",
            fontSize: 12,
            fontWeight: 400,
            letterSpacing: "0.72px",
          }}
        >
          <Sparkles className="w-3.5 h-3.5" style={{ color: "#c1fbd4" }} />
          How it works
        </span>

        <h2
          data-aos="fade-up-right"
          data-aos-duration="900"
          className="max-w-5xl"
          style={{
            fontFamily: DISPLAY_FONT,
            fontSize: "clamp(48px, 7vw, 70px)",
            fontWeight: 330,
            lineHeight: 1.0,
            color: "#ffffff",
          }}
        >
          From submission to feedback in three steps.
        </h2>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <div
                key={i}
                data-aos="flip-up"
                data-aos-delay={140 * i}
                data-aos-duration="800"
                style={{
                  background: "#0a0a0a",
                  color: "#ffffff",
                  borderRadius: 12,
                  padding: 32,
                  border: "1px solid #1e2c31",
                  boxShadow:
                    "0 1px 2px rgba(255,255,255,0.05), inset 0 1px 0 rgba(255,255,255,0.04)",
                }}
              >
                <div className="flex items-center justify-between">
                  <div
                    style={{
                      fontFamily: DISPLAY_FONT,
                      color: "#9dabad",
                      fontSize: 48,
                      fontWeight: 330,
                      lineHeight: 1.14,
                    }}
                  >
                    {step.number}
                  </div>
                  <div
                    className="flex items-center justify-center"
                    style={{
                      width: 44,
                      height: 44,
                      background: "#c1fbd4",
                      borderRadius: 9999,
                      color: "#000000",
                    }}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                </div>
                <h3
                  className="mt-6"
                  style={{
                    fontFamily: DISPLAY_FONT,
                    fontSize: 24,
                    fontWeight: 400,
                    letterSpacing: "0.36px",
                    lineHeight: 1.14,
                  }}
                >
                  {step.title}
                </h3>
                <p
                  className="mt-4"
                  style={{
                    color: "#a1a1aa",
                    fontSize: 16,
                    fontWeight: 420,
                    lineHeight: 1.5,
                  }}
                >
                  {step.description}
                </p>
                <div
                  className="mt-6 inline-flex items-center gap-1"
                  style={{
                    color: "#c1fbd4",
                    fontSize: 13,
                    fontWeight: 500,
                    letterSpacing: "-0.13px",
                  }}
                >
                  Step {i + 1}
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Tutorial;
