import { useEffect, useState } from "react";
import { removeRestaurant, getSaved } from "../utils/storage";
import { Link } from "react-router-dom";

export default function Saved() {
  const [saved, setSaved] = useState([]);

  useEffect(() => {
    setSaved(getSaved());
  }, []);

  const onRemove = (id) => {
    removeRestaurant(id);
    setSaved(getSaved());
  };

  return (
    <div className="container">
      {/* Header */}
      <div className="header">
        <div className="brand">
          <h1>SpotScout</h1>
          <p>Your saved restaurants</p>
        </div>

        <nav className="nav">
          <Link to="/">Search</Link>
          <Link to="/saved">Saved</Link>
        </nav>
      </div>

      {/* Content */}
      <div className="panel">
        {saved.length === 0 ? (
          <p className="muted">
            You haven’t saved any restaurants yet.
          </p>
        ) : (
          <div className="grid">
            {saved.map((r) => (
              <div key={r.id} className="card">
                {r.image_url && (
                  <img
                    src={r.image_url}
                    alt={r.name}
                    className="thumb"
                  />
                )}

                <div className="cardBody">
                  <div className="row">
                    <div style={{ display: "grid", gap: 4 }}>
                      <strong>{r.name}</strong>
                      <span className="muted" style={{ fontSize: 13 }}>
                        {r.rating ? `⭐ ${r.rating}` : ""}
                        {r.review_count
                          ? ` • ${r.review_count} reviews`
                          : ""}
                        {r.price ? ` • ${r.price}` : ""}
                      </span>
                    </div>

                    <button
                      className="btn btnSecondary"
                      type="button"
                      onClick={() => onRemove(r.id)}
                    >
                      Remove
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
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
