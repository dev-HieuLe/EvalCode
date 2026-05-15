import { useMemo, useState } from "react";
import {
  Rocket,
  Wrench,
  BrainCircuit,
  CreditCard,
  Bug,
  ShieldCheck,
  Mail,
  MessageCircle,
  Search,
  ChevronDown,
  ArrowRight,
  Check,
} from "lucide-react";

const DISPLAY_FONT = `"Helvetica Now Display", "Inter", "Helvetica", Arial, sans-serif`;

const CATEGORIES = [
  { id: "all", label: "All topics", icon: null },
  { id: "getting-started", label: "Getting started", icon: Rocket },
  { id: "workspace", label: "Workspace", icon: Wrench },
  { id: "ai", label: "AI & grading", icon: BrainCircuit },
  { id: "billing", label: "Account & billing", icon: CreditCard },
  { id: "bugs", label: "Issues & bugs", icon: Bug },
  { id: "privacy", label: "Privacy & data", icon: ShieldCheck },
];

const ARTICLES = [
  // Getting started
  {
    id: "create-first-batch",
    category: "getting-started",
    title: "Create your first batch",
    keywords: "batch new grading start workspace",
    body: [
      "After signing in, click the New grading button at the top of the sidebar. EvalCode opens a fresh batch with default rubric settings so you can start adding students right away.",
      "Each batch is a self-contained workspace — its own students, rubric, language, and feedback tone. Most teachers create one batch per assignment, but you can also use one batch per class or per cohort.",
      "Switch to the Configuration tab inside the batch to set the assignment title, instructions, total points, and grading criteria before you grade.",
    ],
  },
  {
    id: "add-students",
    category: "getting-started",
    title: "Add students to a batch",
    keywords: "student add submission roster",
    body: [
      "Open a batch, stay on the Submissions tab, and click Add student. Enter the student's name and confirm — they'll appear in the table with an 'Awaiting' status.",
      "You can add students one at a time as their work comes in, or front-load the full roster and grade as submissions arrive.",
    ],
  },
  {
    id: "first-ai-pass",
    category: "getting-started",
    title: "Run your first AI grading pass",
    keywords: "ai grade feedback first run",
    body: [
      "Click Grade next to a student to open the grading workspace. Paste the student's code on the left, then press Generate AI feedback. Within a few seconds you'll see structured comments aligned to your rubric.",
      "Review the suggestion, edit anything that doesn't match your voice, set the numeric grade, and click Finalize and save grade. The student's row updates to 'Graded' in the table.",
    ],
  },

  // Workspace
  {
    id: "what-is-a-batch",
    category: "workspace",
    title: "What is a batch?",
    keywords: "batch definition concept assignment",
    body: [
      "A batch is one grading workspace. It groups a list of students, an assignment configuration, a rubric, and a feedback tone together.",
      "Batches keep work separated — grading style for an intro Python class can differ from an advanced data-structures course, and you don't want them mixing.",
    ],
  },
  {
    id: "switch-batches",
    category: "workspace",
    title: "Switch between batches",
    keywords: "switch select batch sidebar",
    body: [
      "All your batches appear in the left sidebar. Click any batch to load it. The currently active batch is highlighted with a soft white pill.",
      "If you have many batches, the list scrolls. We're working on search and tagging in a future release.",
    ],
  },
  {
    id: "delete-batch",
    category: "workspace",
    title: "Delete a batch",
    keywords: "delete remove batch trash",
    body: [
      "Hover the batch in the sidebar and click the trash icon. You'll be asked to confirm — once confirmed, the batch and all its student records are removed from your account.",
      "Deletion is not currently reversible. Export the gradebook as PDF first if you might need it later.",
    ],
  },
  {
    id: "export-gradebook",
    category: "workspace",
    title: "Export a gradebook to PDF",
    keywords: "export pdf gradebook report download",
    body: [
      "At the bottom of any batch dashboard you'll see Export PDF report. Click it and EvalCode generates a PDF containing the student list, status, grade, and a snapshot of the rubric.",
      "Use these exports for registrars, parents, or as a paper trail for any AI-assisted grades you finalized.",
    ],
  },

  // AI
  {
    id: "how-ai-works",
    category: "ai",
    title: "How AI grading works",
    keywords: "ai how works model grading generate",
    body: [
      "When you click Generate AI feedback, EvalCode sends the student's code along with your rubric and tone settings to our model. The model returns a structured response: strengths, common mistakes, rubric-aligned scoring notes, and concrete suggestions.",
      "You always see the draft before anything is saved. Nothing gets sent to the student until you click Finalize and save grade.",
    ],
  },
  {
    id: "tune-feedback-tone",
    category: "ai",
    title: "Customize the feedback tone",
    keywords: "tone feedback voice style customize",
    body: [
      "In the batch Configuration tab, set Feedback tone to Friendly, Formal, Constructive, or Encouraging. The model rewrites comments to match.",
      "If none of the presets feel right, edit the AI draft directly — your edits don't get overwritten on the next regenerate.",
    ],
  },
  {
    id: "edit-ai-feedback",
    category: "ai",
    title: "Edit AI feedback before sending",
    keywords: "edit ai feedback override modify",
    body: [
      "AI-generated feedback is just a draft. The Feedback box on the grading page is editable — change wording, add context, remove sections, do whatever you need.",
      "Your edits are saved with the student record when you click Finalize and save grade.",
    ],
  },
  {
    id: "supported-languages",
    category: "ai",
    title: "Supported programming languages",
    keywords: "language python javascript java c++ c support",
    body: [
      "EvalCode currently supports Python, JavaScript, Java, C, and C++ as first-class languages — set the language in the batch Configuration tab.",
      "Other languages work for plain code review (the model still reads the code), but rubric-specific suggestions are tuned for the five above.",
    ],
  },

  // Billing
  {
    id: "how-credits-work",
    category: "billing",
    title: "How credits work",
    keywords: "credits cost pricing tokens balance",
    body: [
      "Every AI feedback generation costs one credit. Free plans include 20 credits per month, Basic includes 400, and Pro is unlimited.",
      "Your remaining credit balance shows at the bottom of the sidebar. Credits reset on your billing date and don't roll over.",
    ],
  },
  {
    id: "upgrade-plan",
    category: "billing",
    title: "Upgrade or downgrade your plan",
    keywords: "upgrade downgrade plan change subscription",
    body: [
      "Open the account menu in the bottom-left of the dashboard and click Upgrade plan. Pick a new tier — your card is charged the prorated difference immediately, and your credit balance lifts to match the new tier.",
      "Downgrades take effect at the start of your next billing cycle so you keep what you've paid for.",
    ],
  },
  {
    id: "cancel-subscription",
    category: "billing",
    title: "Cancel your subscription",
    keywords: "cancel subscription stop plan",
    body: [
      "Open the account menu, choose Settings → Billing, and click Cancel plan. Your paid features stay active through the end of the current billing period; after that, your workspace drops to the Free tier.",
      "Cancellation doesn't delete your data — your batches and gradebooks stay accessible.",
    ],
  },

  // Bugs
  {
    id: "report-bug",
    category: "bugs",
    title: "Report a bug or share feedback",
    keywords: "bug issue report feedback problem broken",
    body: [
      "Use the contact form below or email hello@evalcode.app. Include what you were doing, what you expected, and what actually happened — screenshots are great when something looks wrong.",
      "While the team is small, every report gets a human reply. We typically respond within one business day.",
    ],
  },
  {
    id: "recover-access",
    category: "bugs",
    title: "I lost access to my account",
    keywords: "lost access account locked password recover",
    body: [
      "If your password isn't working, use the Forgot password link on the login page to reset by email.",
      "If you've lost access to the email address itself, write to hello@evalcode.app from another address you control and explain the situation — we'll help verify and restore access manually.",
    ],
  },

  // Privacy
  {
    id: "what-we-store",
    category: "privacy",
    title: "What we store and for how long",
    keywords: "data store privacy retention what",
    body: [
      "We store your account profile, your batches, student names you've entered, the code you submit for grading, and the AI feedback generated for each submission. We do not sell or share this data with third parties.",
      "Data is retained as long as your account exists. If you delete your account, your records are deleted within 30 days.",
    ],
  },
  {
    id: "delete-account",
    category: "privacy",
    title: "Delete your account and data",
    keywords: "delete account remove data gdpr",
    body: [
      "Email hello@evalcode.app from the address on your account and request deletion. We'll confirm, then remove your account and all associated records within 30 days.",
      "If you only want to remove specific data — say, one student's submission — you can delete it directly from the batch dashboard.",
    ],
  },
];

const Support = () => {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [openArticle, setOpenArticle] = useState(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    category: "",
    subject: "",
    message: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const filteredArticles = useMemo(() => {
    const q = search.trim().toLowerCase();
    return ARTICLES.filter((article) => {
      if (activeCategory !== "all" && article.category !== activeCategory) {
        return false;
      }
      if (!q) return true;
      const haystack = [
        article.title,
        article.keywords,
        article.body.join(" "),
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [search, activeCategory]);

  const handleFormChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setFormErrors((prev) => ({ ...prev, [field]: "" }));
    if (submitted) setSubmitted(false);
  };

  const validateForm = () => {
    const errors = {};
    if (!form.name.trim()) errors.name = "Name is required.";
    if (!form.email.trim()) errors.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      errors.email = "Enter a valid email address.";
    if (!form.subject.trim()) errors.subject = "Subject is required.";
    if (!form.message.trim() || form.message.trim().length < 10)
      errors.message = "Tell us a little more (at least 10 characters).";
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    const categoryLabel =
      CATEGORIES.find((c) => c.id === form.category)?.label || "General";

    const bodyLines = [
      `From: ${form.name} <${form.email}>`,
      `Category: ${categoryLabel}`,
      "",
      form.message,
    ];

    const mailto = `mailto:hello@evalcode.app?subject=${encodeURIComponent(
      `[Support] ${form.subject}`
    )}&body=${encodeURIComponent(bodyLines.join("\n"))}`;

    window.location.href = mailto;
    setSubmitted(true);
  };

  return (
    <>
      {/* Header + search */}
      <section
        style={{
          background: "#fbfbf5",
          color: "#000000",
          paddingTop: 128,
          paddingBottom: 48,
        }}
      >
        <div className="max-w-[1280px] mx-auto px-6 md:px-12">
          <span
            className="inline-block uppercase mb-6"
            style={{
              color: "#52525b",
              fontSize: 12,
              fontWeight: 400,
              letterSpacing: "0.72px",
            }}
          >
            Support
          </span>
          <h1
            className="max-w-3xl"
            style={{
              fontFamily: DISPLAY_FONT,
              fontSize: "clamp(48px, 7vw, 70px)",
              fontWeight: 330,
              lineHeight: 1.0,
            }}
          >
            How can we help?
          </h1>
          <p
            className="mt-8 max-w-xl"
            style={{ fontSize: 18, fontWeight: 550, lineHeight: 1.56 }}
          >
            Search the guides below, or write to a human. We answer every
            message ourselves while the team is small.
          </p>

          {/* Search */}
          <div
            className="mt-10 flex items-center gap-3 max-w-2xl"
            style={{
              background: "#ffffff",
              border: "1px solid #e4e4e7",
              borderRadius: 9999,
              padding: "10px 18px",
              boxShadow:
                "0 8px 8px rgba(0,0,0,0.04), 0 4px 4px rgba(0,0,0,0.04), 0 2px 2px rgba(0,0,0,0.04), 0 0 0 1px rgba(0,0,0,0.04)",
            }}
          >
            <Search className="w-5 h-5" style={{ color: "#52525b" }} />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search help topics..."
              style={{
                flex: 1,
                background: "transparent",
                color: "#000000",
                fontSize: 16,
                fontWeight: 420,
                outline: "none",
                border: "none",
              }}
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                style={{
                  color: "#52525b",
                  fontSize: 13,
                  fontWeight: 500,
                  letterSpacing: "-0.13px",
                }}
              >
                Clear
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Category filter + Article list */}
      <section
        style={{
          background: "#fbfbf5",
          color: "#000000",
          paddingTop: 32,
          paddingBottom: 128,
        }}
      >
        <div className="max-w-[1280px] mx-auto px-6 md:px-12">
          {/* Category pills */}
          <div className="flex flex-wrap gap-2 mb-10">
            {CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              const active = cat.id === activeCategory;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className="inline-flex items-center gap-2"
                  style={{
                    background: active ? "#000000" : "#ffffff",
                    color: active ? "#ffffff" : "#000000",
                    border: active ? "none" : "1px solid #e4e4e7",
                    borderRadius: 9999,
                    padding: "8px 16px",
                    fontSize: 14,
                    fontWeight: 550,
                    letterSpacing: "0.28px",
                  }}
                >
                  {Icon && <Icon className="w-4 h-4" />}
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Article accordion */}
          <div className="space-y-3">
            {filteredArticles.length === 0 ? (
              <div
                style={{
                  background: "#ffffff",
                  border: "1px solid #e4e4e7",
                  borderRadius: 12,
                  padding: 32,
                  color: "#52525b",
                  fontSize: 16,
                  fontWeight: 420,
                  lineHeight: 1.5,
                }}
              >
                No articles match "{search}". Try a different search, or use
                the contact form below to ask us directly.
              </div>
            ) : (
              filteredArticles.map((article) => {
                const isOpen = openArticle === article.id;
                const catLabel =
                  CATEGORIES.find((c) => c.id === article.category)?.label ||
                  "";
                return (
                  <div
                    key={article.id}
                    style={{
                      background: "#ffffff",
                      border: "1px solid #e4e4e7",
                      borderRadius: 12,
                      overflow: "hidden",
                    }}
                  >
                    <button
                      onClick={() =>
                        setOpenArticle(isOpen ? null : article.id)
                      }
                      className="w-full flex items-center justify-between text-left"
                      style={{
                        padding: "20px 24px",
                        background: "transparent",
                        color: "#000000",
                      }}
                    >
                      <div>
                        <div
                          className="uppercase mb-1"
                          style={{
                            color: "#52525b",
                            fontSize: 12,
                            fontWeight: 400,
                            letterSpacing: "0.72px",
                          }}
                        >
                          {catLabel}
                        </div>
                        <div
                          style={{
                            fontFamily: DISPLAY_FONT,
                            fontSize: 20,
                            fontWeight: 500,
                            letterSpacing: "0.3px",
                            lineHeight: 1.4,
                          }}
                        >
                          {article.title}
                        </div>
                      </div>
                      <ChevronDown
                        className="w-5 h-5 flex-shrink-0 ml-4 transition-transform"
                        style={{
                          color: "#52525b",
                          transform: isOpen
                            ? "rotate(180deg)"
                            : "rotate(0deg)",
                        }}
                      />
                    </button>
                    {isOpen && (
                      <div
                        className="space-y-4"
                        style={{
                          padding: "0 24px 24px",
                          borderTop: "1px solid #e4e4e7",
                          paddingTop: 20,
                        }}
                      >
                        {article.body.map((p, i) => (
                          <p
                            key={i}
                            style={{
                              color: "#3f3f46",
                              fontSize: 16,
                              fontWeight: 420,
                              lineHeight: 1.6,
                            }}
                          >
                            {p}
                          </p>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>

          <div
            className="mt-6"
            style={{
              color: "#52525b",
              fontSize: 13,
              fontWeight: 500,
              letterSpacing: "-0.13px",
            }}
          >
            Showing {filteredArticles.length} of {ARTICLES.length} articles
          </div>
        </div>
      </section>

      {/* Contact form */}
      <section
        id="contact-form"
        style={{
          background: "#ffffff",
          color: "#000000",
          paddingTop: 128,
          paddingBottom: 128,
        }}
      >
        <div className="max-w-[1280px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5">
            <span
              className="inline-block uppercase mb-6"
              style={{
                color: "#52525b",
                fontSize: 12,
                fontWeight: 400,
                letterSpacing: "0.72px",
              }}
            >
              Contact us
            </span>
            <h2
              style={{
                fontFamily: DISPLAY_FONT,
                fontSize: "clamp(36px, 5vw, 48px)",
                fontWeight: 330,
                lineHeight: 1.14,
              }}
            >
              Send us a message.
            </h2>
            <p
              className="mt-6"
              style={{
                fontSize: 18,
                fontWeight: 550,
                lineHeight: 1.56,
                color: "#000000",
              }}
            >
              Submitting opens your email client with the message prefilled
              so you can review it before sending.
            </p>
            <p
              className="mt-4"
              style={{
                color: "#52525b",
                fontSize: 14,
                fontWeight: 500,
                letterSpacing: "0.28px",
              }}
            >
              Prefer to skip the form? Write to{" "}
              <a
                href="mailto:hello@evalcode.app"
                style={{
                  color: "#000000",
                  fontWeight: 550,
                  textDecoration: "underline",
                  textUnderlineOffset: "4px",
                }}
              >
                hello@evalcode.app
              </a>
              .
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="lg:col-span-7 space-y-5"
            style={{
              background: "#fbfbf5",
              border: "1px solid #e4e4e7",
              borderRadius: 12,
              padding: 32,
            }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <Field
                label="Your name"
                value={form.name}
                onChange={(v) => handleFormChange("name", v)}
                error={formErrors.name}
                placeholder="Jane Doe"
              />
              <Field
                label="Email address"
                type="email"
                value={form.email}
                onChange={(v) => handleFormChange("email", v)}
                error={formErrors.email}
                placeholder="jane@school.edu"
              />
            </div>

            <div>
              <label style={labelStyle}>Category</label>
              <select
                value={form.category}
                onChange={(e) => handleFormChange("category", e.target.value)}
                style={inputStyle()}
              >
                <option value="">Pick a topic (optional)</option>
                {CATEGORIES.filter((c) => c.id !== "all").map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.label}
                  </option>
                ))}
              </select>
            </div>

            <Field
              label="Subject"
              value={form.subject}
              onChange={(v) => handleFormChange("subject", v)}
              error={formErrors.subject}
              placeholder="What's this about?"
            />

            <div>
              <label style={labelStyle}>Message</label>
              <textarea
                rows={6}
                value={form.message}
                onChange={(e) => handleFormChange("message", e.target.value)}
                placeholder="Tell us what you ran into, what you expected, or what you'd like to see next."
                style={{ ...inputStyle(formErrors.message), resize: "vertical" }}
              />
              {formErrors.message && (
                <p style={errorStyle}>{formErrors.message}</p>
              )}
            </div>

            <div className="flex items-center justify-between flex-wrap gap-4">
              <p
                style={{
                  color: "#52525b",
                  fontSize: 13,
                  fontWeight: 500,
                  letterSpacing: "-0.13px",
                }}
              >
                We typically reply within one business day.
              </p>
              <button
                type="submit"
                className="inline-flex items-center gap-2"
                style={{
                  background: "#000000",
                  color: "#ffffff",
                  borderRadius: 9999,
                  padding: "12px 24px",
                  fontSize: 16,
                  fontWeight: 550,
                  border: "none",
                }}
              >
                Send message
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {submitted && (
              <div
                className="flex items-start gap-3"
                style={{
                  background: "#c1fbd4",
                  color: "#000000",
                  borderRadius: 12,
                  padding: 16,
                }}
              >
                <Check className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <div>
                  <div
                    style={{
                      fontSize: 14,
                      fontWeight: 550,
                      letterSpacing: "0.28px",
                    }}
                  >
                    Email client opened.
                  </div>
                  <div
                    className="mt-1"
                    style={{
                      color: "#3f3f46",
                      fontSize: 13,
                      fontWeight: 500,
                      letterSpacing: "-0.13px",
                    }}
                  >
                    Review the message and hit send. If nothing opened,
                    write directly to hello@evalcode.app.
                  </div>
                </div>
              </div>
            )}
          </form>
        </div>
      </section>

      {/* Talk to a human (dark band) */}
      <section
        style={{
          background: "#000000",
          color: "#ffffff",
          paddingTop: 128,
          paddingBottom: 128,
        }}
      >
        <div className="max-w-[1600px] mx-auto px-6 md:px-12">
          <span
            className="inline-block uppercase mb-6"
            style={{
              color: "#9dabad",
              fontSize: 12,
              fontWeight: 400,
              letterSpacing: "0.72px",
            }}
          >
            Other ways to reach us
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
            Real humans. No tier-3 ticket queues.
          </h2>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl">
            <a
              href="mailto:hello@evalcode.app"
              className="flex items-start gap-4"
              style={{
                background: "#0a0a0a",
                color: "#ffffff",
                borderRadius: 12,
                padding: 24,
                border: "1px solid #1e2c31",
                textDecoration: "none",
              }}
            >
              <div
                className="flex items-center justify-center flex-shrink-0"
                style={{
                  width: 44,
                  height: 44,
                  background: "#c1fbd4",
                  borderRadius: 9999,
                  color: "#000000",
                }}
              >
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <div
                  style={{
                    fontFamily: DISPLAY_FONT,
                    fontSize: 20,
                    fontWeight: 500,
                    letterSpacing: "0.3px",
                    lineHeight: 1.4,
                  }}
                >
                  Email support
                </div>
                <div
                  className="mt-1"
                  style={{
                    color: "#9dabad",
                    fontSize: 14,
                    fontWeight: 500,
                    letterSpacing: "0.28px",
                  }}
                >
                  hello@evalcode.app
                </div>
              </div>
            </a>

            <div
              style={{
                background: "#0a0a0a",
                color: "#ffffff",
                borderRadius: 12,
                padding: 24,
                border: "1px solid #1e2c31",
              }}
              className="flex items-start gap-4"
            >
              <div
                className="flex items-center justify-center flex-shrink-0"
                style={{
                  width: 44,
                  height: 44,
                  background: "#c1fbd4",
                  borderRadius: 9999,
                  color: "#000000",
                }}
              >
                <MessageCircle className="w-5 h-5" />
              </div>
              <div>
                <div
                  style={{
                    fontFamily: DISPLAY_FONT,
                    fontSize: 20,
                    fontWeight: 500,
                    letterSpacing: "0.3px",
                    lineHeight: 1.4,
                  }}
                >
                  In-app chat
                </div>
                <div
                  className="mt-1"
                  style={{
                    color: "#9dabad",
                    fontSize: 14,
                    fontWeight: 500,
                    letterSpacing: "0.28px",
                  }}
                >
                  Use the chat bubble in the bottom-right corner of any page.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

/* --- Small form helpers --- */

const labelStyle = {
  display: "block",
  marginBottom: 6,
  fontSize: 14,
  fontWeight: 500,
  letterSpacing: "0.28px",
  color: "#000000",
};

const errorStyle = {
  color: "#dc2626",
  fontSize: 13,
  marginTop: 4,
  letterSpacing: "-0.13px",
};

const inputStyle = (hasError) => ({
  width: "100%",
  background: "#ffffff",
  color: "#000000",
  border: `1px solid ${hasError ? "#dc2626" : "#e4e4e7"}`,
  borderRadius: 8,
  padding: "10px 12px",
  fontSize: 16,
  fontWeight: 420,
  outline: "none",
});

const Field = ({ label, type = "text", value, onChange, error, placeholder }) => (
  <div>
    <label style={labelStyle}>{label}</label>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      style={inputStyle(error)}
    />
    {error && <p style={errorStyle}>{error}</p>}
  </div>
);

export default Support;
