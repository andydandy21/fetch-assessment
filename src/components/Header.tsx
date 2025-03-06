import { useState } from "react";
import useFavoritesContext from "../hooks/useFavoritesContext";
import { getDogDetails } from "../queries/getDogDetails";
import { matchDog } from "../queries/matchDog";
import { Dog } from "../types";
import Button from "./Button";
import DogCard from "./DogCard";
import Logout from "./Logout";
import Modal from "./Modal";

export default function () {
  const { favorites } = useFavoritesContext();
  const [showMatch, setShowMatch] = useState<Dog>();

  const handleMatch = async () => {
    const favoritesArray = Array.from(favorites);
    const matchRes = await matchDog(favoritesArray);
    const matchId = matchRes ? matchRes.match : "";
    const matchedDog = await getDogDetails([matchId]);
    setShowMatch(matchedDog ? matchedDog[0] : undefined);
  };

  return (
    <header className="my-4 flex items-center justify-between gap-4 rounded bg-gray-200 p-4">
      <h2 className="text-2xl font-bold">Fetch's Fetchers Fetcher</h2>
      <div>
        <Logout />
        <Button
          className="ml-4 !bg-blue-700 font-bold text-white hover:!bg-blue-600"
          onClick={handleMatch}
        >
          Find Your Match
        </Button>
      </div>
      {showMatch && (
        <Modal>
          <div className="flex pb-4">
            <h2 className="text-3xl">Found a match</h2>
          </div>
          <DogCard dog={showMatch} />
          <Button
            className="mt-4 w-full"
            onClick={() => setShowMatch(undefined)}
          >
            Close
          </Button>
        </Modal>
      )}
    </header>
  );
}
