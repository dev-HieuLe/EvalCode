import React from "react";

function Reviews() {
  const testimonials = [
    {
      name: "Alice Nguyen",
      title: "Computer Science Teacher",
      image: "https://randomuser.me/api/portraits/women/68.jpg",
      quote:
        "This platform saves me hours every week! It’s like having a teaching assistant that never sleeps.",
    },
    {
      name: "David Tran",
      title: "High School STEM Educator",
      image: "https://randomuser.me/api/portraits/men/44.jpg",
      quote:
        "I love how easy it is to adjust the AI grading. My students get great feedback instantly.",
    },
    {
      name: "Emma Lê",
      title: "Lecturer, Software Engineering",
      image: "https://randomuser.me/api/portraits/women/79.jpg",
      quote:
        "Professional, clean, and incredibly accurate. This tool is now a core part of my workflow.",
    },
    {
      name: "John Smith",
      title: "CS Instructor",
      image: "https://randomuser.me/api/portraits/men/60.jpg",
      quote: "The customizable feedback is remarkable.",
    },
    {
      name: "Sofia Doan",
      title: "Curriculum Designer",
      image: "https://randomuser.me/api/portraits/women/52.jpg",
      quote: "Makes grading consistent and fair, especially in large classes.",
    },
    {
      name: "Mark Chen",
      title: "Bootcamp Mentor",
      image: "https://randomuser.me/api/portraits/men/85.jpg",
      quote: "Exactly what we needed to scale personalized feedback at speed.",
    },
    {
      name: "Rachel Pham",
      title: "Teaching Assistant",
      image: "https://randomuser.me/api/portraits/women/33.jpg",
      quote: "Helps me prepare feedback even before class starts.",
    },
    {
      name: "Tony Vu",
      title: "Python Course Creator",
      image: "https://randomuser.me/api/portraits/men/99.jpg",
      quote: "The score reasoning makes it easy to explain grades to learners.",
    },
    {
      name: "Linda Hoang",
      title: "Online Instructor",
      image: "https://randomuser.me/api/portraits/women/45.jpg",
      quote: "I switched from manual grading to this and never looked back.",
    },
  ];

  return (
    <section className="bg-white py-24 px-6 min-h-screen" id="reviews">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <span className="inline-block text-sm uppercase tracking-wider text-blue-600 font-semibold mb-2">
            User Reviews
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900">
            What Our Users Say
          </h2>
          <p className="text-gray-500 text-lg mt-2">
            See how educators are transforming their grading with EvalAI.
          </p>
        </div>
        <div className="space-y-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="border rounded-2xl p-6 bg-gray-50 shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex items-center gap-4 mb-2">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold text-gray-900 text-lg">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-gray-500">{testimonial.title}</p>
                </div>
              </div>
              <div className="text-gray-700 text-base leading-relaxed border-t pt-4 mt-2">
                “{testimonial.quote}”
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Reviews;
