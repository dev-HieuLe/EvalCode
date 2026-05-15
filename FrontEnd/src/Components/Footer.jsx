import React from "react";
import { Clover } from "lucide-react";

const DISPLAY_FONT = `"Helvetica Now Display", "Inter", "Helvetica", Arial, sans-serif`;

const Footer = () => {
  return (
    <footer style={{ background: "#000000", color: "#ffffff" }}>
      <div
        className="max-w-[1600px] mx-auto px-6 md:px-12"
        style={{ paddingTop: 64, paddingBottom: 64 }}
      >
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12">
          {/* Branding + Subscribe */}
          <div className="md:col-span-2">
            <h2
              className="mb-4 flex items-center gap-2"
              style={{
                fontFamily: DISPLAY_FONT,
                color: "#ffffff",
                fontSize: 28,
                fontWeight: 500,
                letterSpacing: "0.42px",
                lineHeight: 1.28,
              }}
            >
              <Clover className="w-7 h-7" style={{ color: "#c1fbd4" }} />
              EvalCode
            </h2>
            <p
              className="mb-6 max-w-sm"
              style={{ color: "#9dabad", fontSize: 14, lineHeight: 1.49, letterSpacing: "0.28px" }}
            >
              The AI-powered grading platform built for educators.
            </p>
            <form className="flex items-center gap-2 max-w-sm">
              <input
                type="email"
                placeholder="name@email.com"
                className="flex-1 outline-none"
                style={{
                  background: "transparent",
                  color: "#ffffff",
                  border: "1px solid #1e2c31",
                  borderRadius: 8,
                  padding: "10px 12px",
                  fontSize: 16,
                }}
              />
              <button
                type="submit"
                style={{
                  background: "#ffffff",
                  color: "#000000",
                  borderRadius: 9999,
                  padding: "10px 20px",
                  fontSize: 16,
                  fontWeight: 550,
                  border: "none",
                }}
              >
                Subscribe
              </button>
            </form>
          </div>

          {/* Product */}
          <div>
            <h3
              className="mb-4"
              style={{
                color: "#ffffff",
                fontSize: 14,
                fontWeight: 500,
                letterSpacing: "0.28px",
              }}
            >
              Product
            </h3>
            <ul className="space-y-3" style={{ fontSize: 14, color: "#9dabad", letterSpacing: "0.28px" }}>
              <li><a href="#" className="nav-link">Features</a></li>
              <li><a href="#" className="nav-link">Pricing</a></li>
              <li><a href="#" className="nav-link">Blog</a></li>
              <li><a href="#" className="nav-link">Changelog</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3
              className="mb-4"
              style={{
                color: "#ffffff",
                fontSize: 14,
                fontWeight: 500,
                letterSpacing: "0.28px",
              }}
            >
              Support
            </h3>
            <ul className="space-y-3" style={{ fontSize: 14, color: "#9dabad", letterSpacing: "0.28px" }}>
              <li><a href="#" className="nav-link">Help desk</a></li>
              <li><a href="#" className="nav-link">Public roadmap</a></li>
              <li><a href="#" className="nav-link">Discord</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3
              className="mb-4"
              style={{
                color: "#ffffff",
                fontSize: 14,
                fontWeight: 500,
                letterSpacing: "0.28px",
              }}
            >
              Company
            </h3>
            <ul className="space-y-3" style={{ fontSize: 14, color: "#9dabad", letterSpacing: "0.28px" }}>
              <li><a href="#" className="nav-link">Privacy policy</a></li>
              <li><a href="#" className="nav-link">Terms of use</a></li>
            </ul>
          </div>
        </div>

        <div
          className="mt-16 pt-6 flex items-center justify-between flex-wrap gap-4"
          style={{
            borderTop: "1px solid #1e2c31",
            color: "#9797a2",
            fontSize: 13,
            letterSpacing: "-0.13px",
          }}
        >
          <span>EvalCode. All rights reserved. © 2024</span>
          <span>Made for educators.</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
