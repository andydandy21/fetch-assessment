import { defaultStringifySearch } from "@tanstack/react-router";
import { DogSearchParams } from "../validaters/searchParams";

export default function stringifySearchParams(params: DogSearchParams): string {
  // deep copy
  const paramsCopy = JSON.parse(
    JSON.stringify({ ...params }),
  ) as DogSearchParams;
  const breeds = paramsCopy?.breeds;
  delete paramsCopy.breeds;

  const searchString = breeds
    ? "&" +
      breeds.map((breed) => "breeds=" + encodeURIComponent(breed)).join("&")
    : "";

  return defaultStringifySearch(paramsCopy) + searchString;
}
