import { API_URL } from "../const";
import { DogSearchResult } from "../types";
import { handle } from "../utils/handle";
import stringifySearchParams from "../utils/stringifySearchParams";
import { DogSearchParams } from "../validaters/searchParams";

export const searchDogs = async (searchParams: DogSearchParams) => {
  const searchString = stringifySearchParams(searchParams);
  return await handle<DogSearchResult>(
    fetch(API_URL + "/dogs/search" + searchString, {
      credentials: "include",
    }),
  );
};
