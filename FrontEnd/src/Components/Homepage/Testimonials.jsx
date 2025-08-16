// TestimonialsSection.jsx
import React from 'react';

function Testimonial() {
  const testimonials = [
    {
      name: 'Alice Nguyen',
      title: 'Computer Science Teacher',
      image: 'https://randomuser.me/api/portraits/women/68.jpg',
      quote: 'This platform saves me hours dvdcnd jnvjsdn vjkds nvjd nvjdn vjndj vndjn vjdnvjdvndj nvjdvnev ery week! It’s like having a teaching assistant that never sleeps.',
    },
    {
      name: 'David Tran',
      title: 'High School STEM Educator',
      image: 'https://randomuser.me/api/portraits/men/44.jpg',
      quote: 'I love how easwdd y it is twwwwo adjust the AI grading. My students getd dddd great feedback dwddw instantly.',
    },
    {
      name: 'Emma Lê',
      title: 'Lecturer, Software Engineering',
      image: 'https://randomuser.me/api/portraits/women/79.jpg',
      quote: 'Professional, clean, andwwwwwwwww incredibly accurate. This tool iwdwdwd wdwdwd wdwds now a core part of my workflow.',
    },
    {
      name: 'John Smith',
      title: 'CS Instructor',
      image: 'https://randomuser.me/api/portraits/men/60.jpg',
      quote: 'The customizable feedbaccdsvwk is r.',
    },
    {
      name: 'Sofia Doan',
      title: 'Curriculum Designer',
      image: 'https://randomuser.me/api/portraits/women/52.jpg',
      quote: 'Makes grading consiswdwdwdw dwdwd dwdwdw dwdwd dwdwd dwdwd dwdwd tent and wdwdwdw fair, especidwdwdwally in large classes.',
    },
    {
      name: 'Mark Chen',
      title: 'Bootcamp Mentor',
      image: 'https://randomuser.me/api/portraits/men/85.jpg',
      quote: 'Exactly what we needed to scale personalized feedback at speed.',
    },
    {
      name: 'Rachel Pham',
      title: 'Teaching Assistant',
      image: 'https://randomuser.me/api/portraits/women/33.jpg',
      quote: 'Helps me prepare feedback even before class starts.',
    },
    {
      name: 'Tony Vu',
      title: 'Python Course Creator',
      image: 'https://randomuser.me/api/portraits/men/99.jpg',
      quote: 'The score reasoning makes it easy to explain grades to learners.',
    },
    {
      name: 'Linda Hoang',
      title: 'Online Instructor',
      image: 'https://randomuser.me/api/portraits/women/45.jpg',
      quote: 'I switched from manual grading to this and never looked back.',
    },
  ];

  return (
    <section className="bg-white py-24 px-6" id="testimonials">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block text-sm uppercase tracking-wider text-blue-600 font-semibold mb-2">
            Words from Educators
          </span>
          <h2 className="text-4xl md:text-6xl font-extrabold text-gray-900">It’s not just us.</h2>
          <p className="text-gray-500 text-lg mt-2">
            See how educators are transforming their grading with our platform.
          </p>
        </div>

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="break-inside-avoid w-full bg-gray-50 border border-blue-100 rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.title}</p>
                </div>
              </div>
              <p className="text-gray-700 text-sm leading-relaxed">“{testimonial.quote}”</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonial