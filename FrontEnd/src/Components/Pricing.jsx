import React from "react";
import { Check } from "lucide-react";

const DISPLAY_FONT = `"Helvetica Now Display", "Inter", "Helvetica", Arial, sans-serif`;

const STACKED_SHADOW =
  "0 8px 8px rgba(0,0,0,0.06), 0 4px 4px rgba(0,0,0,0.06), 0 2px 2px rgba(0,0,0,0.06), 0 0 0 1px rgba(0,0,0,0.06)";

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "USD / month",
    description: "20 credits each month.",
    features: [
      "Access to basic grading",
      "Limited feedback",
      "No code suggestions",
    ],
    featured: false,
  },
  {
    name: "Basic",
    price: "$15",
    period: "USD / month",
    description: "400 credits each month.",
    features: ["Full AI grading", "Textual feedback only", "Teacher dashboard"],
    featured: true,
  },
  {
    name: "Pro",
    price: "$35",
    period: "USD / month",
    description: "Infinite credits.",
    features: [
      "Full AI grading",
      "Feedback + code suggestions",
      "Advanced analytics",
    ],
    featured: false,
  },
];

const Pricing = () => {
  return (
    <section
      id="pricing-page"
      style={{
        background: "#fbfbf5",
        color: "#000000",
        paddingTop: 96,
        paddingBottom: 96,
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
          Pricing
        </span>
        <h1
          style={{
            fontFamily: DISPLAY_FONT,
            fontSize: "clamp(40px, 6vw, 55px)",
            fontWeight: 330,
            lineHeight: 1.16,
          }}
        >
          Pick the plan that fits.
        </h1>
        <p
          className="mt-4 max-w-xl"
          style={{ fontSize: 18, fontWeight: 550, lineHeight: 1.56 }}
        >
          Choose the plan that suits your classroom. No hidden fees.
        </p>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-16">
          {plans.map((plan, index) => (
            <div
              key={index}
              style={{
                background: plan.featured ? "#c1fbd4" : "#ffffff",
                color: "#000000",
                borderRadius: 12,
                padding: 32,
                boxShadow: plan.featured ? "none" : STACKED_SHADOW,
                border: plan.featured ? "none" : "1px solid #e4e4e7",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {plan.featured && (
                <span
                  className="inline-block self-start uppercase mb-3"
                  style={{
                    background: "#ffffff",
                    color: "#000000",
                    borderRadius: 9999,
                    padding: "4px 12px",
                    fontSize: 12,
                    fontWeight: 400,
                    letterSpacing: "0.72px",
                  }}
                >
                  Most popular
                </span>
              )}
              <h3
                style={{
                  fontFamily: DISPLAY_FONT,
                  fontSize: 28,
                  fontWeight: 500,
                  letterSpacing: "0.42px",
                  lineHeight: 1.28,
                }}
              >
                {plan.name}
              </h3>
              <div className="flex items-end gap-2 mt-6">
                <span
                  style={{
                    fontFamily: DISPLAY_FONT,
                    fontSize: 48,
                    fontWeight: 330,
                    lineHeight: 1.14,
                  }}
                >
                  {plan.price}
                </span>
                <span
                  style={{
                    fontSize: 13,
                    fontWeight: 500,
                    letterSpacing: "-0.13px",
                    color: "#52525b",
                    paddingBottom: 10,
                  }}
                >
                  {plan.period}
                </span>
              </div>
              <p
                className="mt-2"
                style={{ color: "#52525b", fontSize: 14, lineHeight: 1.49, letterSpacing: "0.28px" }}
              >
                {plan.description}
              </p>

              <ul className="mt-8 space-y-3 flex-1">
                {plan.features.map((feature, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2"
                    style={{ fontSize: 16, fontWeight: 420, lineHeight: 1.5 }}
                  >
                    <Check
                      className="w-4 h-4 mt-1 flex-shrink-0"
                      style={{ color: "#000000" }}
                    />
                    {feature}
                  </li>
                ))}
              </ul>

              <button
                className="w-full mt-8"
                style={{
                  background: plan.featured ? "#000000" : "#ffffff",
                  color: plan.featured ? "#ffffff" : "#000000",
                  border: plan.featured ? "none" : "1px solid #000000",
                  borderRadius: 9999,
                  padding: "12px 24px",
                  fontSize: 16,
                  fontWeight: 550,
                }}
              >
                {plan.featured ? "Start free trial" : "Choose plan"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
