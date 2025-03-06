export const getFavorites = () => {
  const favorites = localStorage.getItem("favorites");
  const favoritesList = favorites ? (JSON.parse(favorites) as string[]) : [];
  return new Set<string>(favoritesList);
};

export const addFavorite = (id: string) => {
  const LIMIT = 100;

  const favorites = getFavorites();
  if (favorites.size >= LIMIT) {
    return false;
  }

  favorites.add(id);
  localStorage.setItem("favorites", JSON.stringify(Array.from(favorites)));
  return true;
};

export const removeFavorite = (id: string) => {
  const favorites = getFavorites();
  if (!favorites.has(id)) {
    return false;
  }

  favorites.delete(id);
  localStorage.setItem("favorites", JSON.stringify(Array.from(favorites)));
  return true;
};

export const clearFavorites = () => {
  localStorage.removeItem("favorites");
  return true;
};
