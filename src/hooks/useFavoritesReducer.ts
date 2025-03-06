import { useReducer } from "react";
import {
  addFavorite,
  clearFavorites,
  getFavorites,
  removeFavorite,
} from "../utils/store";

type ChangeFavorites = {
  type: "add" | "remove";
  id: string;
};

type ClearFavorites = {
  type: "clear";
};

export type FavoriteAction = ChangeFavorites | ClearFavorites;

export const favoritesReducer = (
  favorites: Set<string>,
  action: FavoriteAction,
) => {
  switch (action.type) {
    case "add":
      if (!addFavorite(action.id)) throw new Error("Failed to add favorite");
      return new Set([...favorites, action.id]);
    case "remove":
      if (!removeFavorite(action.id))
        throw new Error("Failed to remove favorite");
      const newFavorites = new Set([...favorites]);
      newFavorites.delete(action.id);
      return newFavorites;
    case "clear":
      if (!clearFavorites()) throw new Error("Failed to clear favorites");
      return new Set<string>();
    default:
      throw new Error("Invalid action type");
  }
};

export default function useFavorites() {
  return useReducer(favoritesReducer, getFavorites());
}
