import React from "react";
import Navbar from "../components/Navbar";

const HowItWorks = () => {
  return (
    <>
      <Navbar />
      <section className="mt-32 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-800">How It Works</h2>
          <p className="mt-4 text-gray-600">
            Learn how to use TaskMaster to organize your tasks efficiently.
          </p>
        </div>
        <div className="mt-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { step: "1", title: "Create an Account", description: "Sign up to access your dashboard." },
                { step: "2", title: "Add Tasks", description: "Use 'Create Task' to organize your tasks." },
                { step: "3", title: "Stay Organized", description: "Track, set reminders, and repeat schedules." },
              ].map((item, index) => (
                <div key={index} className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 flex items-center justify-center bg-indigo-600 text-white rounded-full">
                    <span className="text-2xl font-bold">{item.step}</span>
                  </div>
                  <h3 className="mt-4 text-xl font-semibold text-gray-800">{item.title}</h3>
                  <p className="mt-2 text-gray-600">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HowItWorks;
