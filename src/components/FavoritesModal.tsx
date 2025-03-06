import { useState } from "react";
import useFavoritesContext from "../hooks/useFavoritesContext";
import { getDogDetails } from "../queries/getDogDetails";
import { Dog } from "../types";
import Button from "./Button";
import FavoriteButton from "./FavoriteButton";
import Modal from "./Modal";

export default function () {
  const { favorites, dispatch } = useFavoritesContext();
  const [favoriteDogs, setFavoriteDogs] = useState<Dog[]>();

  const openModal = async () => {
    const dogs = await getDogDetails(Array.from(favorites));
    setFavoriteDogs(dogs);
  };

  const closeModal = () => {
    setFavoriteDogs(undefined);
  };

  const handleClearFavorites = () => {
    dispatch({ type: "clear" });
    closeModal();
  };

  return (
    <>
      <Button className="whitespace-nowrap" onClick={openModal}>
        Show Favorites
      </Button>
      {favoriteDogs && (
        <Modal>
          <div className="flex justify-between py-2">
            <Button onClick={closeModal}>Close</Button>
            <h3 className="text-4xl">Favorites</h3>
            <Button
              className="border-red-700 bg-red-300 text-red-700 hover:bg-red-200"
              onClick={handleClearFavorites}
            >
              Clear
            </Button>
          </div>
          <div className="flex max-h-[60svh] w-full flex-col gap-4 overflow-y-scroll py-4">
            {favoriteDogs.length > 0 ? (
              favoriteDogs.map((dog) => <FavoriteCard key={dog.id} dog={dog} />)
            ) : (
              <p className="my-8 text-center text-xl font-bold">
                Currently there are no favorites selected.
              </p>
            )}
          </div>
        </Modal>
      )}
    </>
  );
}

type FavoriteCardProps = {
  dog: Dog;
};

const FavoriteCard = (props: FavoriteCardProps) => {
  return (
    <div className="flex gap-4">
      <div className="overflow-hidden rounded bg-black">
        <img
          src={props.dog.img}
          alt={props.dog.name}
          className="h-24 w-24 object-contain object-center"
        />
      </div>
      <div className="h-full w-full *:flex *:justify-between">
        <div className="pb-4">
          <h3 className="text-2xl font-bold">{props.dog.name}</h3>
          <p>Age: {props.dog.age}</p>
        </div>
        <div>
          <p>{props.dog.breed}</p>
          <p>Zip: {props.dog.zip_code}</p>
        </div>
      </div>
      <div>
        <FavoriteButton dogId={props.dog.id} />
      </div>
    </div>
  );
};
