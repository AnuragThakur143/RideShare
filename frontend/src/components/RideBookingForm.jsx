import React, { useState, useEffect } from "react";
import rideShareBg from "../assets/rideShareBg.jpeg";
import { apiRequest } from "../api.jsx";

export default function RideBookingForm({ onBook }) {
  const [pickup, setPickup] = useState("");
  const [drop, setDrop] = useState("");
  const [rideType, setRideType] = useState("Economy");
  const [paymentMode, setPaymentMode] = useState("Cash");
  const [fare, setFare] = useState(null);
  const [estimate, setEstimate] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const home = "Sagar";
  const office = "Civil Lines";
  const [recent, setRecent] = useState([]);

  useEffect(() => {
    const rec = JSON.parse(localStorage.getItem("recentLocations") || "[]");
    setRecent(rec);
  }, []);

  const saveRecent = (pickup, drop) => {
    let rec = JSON.parse(localStorage.getItem("recentLocations") || "[]");
    rec = rec.filter((l) => l.pickup !== pickup || l.drop !== drop);
    rec.unshift({ pickup, drop });
    if (rec.length > 5) rec = rec.slice(0, 5);
    localStorage.setItem("recentLocations", JSON.stringify(rec));
    setRecent(rec);
  };

  useEffect(() => {
    if (pickup && drop) {
      const baseFare = 30;
      const typeMultiplier =
        rideType === "XL"
          ? 2.3
          : rideType === "Premium"
          ? 2
          : rideType === "Comfort"
          ? 1.5
          : 1;
      setFare(baseFare * typeMultiplier);
      setEstimate("15–20 mins");
    } else {
      setFare(null);
      setEstimate(null);
    }
  }, [pickup, drop, rideType]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Please login!");
      return;
    }
    try {
      const ride = {
        pickupLocation: pickup,
        dropLocation: drop,
        fare,
        status: "REQUESTED",
        rideType,
        paymentMode,
      };
      await apiRequest("/rides/book", "POST", ride, token);
      setSuccess("Ride booked successfully!");
      setPickup("");
      setDrop("");
      setFare(null);
      setEstimate(null);
      setRideType("Economy");
      setPaymentMode("Cash");
      saveRecent(pickup, drop);
      onBook && onBook();
    } catch (err) {
      setError("Error: " + err.message);
    }
  };

  return (
    <section
      className="relative flex flex-col items-center justify-center min-h-[70vh] w-full"
      style={{
        backgroundImage: `url(${rideShareBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-white/40 backdrop-blur-sm"></div>
      <div className="relative z-10 w-full max-w-3xl mx-auto p-8 rounded-2xl shadow-xl bg-white/90">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-2 text-center">
          Bharat Moves On RideShare!
        </h1>
        <p className="text-lg text-gray-700 mb-6 text-center">
          Fast, safe, and affordable rides at your fingertips.
        </p>

        {/* Safety Banner */}
        <div className="flex items-center gap-3 bg-blue-50 border-l-4 border-blue-400 rounded-lg p-3 shadow mb-4">
          <span className="text-blue-500 text-2xl">🦺</span>
          <span className="text-gray-800 font-medium">
            Safety First: Always verify your driver and share your trip.
          </span>
        </div>

        {/* Promo Banner */}
        <div className="flex items-center gap-3 bg-yellow-50 border-l-4 border-yellow-400 rounded-lg p-3 shadow mb-6 animate-pulse">
          <span className="text-yellow-500 text-2xl">🎁</span>
          <span className="text-gray-800 font-medium">
            Special Offer: 20% off your first ride! Use{" "}
            <span className="font-bold text-yellow-700">NEW20</span>
          </span>
        </div>

        {/* Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {[
            {
              icon: "⚡",
              title: "Instant Booking",
              desc: "Book a ride in seconds with real-time driver matching.",
              bg: "bg-green-50",
              text: "text-green-600",
            },
            {
              icon: "🛡️",
              title: "Verified Drivers",
              desc: "All drivers are background-checked for safety.",
              bg: "bg-blue-50",
              text: "text-blue-600",
            },
            {
              icon: "💳",
              title: "Multiple Payments",
              desc: "Pay with cash, card, or wallet—your choice.",
              bg: "bg-purple-50",
              text: "text-purple-600",
            },
          ].map((f, i) => (
            <div
              key={i}
              className={`${f.bg} rounded-lg p-4 shadow flex flex-col items-center`}
            >
              <span className={`${f.text} text-3xl mb-2`}>{f.icon}</span>
              <span className="font-semibold text-gray-800 mb-1">
                {f.title}
              </span>
              <span className="text-gray-600 text-sm text-center">
                {f.desc}
              </span>
            </div>
          ))}
        </div>

        {/* Recent Locations */}
        {recent.length > 0 && (
          <div className="mb-4">
            <div className="font-semibold mb-1 text-gray-700">
              Frequent Locations:
            </div>
            <div className="flex flex-wrap gap-2">
              {recent.map((loc, idx) => (
                <button
                  key={idx}
                  type="button"
                  className="bg-yellow-50 border border-yellow-200 rounded-full px-4 py-1 text-sm font-medium hover:bg-yellow-100 transition"
                  onClick={() => {
                    setPickup(loc.pickup);
                    setDrop(loc.drop);
                  }}
                >
                  📍 {loc.pickup} → 🏁 {loc.drop}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Form */}
        <form className="space-y-6 mt-4" onSubmit={handleSubmit}>
          {/* Pickup */}
          <div>
            <label className="block text-sm font-medium text-gray-800 mb-2">
              Pickup Location
            </label>
            <input
              type="text"
              className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
              value={pickup}
              onChange={(e) => setPickup(e.target.value)}
              placeholder="Enter pickup point"
              required
            />
            <div className="flex gap-2 mt-2 text-sm">
              <span className="text-gray-600">Quick Select:</span>
              <button
                type="button"
                className="bg-blue-100 px-3 py-1 rounded-full hover:bg-blue-200"
                onClick={() => setPickup(home)}
              >
                🏠 Home
              </button>
              <button
                type="button"
                className="bg-purple-100 px-3 py-1 rounded-full hover:bg-purple-200"
                onClick={() => setPickup(office)}
              >
                🏢 Office
              </button>
            </div>
          </div>

          {/* Drop */}
          <div>
            <label className="block text-sm font-medium text-gray-800 mb-2">
              Destination
            </label>
            <input
              type="text"
              className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2 text-gray-900 focus:ring-2 focus:ring-green-500 focus:outline-none transition"
              value={drop}
              onChange={(e) => setDrop(e.target.value)}
              placeholder="Enter destination"
              required
            />
            <div className="flex gap-2 mt-2 text-sm">
              <span className="text-gray-600">Quick Select:</span>
              <button
                type="button"
                className="bg-blue-100 px-3 py-1 rounded-full hover:bg-blue-200"
                onClick={() => setDrop(home)}
              >
                🏠 Home
              </button>
              <button
                type="button"
                className="bg-purple-100 px-3 py-1 rounded-full hover:bg-purple-200"
                onClick={() => setDrop(office)}
              >
                🏢 Office
              </button>
            </div>
          </div>
          

          {/* Ride Type */}
          <div>
            <label className="block text-sm font-medium text-gray-800 mb-2">
              Ride Type
            </label>
            <select
              className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2 text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
              value={rideType}
              onChange={(e) => setRideType(e.target.value)}
            >
              <option>Economy</option>
              <option>Comfort</option>
              <option>Premium</option>
              <option>XL</option>
            </select>
          </div>

          {/* Payment Mode */}
          <div>
            <label className="block text-sm font-medium text-gray-800 mb-2">
              Payment Mode
            </label>
            <div className="grid grid-cols-3 gap-4">
              {["Cash", "Card", "Wallet"].map((mode) => {
                const icons = { Cash: "💵", Card: "💳", Wallet: "👛" };
                const isSelected = paymentMode === mode;
                return (
                  <button
                    key={mode}
                    type="button"
                    className={`flex flex-col items-center border rounded-lg py-3 transition ${
                      isSelected
                        ? "bg-blue-100 text-blue-800 border-blue-300 ring-2 ring-blue-400"
                        : "bg-gray-50 hover:bg-gray-100 text-gray-700 border-gray-300"
                    }`}
                    onClick={() => setPaymentMode(mode)}
                  >
                    <span className="text-2xl">{icons[mode]}</span>
                    <span className="mt-1 text-sm font-semibold">{mode}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Fare and Status */}
          {fare && (
            <div className="text-green-700 font-semibold">
              Estimated Fare: ₹{fare} • ETA: {estimate}
            </div>
          )}
          {error && <div className="text-red-500 font-medium">{error}</div>}
          {success && (
            <div className="text-green-600 font-medium">{success}</div>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg shadow-md transition transform hover:scale-[1.01]"
          >
            🚕 Book Ride Now
          </button>
        </form>
      </div>
    </section>
  );
}
