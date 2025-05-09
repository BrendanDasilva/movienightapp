import React, { useEffect, useState } from "react";
import axios from "axios";
import LoadingDots from "../components/LoadingDots";

const Logs = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const res = await axios.get("/api/logs", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setLogs(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        setError(err.response?.data?.error || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLogs();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingDots />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 text-red-500 text-center">
        Error loading logs: {error}
      </div>
    );
  }

  return (
    <div className="p-8 max-w-6xl mx-auto ">
      <h1 className="text-2xl font-bold mt-20 mb-6 text-white">
        Movie Selection History
      </h1>

      {logs.length === 0 ? (
        <div className="text-gray-500 text-center">
          No selection history found
        </div>
      ) : (
        logs.map((log, idx) => (
          <div
            key={idx}
            className="mb-8 p-4 bg-[#202830] text-white rounded shadow"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">
                {new Date(log.date).toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </h3>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {log.movies.map((movie, movieIdx) => (
                <div
                  key={movieIdx}
                  className={`relative h-64 rounded-lg overflow-hidden ${
                    !movie.isSelected ? "grayscale" : ""
                  }`}
                >
                  {movie.poster ? (
                    <img
                      src={movie.poster}
                      alt={movie.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                      {movie.title || "No poster available"}
                    </div>
                  )}
                  <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2">
                    <div className="flex justify-between items-center">
                      <span className="truncate">{movie.title}</span>
                      {movie.isSelected && (
                        <span className="ml-2 text-green-400">✓</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Logs;
