import { useState } from "react";
import useFavoritesContext from "../hooks/useFavoritesContext";
import { Dog } from "../types";
import FavoriteButton from "./FavoriteButton";

type DogCardProps = {
  dog: Dog;
};

export default function DogCard(props: DogCardProps) {
  const { favorites, dispatch } = useFavoritesContext();
  const [isFavorite, setIsFavorite] = useState(favorites.has(props.dog.id));

  const handleClick = () => {
    if (favorites.has(props.dog.id)) {
      dispatch({ type: "remove", id: props.dog.id });
    } else {
      dispatch({ type: "add", id: props.dog.id });
    }
    setIsFavorite(!isFavorite);
  };

  return (
    <div className="m-auto w-full rounded border p-4">
      <div className="relative m-auto overflow-hidden rounded bg-black">
        <img
          className="h-60 w-full object-contain object-center"
          src={props.dog.img}
          alt={`${props.dog.name}, a beautiful ${props.dog.breed}`}
        />
        <FavoriteButton
          dogId={props.dog.id}
          className="absolute top-3 right-3"
        />
      </div>
      <div className="p-1">
        <div className="flex justify-between gap-2 *:text-2xl *:font-bold">
          <h2>{props.dog.name}</h2>
          <p>Age: {props.dog.age} years</p>
        </div>
        <div className="flex justify-between *:text-sm">
          <p>Breed: {props.dog.breed}</p>
          <p>Zip: {props.dog.zip_code}</p>
        </div>
      </div>
    </div>
  );
}
