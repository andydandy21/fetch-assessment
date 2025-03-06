import { Outlet, createRootRoute } from "@tanstack/react-router";
import { createContext } from "react";
import Header from "../components/Header";
import useFavoritesReducer, {
  FavoriteAction,
} from "../hooks/useFavoritesReducer";

export const Route = createRootRoute({
  component: RootComponent,
});

type FavoritesContextType = {
  favorites: Set<string>;
  dispatch: React.Dispatch<FavoriteAction>;
};
export const FavoritesContext = createContext<FavoritesContextType | null>(
  null,
);

function RootComponent() {
  const [favorites, dispatch] = useFavoritesReducer();

  return (
    <FavoritesContext.Provider value={{ favorites, dispatch }}>
      <div className="m-auto max-w-7xl">
        <Header />
        <main className="px-8">
          <Outlet />
        </main>
      </div>
    </FavoritesContext.Provider>
  );
}
