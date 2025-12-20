export default async function handler(req, res) {
  try {
    const { city, term = "" } = req.query;

    if (!city || city.trim().length < 2) {
      return res.status(400).json({ error: "Missing required query param: city" });
    }

    const apiKey = process.env.YELP_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: "Server misconfigured: missing YELP_API_KEY" });
    }

    const params = new URLSearchParams({
      location: city,
      term,
      categories: "restaurants",
      limit: "20",
      sort_by: "best_match",
    });

    const yelpRes = await fetch(`https://api.yelp.com/v3/businesses/search?${params}`, {
      headers: { Authorization: `Bearer ${apiKey}` },
    });

    const data = await yelpRes.json();

    if (!yelpRes.ok) {
      return res.status(yelpRes.status).json({
        error: data?.error?.description || "Yelp API error",
      });
    }

    const businesses = (data.businesses || []).map((b) => ({
      id: b.id,
      name: b.name,
      rating: b.rating,
      review_count: b.review_count,
      price: b.price || null,
      url: b.url,
      image_url: b.image_url,
      location: b.location?.display_address?.join(", ") || "",
      categories: (b.categories || []).map((c) => c.title),
    }));

    return res.status(200).json({ businesses });
  } catch {
    return res.status(500).json({ error: "Unexpected server error" });
  }
}
