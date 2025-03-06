import { Dog } from "../types";
import DogCard from "./DogCard";

type DogListProps = {
  dogs?: Dog[];
};

export default function DogList(props: DogListProps) {
  if (!props.dogs) return null;
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {props.dogs.map((dog: Dog) => (
        <DogCard key={dog.id} dog={dog} />
      ))}
    </div>
  );
}
