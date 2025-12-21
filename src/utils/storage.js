const KEY = "spotscout_saved";

export function getSaved() {
  try {
    return JSON.parse(localStorage.getItem(KEY)) || [];
  } catch {
    return [];
  }
}

export function isSaved(id) {
  return getSaved().some((r) => r.id === id);
}

export function saveRestaurant(restaurant) {
  const saved = getSaved();
  if (saved.some((r) => r.id === restaurant.id)) return;
  localStorage.setItem(KEY, JSON.stringify([restaurant, ...saved]));
}

export function removeRestaurant(id) {
  const saved = getSaved().filter((r) => r.id !== id);
  localStorage.setItem(KEY, JSON.stringify(saved));
}
