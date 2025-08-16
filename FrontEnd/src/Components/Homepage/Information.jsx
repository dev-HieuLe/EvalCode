import React from "react";

const features = [
  {
    title: "Time Saving",
    desc: "Search for discussions, create folders, add tags, export data, and much more.",
    image: "/demo.jpg",
    span: 2, // span across 2 columns on large screens
  },
  {
    title: "Web Search",
    desc: "Unleash the potential of cutting-edge AI through a seamless internet experience.",
    image: "/demo.jpg",
  },
  {
    title: "Multiple Models",
    desc: "Switch between models in the same chat: Text, images, web search.",
    image: "/demo.jpg",
  },
  {
    title: "Prompt Library",
    desc: "Enjoy exclusive prompts categorized by marketing, social media, HR, sales, and more.",
    image: "/demo.jpg",
  },
  {
    title: "Chat Synchronization",
    desc: "Sync and back up your chat data across multiple devices.",
    image: "/demo.jpg",
  },
];

const Information = () => {
  return (
    <section className="bg-white px-6 py-28 text-center">
      {/* Heading */}
      <h2 className="text-4xl md:text-6xl font-bold text-gray-900">
        All AI tools are just in one <br className="hidden md:block" />
        place and simple to use
      </h2>
      <p className="text-gray-500 text-lg mt-4 max-w-2xl mx-auto">
        Get started with AI quickly and easily with
        <br className="hidden md:block" />
        all your tools at your fingertips.
      </p>

      {/* Grid Layout */}
      <div className="mt-16 max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-5">
        {features.map((feature, index) => (
          <div
            key={index}
            className={`bg-gray-100 border border-gray-200 rounded-2xl p-5 text-left shadow-sm hover:shadow-md transition ${
              feature.span === 2 ? "lg:col-span-2" : ""
            }`}
          >
            <img
              src={feature.image}
              alt={feature.title}
              className="rounded-xl mb-4 w-full h-64 object-cover"
            />
            <h3 className="font-semibold text-gray-900 text-lg mb-1">
              {feature.title}
            </h3>
            <p className="text-gray-500 text-sm flex-grow">{feature.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Information;
