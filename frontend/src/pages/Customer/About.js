import React from "react";
import { Users, Award, Globe, Heart, Mail, ArrowRight } from "lucide-react";

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-white">
        <div className="container mx-auto px-6 py-16 md:py-24 lg:flex items-center gap-12">
          <div className="lg:w-1/2 mb-10 lg:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              We're on a mission to transform digital experiences
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Founded in 2020, our team of passionate innovators is dedicated to
              creating solutions that make a difference in how people interact
              with technology.
            </p>
            <button className="flex items-center bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors">
              Learn more
              <ArrowRight className="ml-2 h-4 w-4" />
            </button>
          </div>
          <div className="lg:w-1/2 bg-indigo-100 rounded-xl overflow-hidden">
            <div className="h-64 md:h-96 bg-indigo-600/10 flex items-center justify-center">
              <Users className="h-24 w-24 text-indigo-600" strokeWidth={1.5} />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Our Values
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we do, from product
              development to customer interactions.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-8 rounded-xl">
              <Award className="h-12 w-12 text-indigo-600 mb-4" />
              <h3 className="text-xl font-semibold mb-3">Excellence</h3>
              <p className="text-gray-600">
                We strive for excellence in everything we do, constantly pushing
                the boundaries of what's possible.
              </p>
            </div>
            <div className="bg-gray-50 p-8 rounded-xl">
              <Heart className="h-12 w-12 text-indigo-600 mb-4" />
              <h3 className="text-xl font-semibold mb-3">Empathy</h3>
              <p className="text-gray-600">
                We put ourselves in our users' shoes, creating products that
                address real needs with compassion.
              </p>
            </div>
            <div className="bg-gray-50 p-8 rounded-xl">
              <Globe className="h-12 w-12 text-indigo-600 mb-4" />
              <h3 className="text-xl font-semibold mb-3">Impact</h3>
              <p className="text-gray-600">
                We measure our success by the positive change we create in the
                world through our work.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Meet Our Team
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Talented individuals working together to build amazing products.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Alex Johnson",
                title: "CEO & Founder",
                image: "/api/placeholder/400/400",
              },
              {
                name: "Sam Rivera",
                title: "CTO",
                image: "/api/placeholder/400/400",
              },
              {
                name: "Jordan Lee",
                title: "Head of Design",
                image: "/api/placeholder/400/400",
              },
            ].map((member, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-64 object-cover rounded-lg mb-6"
                />
                <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                <p className="text-indigo-600 mb-4">{member.title}</p>
                <p className="text-gray-600">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  vitae justo varius, tincidunt nunc eu, faucibus nunc.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Journey Section */}
      <section className="py-16 bg-indigo-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Our Journey
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              From a small startup to an industry leader, our path has been
              defined by innovation and perseverance.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            {[
              {
                year: "2020",
                title: "Company Founded",
                description:
                  "Started with a team of 3 in a small office space.",
              },
              {
                year: "2021",
                title: "First Major Client",
                description:
                  "Secured our first enterprise client and expanded our team.",
              },
              {
                year: "2022",
                title: "Product Launch",
                description:
                  "Released our flagship product and received industry recognition.",
              },
              {
                year: "2024",
                title: "Global Expansion",
                description:
                  "Opened offices in multiple countries to serve international clients.",
              },
            ].map((milestone, index) => (
              <div key={index} className="flex mb-12 last:mb-0">
                <div className="mr-6 flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold">
                    {milestone.year}
                  </div>
                  {index !== 3 && (
                    <div className="w-1 h-full bg-indigo-200 mt-4"></div>
                  )}
                </div>
                <div className="pt-2">
                  <h3 className="text-xl font-semibold mb-2">
                    {milestone.title}
                  </h3>
                  <p className="text-gray-600">{milestone.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Get in Touch
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              We'd love to hear from you. Reach out to discuss how we can work
              together.
            </p>
            <a
              href="#"
              className="inline-flex items-center bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
            >
              <Mail className="mr-2 h-5 w-5" />
              Contact Us
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <h3 className="text-2xl font-bold mb-2">Company Name</h3>
              <p className="text-gray-400">Making technology more human</p>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="hover:text-indigo-400 transition-colors">
                About
              </a>
              <a href="#" className="hover:text-indigo-400 transition-colors">
                Services
              </a>
              <a href="#" className="hover:text-indigo-400 transition-colors">
                Careers
              </a>
              <a href="#" className="hover:text-indigo-400 transition-colors">
                Contact
              </a>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
            <p>
              © {new Date().getFullYear()} Company Name. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AboutUs;
