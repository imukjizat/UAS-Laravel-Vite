import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [message, setMessage] = useState(""); // State untuk pesan error atau sukses
  const [messageType, setMessageType] = useState(""); // success atau error
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Membuat objek untuk dikirimkan ke backend
    const loginData = {
      email,
      password,
      remember: rememberMe, // Kirim remember me ke backend
    };

    // Kirim data login ke API
    fetch("http://127.0.0.1:8000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
      credentials: "include", // Pastikan cookie session dikirim
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          // Set pesan sukses ke state
          setMessage("Login successful!");
          setMessageType("success");

          // Redirect berdasarkan role user
          if (data.user.role === "admin") {
            navigate("/admin");
          } else {
            navigate("/dashboard");
          }
        } else {
          // Set pesan error ke state
          setMessage(data.message);
          setMessageType("error");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        setMessage("Something went wrong, please try again.");
        setMessageType("error");
      });
  };

  return (
    <>
      <Navbar />
      {/* Section Login */}
      <section className="flex items-center min-h-screen bg-white pt-24 pl-14">
        {/* Bagian Kiri: Gambar Ilustrasi */}
        <div className="hidden lg:flex w-1/2 h-full justify-center items-center">
          <img
            src="./Landing Page/login.png"
            alt="Illustration"
            className="object-cover w-full h-full"
          />
        </div>

        {/* Bagian Kanan: Form Login */}
        <div className="flex flex-col justify-center px-12 py-10 w-full lg:w-[60%]">
          <div className="max-w-lg mx-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Login to your Account</h2>
            <p className="text-gray-600 mb-8">See what is going on with your business</p>

            {/* Login dengan Google */}
            <button className="w-full flex items-center justify-center gap-3 py-2 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition mb-6">
              <img src="./Landing Page/google.png" alt="Google Logo" className="w-5 h-5" />
              Continue with Google
            </button>

            {/* Separator */}
            <div className="flex items-center my-4">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="mx-4 text-gray-400 text-sm">or Sign in with Email</span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>

            {/* Form Login */}
            <form onSubmit={handleLogin}>
              {/* Email */}
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="mail@abc.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5AC0FF]"
                  required
                />
              </div>

              {/* Password */}
              <div className="mb-4 relative">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"} // Kontrol tipe input
                  placeholder="********"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5AC0FF]"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)} // Toggle password visibility
                  className="absolute right-3 top-8 text-gray-600 hover:text-gray-800"
                >
                  <i className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"}`} /> {/* Ikon Font Awesome */}
                </button>
              </div>

              {/* Tampilkan pesan sukses atau error */}
              {message && (
                <div
                  className={`text-sm mb-3 ${
                    messageType === "error" ? "text-red-500" : "text-green-700"
                  }`}
                >
                  {message}
                </div>
              )}

              {/* Remember Me */}
              <div className="flex items-center justify-between mb-6">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="h-4 w-4 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-600">Remember Me</span>
                </label>
              </div>

              {/* Tombol Login */}
              <button
                type="submit"
                className="w-full bg-[#5AC0FF] text-white py-2 px-4 rounded-lg hover:bg-[#42A8E5] transition"
              >
                Login
              </button>
            </form>

            {/* Registrasi */}
            <p className="mt-6 text-sm text-gray-600">
              Not Registered Yet?{" "}
              <a href="/register" className="text-[#5AC0FF] hover:underline">
                Create an account
              </a>
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
