import React from "react";
import Navbar from "../components/Navbar";

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="absolute left-[480px] top-[80px]">
        <img src="./Landing Page/panah.png" alt="Panah" className="h-[211px] w-[188px] object-contain" />
      </div>
      <div className="relative mt-[220px] px-14">
        <div className="flex items-baseline space-x-2">
          <h1 className="text-orange-500 text-[140px] font-bold leading-none">To-do</h1>
          <h2 className="text-[#2F2F2F] text-[60px] font-bold leading-none">List</h2>
        </div>
        <div className="mt-6">
          <p className="text-[#909090] text-[23px] leading-none">
            Manage your daily tasks in a more organized
          </p>
          <p className="text-[#909090] text-[23px] leading-none">efficient way</p>
        </div>
        <div className="mt-8">
          <a
            className="bg-[#2F2F2F] text-white px-10 py-4 rounded-full shadow-lg hover:bg-gray-600 transition-all inline-block"
            href="/login"
          >
            Get Started
          </a>
        </div>
        <div className="mt-[120px]">
          <p className="text-black text-[19px] leading-none">An application that makes it easier</p>
          <p className="text-black text-[19px] leading-none">for users to manage their tasks</p>
        </div>
      </div>
      <div className="absolute right-12 top-[120px]">
        <img src="./Landing Page/image.png" alt="Image" className="h-[536px] w-[540px] object-contain" />
      </div>
    </>
  );
};

export default Home;
