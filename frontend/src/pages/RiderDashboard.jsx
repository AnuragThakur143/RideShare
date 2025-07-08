import { useState, useEffect } from "react";
import RideBookingForm from "../components/RideBookingForm.jsx";
import RideStatus from "../components/RideStatus.jsx";
import RideHistory from "../components/RideHistory.jsx";
import { apiRequest } from "../api.jsx";

export default function RiderDashboard() {
  const [rides, setRides] = useState([]);
  const [currentRide, setCurrentRide] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");

  const fetchRides = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await apiRequest("/rides/history", "GET", null, token);
      setRides(data);
      const active = data.find((r) => r.status?.toUpperCase() !== "COMPLETED");
      setCurrentRide(active || null);
    } catch (err) {
      setError("Failed: " + err.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchRides();
  }, []);

  const handleRefresh = () => {
    fetchRides();
  };

  return (
    <div className="container mx-auto px-4 py-10 font-sans text-gray-800">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-3xl shadow-xl p-8 mb-12 transition hover:scale-[1.01]">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <h1 className="text-4xl font-bold mb-1 drop-shadow">
              Welcome, Rider!
            </h1>
            <p className="text-lg opacity-90">
              Book your next ride in just a few taps.
            </p>
          </div>
          <div className="flex gap-6">
            {[
              { icon: "⭐", value: "4.1/5", label: "Rating" },
              { icon: "🛣️", value: "117", label: "Trips" },
              { icon: "💸", value: "₹21,500", label: "Saved" },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white/20 backdrop-blur-md rounded-xl px-5 py-4 flex flex-col items-center shadow hover:bg-white/30 transition"
              >
                <span className="text-2xl">{item.icon}</span>
                <span className="text-lg font-semibold">{item.value}</span>
                <span className="text-sm">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Error or Loading */}
      {error && <div className="text-red-600 font-medium mb-6">{error}</div>}
      {loading ? (
        <div className="text-center text-gray-500 text-lg">
          Loading rides...
        </div>
      ) : (
        <>
          {/* Ride Form or Status */}
          <div className="mb-12 animate-fade-in">
            {!currentRide ? (
              <RideBookingForm onBook={handleRefresh} />
            ) : (
              <RideStatus ride={currentRide} onComplete={handleRefresh} />
            )}
          </div>

          {/* Ride History */}
          <div className="mb-16">
            <RideHistory />
          </div>

          {/* Tips Section */}
          <section>
            <h2 className="text-2xl font-bold mb-6">
              ✨ Tips for a Great Ride
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {[
                {
                  icon: "🪪",
                  text: "Verify your driver and vehicle before starting the ride.",
                },
                {
                  icon: "💳",
                  text: "Use UPI or cards for hassle-free payments.",
                },
                {
                  icon: "📱",
                  text: "Share your live location with a trusted contact.",
                },
                {
                  icon: "⭐",
                  text: "Rate your driver to help improve the service.",
                },
              ].map((tip, index) => (
                <div
                  key={index}
                  className="bg-white border border-gray-100 shadow-md rounded-2xl p-5 flex gap-4 items-start hover:shadow-lg transition"
                >
                  <span className="text-3xl">{tip.icon}</span>
                  <p className="text-gray-700 leading-snug">{tip.text}</p>
                </div>
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  );
}
