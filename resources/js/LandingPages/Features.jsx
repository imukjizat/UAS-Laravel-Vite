import React from "react";
import Navbar from "../components/Navbar";

const Features = () => {
  return (
    <>
      <Navbar />
      <section className="mt-32">
        <div className="mx-auto max-w-7xl px-7 lg:px-8">
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-800 leading-tight">
              Designed for Productivity Enthusiasts
            </h2>
            <p className="mt-4 text-gray-600 leading-normal">
            Our To-Do List App helps you stay organized, manage tasks, and boost productivity with smart features.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-16 gap-y-7">
            {/* Feature Items */}
            {[
              { title: "Task Management", description: "Easily create, edit, and delete tasks with a user-friendly interface.", icon: "fa-square-check" },
              { title: "Color-Coded Tasks", description: "Customize tasks with vibrant colors for better organization.", icon: "fa-palette" },
              { title: "Task Tags", description: "Assign tags for better task categorization and filtering.", icon: "fa-tag" },
              { title: "Repeating Tasks", description: "Set daily, weekly, or monthly task repetitions effortlessly.", icon: "fa-repeat" },
              { title: "Task Reminders", description: "Get notified about important tasks with customizable reminders.", icon: "fa-clock" },
              { title: "Secure Data", description: "All your tasks are securely encrypted to protect your data.", icon: "fa-lock" },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-lg shadow-md hover:scale-105 transform transition duration-300 ease-in-out h-48"
              >
                <div className="flex justify-center items-center mb-6 w-10 h-10 rounded-full bg-indigo-600">
                  <i className={`fa-solid ${feature.icon} fa-lg text-white`}></i>
                </div>
                <h3 className="mb-2 text-lg font-semibold text-gray-900">{feature.title}</h3>
                <p className="text-gray-500 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Features;
