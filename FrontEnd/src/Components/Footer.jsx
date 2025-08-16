// Footer.jsx
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-white text-black py-16 px-6 md:px-12 border-t">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Branding + Subscribe */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Momentum</h2>
          <form className="flex items-center bg-gray-100 rounded-full overflow-hidden w-full max-w-xs mb-3">
            <input
              type="email"
              placeholder="name@email.com"
              className="w-full bg-transparent px-4 py-2 outline-none text-sm"
            />
            <button
              type="submit"
              className="bg-neutral-900 text-white text-sm font-medium px-5 py-2 rounded-full hover:bg-black transition-all"
            >
              Subscribe
            </button>
          </form>
          <p className="text-sm text-gray-500">No Spam. Just Product updates.</p>
          <p className="text-xs text-gray-400 mt-8">
            Momentum. All right reserved. © 2024
          </p>
        </div>

        {/* Product */}
        <div>
          <h3 className="font-semibold mb-3">Product</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li><a href="#">Features</a></li>
            <li><a href="#">Pricing</a></li>
            <li><a href="#">Blog</a></li>
            <li><a href="#">Changelog</a></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="font-semibold mb-3">Support</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li><a href="#">Help Desk</a></li>
            <li><a href="#">Public roadmap</a></li>
            <li><a href="#">Discord</a></li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h3 className="font-semibold mb-3">Company</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Terms of use</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
