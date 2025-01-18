import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Scores.css";

const Scores = () => {
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchScores = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No token found, redirecting to login...");
          // Kullanıcı giriş yapmamışsa yönlendirme yapılabilir
          return;
        }

        const response = await axios.get("https://localhost:7148/api/score", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setScores(response.data); // API'den gelen skor verilerini kaydet
      } catch (error) {
        console.error("Error fetching scores:", error);
      } finally {
        setLoading(false); // Yükleme işlemi tamamlandı
      }
    };

    fetchScores();
  }, []);

  return (
    <div className="scores-page">
      <h1>Player Scores</h1>
      {loading ? (
        <p>Loading scores...</p>
      ) : scores.length > 0 ? (
        <div className="scores-table-container">
          <table className="scores-table">
            <thead>
              <tr>
                <th>Game</th>
                <th>Time (sec)</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {scores.map((score) => (
                <tr key={score.id}>
                  <td>{score.gameName}</td>
                  <td>{score.time}</td>
                  <td>{new Date(score.date).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No scores available.</p>
      )}
    </div>
  );
};

export default Scores;
