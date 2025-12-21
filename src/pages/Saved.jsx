import { useEffect, useState } from "react";
import { getSaved, removeRestaurant } from "../utils/storage";

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
    <div style={{ maxWidth: 760, margin: "0 auto", padding: 24, fontFamily: "system-ui" }}>
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
        <h1 style={{ marginBottom: 6 }}>Saved</h1>
        <a href="/" style={{ fontSize: 14 }}>← Back to search</a>
      </header>

      <p style={{ marginTop: 0 }}>Restaurants you’ve saved.</p>

      {saved.length === 0 ? (
        <p>No saved restaurants yet. Go search and hit “Save”.</p>
      ) : (
        <div style={{ display: "grid", gap: 12 }}>
          {saved.map((r) => (
            <div key={r.id} style={{ border: "1px solid #ddd", borderRadius: 12, padding: 12 }}>
              <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
                <strong>{r.name}</strong>
                <button type="button" onClick={() => onRemove(r.id)}>
                  Remove
                </button>
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
  );
}
