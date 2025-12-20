export async function searchRestaurants({ city, term }) {
  const params = new URLSearchParams({
    city: city.trim(),
    term: term?.trim() || "",
  });

  const res = await fetch(`/api/search?${params}`);
  const data = await res.json();

  if (!res.ok) throw new Error(data?.error || "Request failed");
  return data.businesses || [];
}
