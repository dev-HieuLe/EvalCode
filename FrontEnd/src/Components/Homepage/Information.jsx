import {
  ArrowRight,
  BrainCircuit,
  FileText,
  Sliders,
  Download,
  ShieldCheck,
  MessagesSquare,
  BookOpen,
  Zap,
  Heart,
  LayoutDashboard,
} from "lucide-react";

const DISPLAY_FONT = `"Helvetica Now Display", "Inter", "Helvetica", Arial, sans-serif`;

const featureBlocks = [
  {
    icon: BookOpen,
    eyebrow: "BUILD YOUR CLASS",
    title: "Start a workspace built for the way you teach.",
    body: "Spin up assignments, drop in rubrics, and invite your students. Everything you need to run a course lives in one place — no spreadsheets, no email threads, no late nights.",
    cta: "Explore building",
    image: "/demo/demo1.png",
    alt: "EvalCode workspace screenshot",
    bg: "#fbfbf5",
    ink: "#000000",
    sub: "#52525b",
    side: "right",
  },
  {
    icon: Zap,
    eyebrow: "GRADE ANYWHERE",
    title: "Feedback in seconds, not weekends.",
    body: "Drop in student code and our model surfaces strengths, common mistakes, and rubric-aligned scores. You stay in control — review, edit, and send.",
    cta: "See AI grading",
    image: "/demo/demo2.png",
    alt: "EvalCode AI grading interface",
    bg: "#000000",
    ink: "#ffffff",
    sub: "#9dabad",
    side: "left",
  },
  {
    icon: Heart,
    eyebrow: "GIVE BETTER FEEDBACK",
    title: "Comments your students actually read.",
    body: "Tone-aware feedback that reads like a thoughtful TA — not a script. Pick warm, formal, or coaching, and the model matches your voice.",
    cta: "Read about feedback",
    image:
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=1400&q=80",
    alt: "A library with books",
    bg: "#d4f9e0",
    ink: "#000000",
    sub: "#3f3f46",
    side: "right",
  },
];

const dashboardBlock = {
  icon: LayoutDashboard,
  eyebrow: "MANAGE EVERYTHING",
  title: "One dashboard. Every cohort.",
  body: "Track progress across classes, export gradebooks as PDF, and keep a paper trail of every AI-assisted decision. Built for departments and individual teachers alike.",
  cta: "See the dashboard",
  image: "/demo/demo3.png",
  alt: "EvalCode dashboard view",
  bg: "#ffffff",
  ink: "#000000",
  sub: "#52525b",
  side: "left",
};

const toolFeatures = [
  {
    icon: BrainCircuit,
    title: "AI feedback drafts",
    body: "Rubric-aligned comments generated in seconds. You review, edit, and send.",
  },
  {
    icon: Sliders,
    title: "Tunable tone",
    body: "Warm, formal, or coaching. The model matches the voice you teach in.",
  },
  {
    icon: FileText,
    title: "Batch workspaces",
    body: "Group submissions by class or assignment. Switch between cohorts in one click.",
  },
  {
    icon: MessagesSquare,
    title: "Built-in assistant",
    body: "Ask Eval AI about a student’s code or your rubric without leaving the page.",
  },
  {
    icon: Download,
    title: "PDF exports",
    body: "Export gradebooks and per-student reports for archives, parents, or registrars.",
  },
  {
    icon: ShieldCheck,
    title: "You stay in control",
    body: "Every AI suggestion is editable. Nothing leaves your account without your approval.",
  },
];

const FeatureBand = ({ block }) => {
  const Icon = block.icon;
  return (
  <section
    style={{
      background: block.bg,
      color: block.ink,
      paddingTop: 128,
      paddingBottom: 128,
    }}
  >
    <div className="max-w-[1600px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
      <div
        data-aos={block.side === "right" ? "fade-up-right" : "fade-up-left"}
        data-aos-duration="900"
        className={block.side === "right" ? "lg:order-1" : "lg:order-2"}
      >
        <span
          className="inline-flex items-center gap-2 uppercase mb-6"
          style={{
            color: block.sub,
            fontSize: 12,
            fontWeight: 400,
            letterSpacing: "0.72px",
          }}
        >
          {Icon && <Icon className="w-3.5 h-3.5" />}
          {block.eyebrow}
        </span>
        <h2
          style={{
            fontFamily: DISPLAY_FONT,
            fontSize: "clamp(40px, 5vw, 55px)",
            fontWeight: 330,
            lineHeight: 1.16,
            color: block.ink,
          }}
        >
          {block.title}
        </h2>
        <p
          className="mt-8 max-w-xl"
          style={{
            fontSize: 18,
            fontWeight: 550,
            lineHeight: 1.56,
            color: block.ink,
          }}
        >
          {block.body}
        </p>
        <a
          href="#"
          className="inline-flex items-center gap-2 mt-8"
          style={{
            color: block.ink,
            fontSize: 16,
            fontWeight: 550,
            textDecoration: "underline",
            textUnderlineOffset: "4px",
          }}
        >
          {block.cta}
          <ArrowRight className="w-4 h-4" />
        </a>
      </div>

      <div
        data-aos="zoom-in-up"
        data-aos-delay="120"
        data-aos-duration="1000"
        className={block.side === "right" ? "lg:order-2" : "lg:order-1"}
        style={{
          background: "#0a0a0a",
          borderRadius: 20,
          overflow: "hidden",
          aspectRatio: "4 / 3",
        }}
      >
        <img
          src={block.image}
          alt={block.alt}
          className="w-full h-full object-cover block"
        />
      </div>
    </div>
  </section>
  );
};

const Information = () => {
  return (
    <>
      {featureBlocks.map((block, i) => (
        <FeatureBand key={i} block={block} />
      ))}

      {/* Every tool you need to grade smarter */}
      <section
        style={{
          background: "#fbfbf5",
          color: "#000000",
          paddingTop: 128,
          paddingBottom: 128,
        }}
      >
        <div className="max-w-[1600px] mx-auto px-6 md:px-12">
          <div className="max-w-3xl">
            <span
              data-aos="fade-up"
              className="inline-block uppercase mb-6"
              style={{
                color: "#52525b",
                fontSize: 12,
                fontWeight: 400,
                letterSpacing: "0.72px",
              }}
            >
              What’s in EvalCode
            </span>
            <h2
              data-aos="fade-up"
              data-aos-delay="80"
              style={{
                fontFamily: DISPLAY_FONT,
                fontSize: "clamp(40px, 6vw, 55px)",
                fontWeight: 330,
                lineHeight: 1.16,
              }}
            >
              Every tool you need to grade smarter.
            </h2>
            <p
              data-aos="fade-up"
              data-aos-delay="160"
              className="mt-6 max-w-xl"
              style={{
                fontSize: 18,
                fontWeight: 550,
                lineHeight: 1.56,
                color: "#000000",
              }}
            >
              One workspace for assignments, rubrics, AI feedback, and
              gradebook exports — designed end-to-end for educators.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {toolFeatures.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <div
                  key={i}
                  data-aos="fade-up"
                  data-aos-delay={80 * (i % 3)}
                  style={{
                    background: "#ffffff",
                    color: "#000000",
                    borderRadius: 12,
                    padding: 32,
                    boxShadow:
                      "0 8px 8px rgba(0,0,0,0.06), 0 4px 4px rgba(0,0,0,0.06), 0 2px 2px rgba(0,0,0,0.06), 0 0 0 1px rgba(0,0,0,0.06)",
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
                    {feature.title}
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
                    {feature.body}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* One dashboard. Every cohort. — moved below the tool mosaic */}
      <FeatureBand block={dashboardBlock} />
    </>
  );
};

export default Information;
