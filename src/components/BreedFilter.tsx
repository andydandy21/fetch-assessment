import { Link, useSearch } from "@tanstack/react-router";
import MiniSearch from "minisearch";
import { useState } from "react";
import FavoritesModal from "./FavoritesModal";
import OrderResults from "./OrderResults";

type DogBreedFilterProps = {
  breedSearch: MiniSearch;
};

export default function (props: DogBreedFilterProps) {
  const searchParams = useSearch({ from: "/" });
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="relative mb-8 w-full">
      <div>
        <div className="mb-1 flex gap-4">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search Breeds"
            className="w-full rounded border p-2"
          />
          <OrderResults />
          <FavoritesModal />
        </div>
        <div className="flex gap-2">
          {searchParams.breeds?.map((breed) => (
            <span
              className="flex w-min items-center rounded-full border bg-blue-200 px-2 py-0.5 text-sm whitespace-nowrap"
              key={breed}
            >
              {breed}
              <Link
                to={"/"}
                search={{
                  ...searchParams,
                  from: 0,
                  breeds: searchParams.breeds?.filter((b) => b !== breed),
                }}
                className="[&>svg]:fill-gray-500"
                key={breed}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="16px"
                  viewBox="0 -960 960 960"
                  width="16px"
                >
                  <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
                </svg>
              </Link>
            </span>
          ))}
        </div>
      </div>
      <div className="absolute z-10 flex flex-col overflow-hidden rounded border-gray-100 bg-white shadow-md">
        {props.breedSearch
          .search(searchTerm, { fuzzy: 0.75 })
          .filter((result) => !searchParams.breeds?.includes(result.breed))
          .slice(0, 5)
          .map((result, index) => (
            <Link
              className="px-4 py-2 first:pt-4 last:pb-4 hover:bg-gray-200"
              to={"/"}
              search={{
                ...searchParams,
                from: 0,
                breeds: Array.from(
                  new Set([...(searchParams.breeds ?? []), result.breed]),
                ),
              }}
              key={index}
              onClick={() => setSearchTerm("")}
            >
              {result.breed}
            </Link>
          ))}
      </div>
    </div>
  );
}
