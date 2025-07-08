import { useEffect, useState } from "react";
import img1 from "./assets/1.png";
import img2 from "./assets/2.svg";
import img3 from "./assets/3.webp";
import img4 from "./assets/4.webp";
import Login from "./login";
import Signup from "./signup";
import RiderDashboard from "./pages/RiderDashboard";
import DriverDashboard from "./pages/DriverDashboard";

function App() {
  const [showAuth, setShowAuth] = useState(false);
  const [authMode, setAuthMode] = useState("login");
  const [role, setRole] = useState(
    localStorage.getItem("role") || "Guest_User".toLowerCase()
  );

  const [currentPage, setCurrentPage] = useState("home");

  const handleSignup = () => {
    setAuthMode("login");
  };

  const handleLogin = (data) => {
    setRole(data.role.toLowerCase());
    setShowAuth(false);
    setCurrentPage(data.role.toLowerCase());
  };

  const handleLogout = () => {
    setRole("Guest_User");
    setCurrentPage("home");
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("name");
  };

  useEffect(
    () => {
      if (role === "rider") {
        setCurrentPage("rider");
      } else if (role === "driver") {
        setCurrentPage("driver");
      } else {
        setCurrentPage("home");
      }
    },
    { role }
  );

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 w-screen">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white shadow-lg">
        <div className="container mx-auto flex justify-between items-center py-4 px-6">
          <div className="flex items-center gap-1">
            <span className="text-3xl animate-bounce [animation-duration:1.5s] animate-lowBounce">
              🚌
            </span>
            <span className="text-gray-50 text-xl -ml-2 tracking-tight animate-pulse [animation-duration:1s]">
              ...
            </span>
            <span className="font-extrabold text-2xl tracking-wide">
              RideShare
            </span>
          </div>
          <div>
            <div className="flex gap-4">
              {role === "Guest_User" ? (
                <>
                  <button
                    className="bg-white text-blue-600 px-4 py-2 rounded-full hover:bg-blue-100 transition"
                    onClick={() => {
                      setAuthMode("login");
                      setShowAuth(true);
                    }}
                  >
                    Login
                  </button>
                  <button
                    className="bg-white text-blue-600 px-4 py-2 rounded-full hover:bg-blue-100 transition"
                    onClick={() => {
                      setAuthMode("signup");
                      setShowAuth(true);
                    }}
                  >
                    Signup
                  </button>
                </>
              ) : (
                <button
                  className="bg-white text-red-600 px-4 py-2 rounded-full hover:bg-red-100 transition"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 w-full overflow-y-auto">
        {/* Navigation */}
        {currentPage === "rider" ? (
          <RiderDashboard />
        ) : currentPage === "driver" ? (
          <DriverDashboard />
        ) : (
          <>
            {/* Home Section */}
            <section className="py-20 w-full bg-gray-100 flex flex-col md:flex-row items-center justify-center gap-16 px-6">
              <div className="flex-1 flex flex-col justify-center items-start max-w-xl">
                <h2 className="text-5xl font-extrabold leading-tight mb-4 text-gray-900">
                  Get Quick Rides, <br />
                  <span className="inline-block border-b-4 border-yellow-400 pb-1">
                    Low Fares
                  </span>
                </h2>
                <p className="text-lg text-gray-700 mb-8">
                  In RideShare we ensure our customers get rides quickly at the
                  most affordable prices.
                </p>
                <button
                  className="bg-gray-900 text-white font-semibold px-8 py-3 rounded-full flex items-center gap-2 hover:bg-gray-800 transition duration-300"
                  onClick={() => setShowAuth(true)}
                >
                  Login to Book a Ride <span className="ml-2">&rarr;</span>
                </button>
              </div>
              <div className="flex-1 flex justify-center items-center max-w-md">
                <img
                  src={img1}
                  alt="Services"
                  className="rounded-3xl object-cover shadow-sm w-full h-80 md:h-auto"
                />
              </div>
            </section>

            {/* About Section (Safety for all) */}
            <section className="py-20 w-full bg-white flex flex-col md:flex-row items-center justify-center gap-16 px-6">
              <div className="flex-1 flex justify-center items-center max-w-md order-1 md:order-none">
                <img
                  src={img2}
                  alt="Safety for all"
                  className="rounded-3xl object-cover shadow-md w-full h-80"
                />
              </div>
              <div className="flex-1 flex flex-col justify-center items-start max-w-xl order-2 md:order-none">
                <h1 className="text-4xl font-extrabold mb-4 text-gray-900">
                  Safety for all
                  <div className="w-20 h-1 bg-yellow-400 mt-3 mb-4 rounded"></div>
                </h1>
                <p className="text-lg text-gray-700 mb-8">
                  At RideShare, your safety is our priority. We're dedicated to
                  making every ride safe and comfortable.
                </p>
                <a
                  href="#"
                  className="text-blue-700 text-lg font-semibold hover:underline flex items-center"
                >
                  Know More <span className="ml-1">&gt;</span>
                </a>
              </div>
            </section>

            {/* Services Section */}
            <section className="py-20 bg-gray-100 w-full px-6">
              <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
                Our Services
              </h2>
              <div className="flex flex-wrap justify-center gap-8">
                {[
                  {
                    title: "Economy",
                    desc: "Affordable rides for everyday travel.",
                    features: [
                      "Up to 4 passengers",
                      "Standard vehicles",
                      "Best value",
                    ],
                    icon: "🚕",
                  },
                  {
                    title: "Comfort",
                    desc: "Enhanced comfort with premium vehicles.",
                    features: [
                      "Up to 4 passengers",
                      "Premium vehicles",
                      "Extra legroom",
                    ],
                    icon: "🚗",
                  },
                  {
                    title: "Premium",
                    desc: "Luxury rides for special occasions & events.",
                    features: [
                      "Up to 4 passengers",
                      "Luxury vehicles",
                      "Professional drivers",
                    ],
                    icon: "👑",
                  },
                  {
                    title: "XL",
                    desc: "Spacious rides for groups & families.",
                    features: [
                      "Up to 6 passengers",
                      "Large vehicles",
                      "Perfect for groups",
                    ],
                    icon: "👥",
                  },
                ].map((s) => (
                  <div
                    key={s.title}
                    className="bg-white rounded-2xl p-6 w-72 flex flex-col items-center shadow hover:shadow-xl transition"
                  >
                    <div className="text-5xl mb-3">{s.icon}</div>
                    <h3 className="font-bold text-xl mb-2 text-gray-800">
                      {s.title}
                    </h3>
                    <p className="mb-3 text-center text-gray-600">{s.desc}</p>
                    <ul className="text-green-600 text-sm list-inside list-disc">
                      {s.features.map((f) => (
                        <li key={f}>{f}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            {/* Download Section */}
            <section className="py-20 bg-black w-full px-6">
              <h2 className="text-4xl font-bold text-center mb-10 text-white">
                Download Now
              </h2>
              <div className="flex flex-col md:flex-row justify-center items-center gap-10">
                <div className="flex flex-col items-center">
                  <img
                    src={img3}
                    alt="App Details"
                    className="w-24 h-24 mb-4 rounded-xl shadow-lg"
                  />
                  <div className="text-white text-center font-semibold leading-snug">
                    RideShare: Bike-Taxi,
                    <br /> Auto & Cabs
                  </div>
                </div>
                <div className="flex flex-col items-center">
                  <img
                    src={img4}
                    alt="App Details"
                    className="w-24 h-24 mb-4 rounded-xl shadow-lg"
                  />
                  <div className="text-white text-center font-semibold leading-snug">
                    RideShare Captain: <br /> Drive & Earn
                  </div>
                </div>
              </div>
            </section>
          </>
        )}
      </main>

      {showAuth && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-8 w-full max-w-md relative shadow-xl">
            <h2 className="text-2xl font-bold mb-4">
              {authMode === "login" ? "Login" : "Sign Up"}
            </h2>

            {authMode === "login" ? (
              <Login onLogin={handleLogin} />
            ) : (
              <Signup onSignup={handleSignup} />
            )}

            <button
              className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 bg-gray-100 rounded-full w-8 h-8 flex items-center justify-center text-xl shadow"
              onClick={() => setShowAuth(false)}
            >
              x
            </button>
          </div>
        </div>
      )}

      <footer className="bg-gray-900 text-white py-6 text-center text-sm mt-auto">
        &copy;2025 RideShare. All rights reserved.
      </footer>
    </div>
  );
}

export default App;
