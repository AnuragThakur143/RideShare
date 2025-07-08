import { useState, useEffect } from "react";
import { apiRequest } from "../api.jsx";

export default function RideStatus({ ride, onComplete }) {
  const [currentRide, setCurrentRide] = useState(ride);
  const token = localStorage.getItem("token");

  useEffect(() => {
    setCurrentRide(ride);
    if (!ride) return;

    const fetchStatus = async () => {
      try {
        const data = await apiRequest(
          `/rides/status/${ride.id}`,
          "GET",
          null,
          token
        );
        setCurrentRide(data);
      } catch (err) {
        console.error("Error: " + err.message);
      }
    };

    fetchStatus();
    const interval = setInterval(fetchStatus, 10000);
    return () => clearInterval(interval);
  }, [ride]);

  useEffect(() => {
    if (currentRide && currentRide.status === "COMPLETED") {
      onComplete && onComplete();
    }
  }, [currentRide, onComplete]);

  if (!currentRide) return null;

  const statusSteps = [
    { key: "REQUESTED", label: "Requested", icon: "📝" },
    { key: "ACCEPTED", label: "Accepted", icon: "✅" },
    { key: "PICKED", label: "Picked", icon: "🚗" },
    { key: "COMPLETED", label: "Completed", icon: "🏁" },
  ];

  const currentStepIdx = statusSteps.findIndex(
    (step) => step.key === currentRide.status
  );

  return (
    <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl shadow-xl p-8 mb-6">
      <h2 className="text-2xl font-bold mb-6 text-blue-800 flex items-center gap-2">
        <span>🚕</span> Current Ride Status
      </h2>

      {/* Progress Bar */}
      <div className="flex items-center justify-between mb-10 relative">
        {statusSteps.map((step, idx) => (
          <div
            key={step.key}
            className="flex flex-col items-center flex-1 relative z-10"
          >
            <div
              className={`w-10 h-10 flex items-center justify-center rounded-full text-xl font-bold border-2 shadow-md ${
                idx < currentStepIdx
                  ? "bg-green-500 border-green-500 text-white"
                  : idx === currentStepIdx
                  ? "bg-blue-600 border-blue-600 text-white animate-pulse"
                  : "bg-gray-300 border-gray-300 text-white"
              }`}
            >
              {step.icon}
            </div>
            <span
              className={`mt-2 text-xs font-semibold ${
                idx <= currentStepIdx ? "text-blue-900" : "text-gray-500"
              }`}
            >
              {step.label}
            </span>
            {idx < statusSteps.length - 1 && (
              <div className="absolute top-5 left-[50%] w-full h-1 -z-10">
                <div
                  className={`h-full ${
                    idx < currentStepIdx ? "bg-green-400" : "bg-gray-300"
                  }`}
                ></div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Ride Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-gray-800 text-lg">
        <div className="flex items-center gap-2">
          <span className="text-blue-600 text-xl">📍</span>
          <span>
            Pickup:{" "}
            <span className="font-semibold">{currentRide.pickupLocation}</span>
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-green-600 text-xl">🏁</span>
          <span>
            Drop:{" "}
            <span className="font-semibold">{currentRide.dropLocation}</span>
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-yellow-600 text-xl">💸</span>
          <span>
            Fare: <span className="font-semibold">₹{currentRide.fare}</span>
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-purple-600 text-xl">🔖</span>
          <span>
            Status:{" "}
            <span
              className={`font-semibold px-3 py-1 rounded-full text-sm ${
                currentRide.status === "COMPLETED"
                  ? "bg-green-100 text-green-700"
                  : currentRide.status === "PICKED"
                  ? "bg-yellow-100 text-yellow-700"
                  : currentRide.status === "ACCEPTED"
                  ? "bg-blue-100 text-blue-700"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              {currentRide.status}
            </span>
          </span>
        </div>

        {currentRide.driver && (
          <div className="flex items-center gap-2 md:col-span-2">
            <span className="text-pink-600 text-xl">🧑‍✈️</span>
            <span>
              Driver:{" "}
              <span className="font-semibold">
                {currentRide.driver.name || "Assigned"}
              </span>
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
