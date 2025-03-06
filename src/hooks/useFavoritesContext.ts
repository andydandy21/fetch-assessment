import { useContext } from "react";
import { FavoritesContext } from "../routes/__root";

export default function () {
  const favoritesContext = useContext(FavoritesContext);
  if (!favoritesContext) throw new Error("FavoritesContext is not available");

  const { favorites, dispatch } = favoritesContext;

  return { favorites, dispatch };
}
