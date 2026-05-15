import {
  BrainCircuit,
  FileText,
  Sliders,
  Download,
  ShieldCheck,
  MessagesSquare,
} from "lucide-react";

const DISPLAY_FONT = `"Helvetica Now Display", "Inter", "Helvetica", Arial, sans-serif`;

const features = [
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

function Testimonial() {
  return (
    <section
      id="features"
      style={{
        background: "#fbfbf5",
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
          What’s in EvalCode
        </span>
        <h2
          className="max-w-4xl"
          style={{
            fontFamily: DISPLAY_FONT,
            fontSize: "clamp(40px, 6vw, 55px)",
            fontWeight: 330,
            lineHeight: 1.16,
            color: "#000000",
          }}
        >
          Every tool you need to grade smarter.
        </h2>
        <p
          className="mt-6 max-w-xl"
          style={{
            fontSize: 18,
            fontWeight: 550,
            lineHeight: 1.56,
            color: "#000000",
          }}
        >
          One workspace for assignments, rubrics, AI feedback, and gradebook
          exports — designed end-to-end for educators.
        </p>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <div
                key={i}
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
  );
}

export default Testimonial;
