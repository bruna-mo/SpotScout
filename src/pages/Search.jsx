import { useState } from "react";
import { searchRestaurants } from "../services/api";
import { isSaved, saveRestaurant, removeRestaurant } from "../utils/storage";

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
    <div className="container">
      <div className="header">
        <div className="brand">
          <h1>SpotScout</h1>
          <p>Find restaurants in any city.</p>
        </div>

        <nav className="nav">
          <a href="/">Search</a>
          <a href="/saved">Saved</a>
        </nav>
      </div>

      <div className="panel">
        <div className="formCenter">
        <form onSubmit={onSearch} className="form">
          <label>
            City
            <input
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Vancouver"
            />
          </label>

          <label>
            Keyword (optional)
            <input
              value={term}
              onChange={(e) => setTerm(e.target.value)}
              placeholder="sushi, pizza..."
            />
          </label>

          <button
            className="btn btnPrimary"
            type="submit"
            disabled={status === "loading"}
          >
            {status === "loading" ? "Searching..." : "Search"}
          </button>
        </form>
        </div>
        <div style={{ marginTop: 16 }}>
          {status === "idle" && <p className="muted" style={{ textAlign: "center" }}>Enter a city to start.</p>}
          {status === "loading" && <p className="muted">Loading…</p>}
          {status === "empty" && (
            <p className="muted">No restaurants found. Try another keyword.</p>
          )}

          {status === "error" && (
            <div className="card" style={{ marginTop: 12 }}>
              <div className="cardBody">
                <p style={{ marginTop: 0 }}>
                  <strong>Error:</strong> {error}
                </p>
                <button className="btn btnSecondary" onClick={onSearch} type="button">
                  Retry
                </button>
              </div>
            </div>
          )}

          {status === "success" && (
            <div className="grid">
              {results.map((r) => {
                const saved = isSaved(r.id);

                return (
                  <div key={r.id} className="card">
                    {r.image_url && (
                      <img className="thumb" src={r.image_url} alt={r.name} />
                    )}

                    <div className="cardBody">
                      <div className="row">
                        <div style={{ display: "grid", gap: 4 }}>
                          <strong>{r.name}</strong>
                          <span className="muted" style={{ fontSize: 13 }}>
                            {r.rating ? `⭐ ${r.rating}` : ""}
                            {r.review_count ? ` • ${r.review_count} reviews` : ""}
                            {r.price ? ` • ${r.price}` : ""}
                          </span>
                        </div>

                        <button
                          className={`btn ${saved ? "btnPrimary" : "btnSecondary"}`}
                          type="button"
                          onClick={() => {
                            if (saved) removeRestaurant(r.id);
                            else saveRestaurant(r);

                            setResults((prev) => [...prev]);
                          }}
                        >
                          {saved ? "★ Saved" : "☆ Save"}
                        </button>
                      </div>

                      <p className="muted" style={{ margin: "10px 0 0" }}>
                        {r.location}
                      </p>

                      {(r.categories || []).length > 0 && (
                        <div className="chips">
                          {(r.categories || []).slice(0, 4).map((c) => (
                            <span key={c} className="chip">
                              {c}
                            </span>
                          ))}
                        </div>
                      )}

                      {r.url && (
                        <div style={{ marginTop: 12 }}>
                          <a href={r.url} target="_blank" rel="noreferrer">
                            View on Yelp
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
