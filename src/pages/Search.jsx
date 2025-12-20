import { useState } from "react";
import { searchRestaurants } from "../services/api";

export default function Search() {
  const [city, setCity] = useState("");
  const [term, setTerm] = useState("");
  const [status, setStatus] = useState("idle"); // idle | loading | success | empty | error
  const [error, setError] = useState("");
  const [results, setResults] = useState([]);

  const onSearch = async (e) => {
    e.preventDefault();
    setError("");
    setResults([]);

    if (!city.trim()) {
      setStatus("error");
      setError("Please enter a city.");
      return;
    }

    try {
      setStatus("loading");
      const businesses = await searchRestaurants({ city, term });

      if (businesses.length === 0) {
        setStatus("empty");
        return;
      }

      setResults(businesses);
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setError(err.message || "Something went wrong.");
    }
  };

  return (
    <div style={{ maxWidth: 760, margin: "0 auto", padding: 24, fontFamily: "system-ui" }}>
      <h1 style={{ marginBottom: 6 }}>SpotScout</h1>
      <p style={{ marginTop: 0 }}>Find restaurants in any city.</p>

      <form onSubmit={onSearch} style={{ display: "grid", gap: 10, maxWidth: 520 }}>
        <label style={{ display: "grid", gap: 6 }}>
          City
          <input value={city} onChange={(e) => setCity(e.target.value)} placeholder="Vancouver" />
        </label>

        <label style={{ display: "grid", gap: 6 }}>
          Keyword (optional)
          <input value={term} onChange={(e) => setTerm(e.target.value)} placeholder="sushi, pizza..." />
        </label>

        <button type="submit" disabled={status === "loading"}>
          {status === "loading" ? "Searching..." : "Search"}
        </button>
      </form>

      <div style={{ marginTop: 16 }}>
        {status === "idle" && <p>Enter a city to start.</p>}
        {status === "loading" && <p>Loading…</p>}
        {status === "empty" && <p>No restaurants found. Try another keyword.</p>}
        {status === "error" && (
          <>
            <p><strong>Error:</strong> {error}</p>
            <button onClick={onSearch} type="button">Retry</button>
          </>
        )}

        {status === "success" && (
          <div style={{ display: "grid", gap: 12 }}>
            {results.map((r) => (
              <div key={r.id} style={{ border: "1px solid #ddd", borderRadius: 12, padding: 12 }}>
                <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
                  <strong>{r.name}</strong>
                  <span>{r.rating ? `⭐ ${r.rating}` : ""}</span>
                </div>
                <p style={{ margin: "6px 0" }}>{r.location}</p>
                {r.url && (
                  <a href={r.url} target="_blank" rel="noreferrer">
                    View on Yelp
                  </a>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
