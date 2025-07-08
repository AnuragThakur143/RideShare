import { useState, useEffect } from "react";
import RideHistory from "../components/RideHistory.jsx";
import { apiRequest } from "../api.jsx";

export default function DriverDashboard() {
  const [activeRides, setActiveRides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [history, setHistory] = useState([]);

  const token = localStorage.getItem("token");
  const myName = localStorage.getItem("name");
  const myUserId = localStorage.getItem("userId");

  const fetchRides = async () => {
    setLoading(true);
    setError("");
    try {
      const active = await apiRequest("/rides/requested", "GET", null, token);
      setActiveRides(active);
      const all = await apiRequest("/rides/history", "GET", null, token);
      setHistory(
        all.filter(
          (r) => r.driverId && myUserId && r.driverId.toString() === myUserId
        )
      );
    } catch (err) {
      setError("Failed: " + err.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchRides();
    const interval = setInterval(fetchRides, 10000);
    return () => clearInterval(interval);
  }, []);

  const acceptRide = async (ride) => {
    try {
      await apiRequest(
        `/rides/status/${ride.id}`,
        "POST",
        { status: "ACCEPTED", driverId: myUserId },
        token
      );
      fetchRides();
    } catch (err) {
      setError("Failed: " + err.message);
    }
  };

  const updateStatus = async (rideId, status) => {
    try {
      await apiRequest(`/rides/status/${rideId}`, "POST", { status }, token);
      fetchRides();
    } catch (err) {
      setError("Failed: " + err.message);
    }
  };

  return (
    <div className="container mx-auto py-10 px-4 md:px-0 font-sans">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-br from-yellow-400 to-orange-500 text-white rounded-3xl shadow-2xl p-8 mb-10 transform transition-all duration-300 hover:scale-[1.01]">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl font-bold mb-2 drop-shadow">
              Welcome, Driver!
            </h1>
            <p className="text-lg opacity-90">
              Thank you for keeping the city moving. Have a great day on the
              road!
            </p>
          </div>
          <div className="flex gap-6">
            {[
              { icon: "🚗", value: "85", label: "Rides Today" },
              { icon: "💰", value: "₹1,200", label: "Earnings" },
              { icon: "⭐", value: "4.9/5", label: "Rating" },
            ].map((stat, i) => (
              <div
                key={i}
                className="bg-white/20 backdrop-blur-md rounded-xl px-5 py-4 flex flex-col items-center hover:bg-white/30 transition"
              >
                <span className="text-2xl">{stat.icon}</span>
                <span className="text-lg font-semibold">{stat.value}</span>
                <span className="text-sm">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {error && <div className="text-red-500 font-medium mb-4">{error}</div>}

      {loading ? (
        <div className="text-center text-gray-600 text-lg">Loading...</div>
      ) : (
        <>
          <h2 className="text-2xl font-bold mb-6 text-gray-800">
            Active Rides
          </h2>
          {activeRides.length === 0 ? (
            <div className="text-gray-600">No active rides at the moment.</div>
          ) : (
            <div className="space-y-6 mb-10">
              {activeRides.map((ride) => (
                <div
                  key={ride.id}
                  className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition transform hover:scale-[1.01]"
                >
                  <div className="grid gap-3 text-gray-800">
                    <div className="flex items-center gap-2">
                      <span className="text-blue-600 text-xl">📍</span>
                      <span>
                        Pickup:{" "}
                        <span className="font-semibold">
                          {ride.pickupLocation}
                        </span>
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-green-600 text-xl">🏁</span>
                      <span>
                        Drop:{" "}
                        <span className="font-semibold">
                          {ride.dropLocation}
                        </span>
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-yellow-600 text-xl">💸</span>
                      <span>
                        Fare:{" "}
                        <span className="font-semibold">₹{ride.fare}</span>
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-purple-600 text-xl">🔖</span>
                      <span>
                        Status:{" "}
                        <span className="font-semibold">{ride.status}</span>
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-pink-600 text-xl">💳</span>
                      <span>
                        Payment:{" "}
                        <span className="font-semibold">
                          {ride.paymentMode}
                        </span>
                      </span>
                    </div>
                  </div>

                  {/* Ride Buttons */}
                  <div className="flex gap-3 mt-5 flex-wrap">
                    {ride.status === "REQUESTED" && (
                      <button
                        className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl shadow"
                        onClick={() => acceptRide(ride)}
                      >
                        Accept
                      </button>
                    )}
                    {ride.status === "ACCEPTED" &&
                      ride.driverId?.toString() === myUserId && (
                        <button
                          className="bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-2 rounded-xl shadow"
                          onClick={() => updateStatus(ride.id, "PICKED")}
                        >
                          Picked
                        </button>
                      )}
                    {ride.status === "PICKED" &&
                      ride.driverId?.toString() === myUserId && (
                        <button
                          className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-xl shadow"
                          onClick={() => updateStatus(ride.id, "COMPLETED")}
                        >
                          Complete
                        </button>
                      )}
                  </div>
                </div>
              ))}
            </div>
          )}

          <RideHistory rides={history} />

          {/* Tips Section */}
          <section className="mt-14">
            <h2 className="text-2xl font-bold mb-5 text-gray-800">
              Driver Tips & Recognition
            </h2>
            <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {[
                {
                  icon: "🦺",
                  text: "Always wear your helmet and follow traffic rules.",
                },
                {
                  icon: "😊",
                  text: "Greet your riders with a smile for a great experience.",
                },
                {
                  icon: "🧼",
                  text: "Keep your vehicle clean and well-maintained.",
                },
                {
                  icon: "🏆",
                  text: "Top 10% drivers this week! Keep up the great work.",
                },
              ].map((tip, idx) => (
                <div
                  key={idx}
                  className="bg-yellow-50 hover:bg-yellow-100 transition rounded-2xl p-5 flex items-start gap-3 shadow-sm hover:shadow-md"
                >
                  <span className="text-3xl">{tip.icon}</span>
                  <p className="text-gray-700">{tip.text}</p>
                </div>
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  );
}
