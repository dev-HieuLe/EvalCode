import { ArrowRight, BookOpen, Lock, PenLine, Sparkles } from "lucide-react";

const DISPLAY_FONT = `"Helvetica Now Display", "Inter", "Helvetica", Arial, sans-serif`;

const values = [
  {
    icon: PenLine,
    title: "Educators in control",
    body: "AI drafts the feedback. You decide what reaches the student. Every grade is yours.",
  },
  {
    icon: Sparkles,
    title: "Draft, don’t replace",
    body: "We build tools that save time on the first 80% so you can spend yours on the last 20% that actually teaches.",
  },
  {
    icon: Lock,
    title: "Honest by default",
    body: "We don’t fabricate stats, fake reviews, or invent customer logos. If we haven’t earned something yet, we don’t claim it.",
  },
  {
    icon: BookOpen,
    title: "Built with classrooms",
    body: "We’re shaping EvalCode alongside the educators trying it. Your feedback writes the next version.",
  },
];

const About = () => {
  return (
    <>
      {/* Cinematic hero */}
      <section style={{ background: "#000000", color: "#ffffff" }}>
        <div
          className="max-w-[1600px] mx-auto px-6 md:px-12"
          style={{ paddingTop: 128, paddingBottom: 96 }}
        >
          <span
            data-aos="fade-up"
            className="inline-block uppercase mb-8"
            style={{
              color: "#9dabad",
              fontSize: 12,
              fontWeight: 400,
              letterSpacing: "0.72px",
            }}
          >
            About EvalCode
          </span>
          <h1
            data-aos="fade-up"
            data-aos-delay="80"
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
            Grading shouldn’t take all weekend.
          </h1>
          <p
            data-aos="fade-up"
            data-aos-delay="160"
            className="mt-10 max-w-2xl"
            style={{
              fontSize: 18,
              fontWeight: 550,
              lineHeight: 1.56,
              color: "#ffffff",
            }}
          >
            EvalCode is a workspace for educators who want to give better
            feedback in less time — with AI that drafts, and humans that
            decide.
          </p>
        </div>

        {/* Full-width student-coding photo with rounded top + overlay copy */}
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
            src="https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=2400&q=80"
            alt="Students working on code together"
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
                data-aos="fade-up"
                data-aos-delay="120"
                className="inline-block uppercase mb-4"
                style={{
                  color: "#c1fbd4",
                  fontSize: 12,
                  fontWeight: 400,
                  letterSpacing: "0.72px",
                }}
              >
                Why we build
              </span>
              <h2
                data-aos="fade-up"
                data-aos-delay="200"
                className="max-w-3xl"
                style={{
                  fontFamily: DISPLAY_FONT,
                  fontSize: "clamp(32px, 5vw, 55px)",
                  fontWeight: 330,
                  lineHeight: 1.05,
                  color: "#ffffff",
                }}
              >
                Less grading. More teaching.
              </h2>
              <p
                data-aos="fade-up"
                data-aos-delay="280"
                className="mt-4 max-w-xl"
                style={{
                  fontSize: 16,
                  fontWeight: 550,
                  lineHeight: 1.5,
                  color: "#ffffff",
                }}
              >
                We’re building EvalCode for the part of the job you love —
                so the part you don’t can stop eating your weekends.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why we're building this */}
      <section
        style={{
          background: "#fbfbf5",
          color: "#000000",
          paddingTop: 128,
          paddingBottom: 128,
        }}
      >
        <div
          className="max-w-[1280px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12"
        >
          <div className="lg:col-span-4">
            <span
              className="inline-block uppercase mb-6"
              style={{
                color: "#52525b",
                fontSize: 12,
                fontWeight: 400,
                letterSpacing: "0.72px",
              }}
            >
              Why we’re building this
            </span>
          </div>
          <div className="lg:col-span-8 space-y-6">
            <h2
              style={{
                fontFamily: DISPLAY_FONT,
                fontSize: "clamp(36px, 5vw, 48px)",
                fontWeight: 330,
                lineHeight: 1.14,
              }}
            >
              Teachers spend hours grading code. Students wait days for
              feedback. Neither is the part of teaching anyone signed up for.
            </h2>
            <p
              style={{
                fontSize: 18,
                fontWeight: 550,
                lineHeight: 1.56,
                color: "#000000",
              }}
            >
              EvalCode exists to compress that loop. Drop in a submission,
              get a rubric-aligned draft in seconds, edit it in your own
              voice, and send. The model handles the grind; you keep the
              judgment.
            </p>
            <p
              style={{
                color: "#52525b",
                fontSize: 16,
                fontWeight: 420,
                lineHeight: 1.5,
              }}
            >
              We’re early. The product is shipping, the docs are growing, and
              the roadmap is being shaped by the educators using it this
              semester. If that’s you, hello — we’re listening.
            </p>
          </div>
        </div>
      </section>

      {/* What we believe */}
      <section
        style={{
          background: "#ffffff",
          color: "#000000",
          paddingTop: 128,
          paddingBottom: 128,
        }}
      >
        <div className="max-w-[1600px] mx-auto px-6 md:px-12">
          <span
            className="inline-block uppercase mb-6"
            style={{
              color: "#52525b",
              fontSize: 12,
              fontWeight: 400,
              letterSpacing: "0.72px",
            }}
          >
            What we believe
          </span>
          <h2
            className="max-w-4xl"
            style={{
              fontFamily: DISPLAY_FONT,
              fontSize: "clamp(40px, 6vw, 55px)",
              fontWeight: 330,
              lineHeight: 1.16,
            }}
          >
            A few principles we won’t bend.
          </h2>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6">
            {values.map((value, i) => {
              const Icon = value.icon;
              return (
                <div
                  key={i}
                  style={{
                    background: "#fbfbf5",
                    color: "#000000",
                    borderRadius: 12,
                    padding: 32,
                    border: "1px solid #e4e4e7",
                  }}
                >
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
                    {value.title}
                  </h3>
                  <p
                    className="mt-3"
                    style={{
                      color: "#52525b",
                      fontSize: 16,
                      fontWeight: 420,
                      lineHeight: 1.5,
                    }}
                  >
                    {value.body}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section
        style={{
          background: "#000000",
          color: "#ffffff",
          paddingTop: 128,
          paddingBottom: 128,
        }}
      >
        <div className="max-w-[1600px] mx-auto px-6 md:px-12">
          <h2
            className="max-w-4xl"
            style={{
              fontFamily: DISPLAY_FONT,
              fontSize: "clamp(48px, 7vw, 70px)",
              fontWeight: 330,
              lineHeight: 1.0,
              color: "#ffffff",
            }}
          >
            Try the early version. Tell us what to fix.
          </h2>
          <p
            className="mt-8 max-w-xl"
            style={{
              fontSize: 18,
              fontWeight: 550,
              lineHeight: 1.56,
              color: "#ffffff",
            }}
          >
            EvalCode is free to try for 30 days. The roadmap follows the
            people who actually use it.
          </p>
          <div className="mt-12 flex flex-wrap gap-3">
            <a
              href="/signup"
              className="inline-flex items-center gap-2"
              style={{
                background: "#ffffff",
                color: "#000000",
                borderRadius: 9999,
                padding: "14px 24px",
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
                background: "#000000",
                color: "#ffffff",
                border: "2px solid #ffffff",
                borderRadius: 9999,
                padding: "12px 22px",
                fontSize: 16,
                fontWeight: 420,
                textDecoration: "none",
              }}
            >
              Send us feedback
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
