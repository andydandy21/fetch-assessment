import { createFileRoute } from "@tanstack/react-router";
import MiniSearch from "minisearch";
import { parse } from "valibot";
import BreedFilter from "../components/BreedFilter";
import DogList from "../components/DogList";
import Pagination from "../components/Pagination";
import { getDogBreeds } from "../queries/getDogBreeds";
import { getDogDetails } from "../queries/getDogDetails";
import { searchDogs } from "../queries/searchDogs";
import { DogSearchParams, dogSearchSchema } from "../validaters/searchParams";

export const Route = createFileRoute("/")({
  component: HomeComponent,
  validateSearch: (search): DogSearchParams => parse(dogSearchSchema, search),
  loaderDeps: ({ search }) => search,
  loader: async ({ deps }) => {
    const dogSearch = await searchDogs(deps);
    const dogDetails = dogSearch && (await getDogDetails(dogSearch.resultIds));
    const dogBreeds = await getDogBreeds();
    const miniSearch = new MiniSearch({
      fields: ["breed"],
      storeFields: ["breed"],
    });
    if (dogBreeds) {
      miniSearch.addAll(
        dogBreeds.map((breed, index) => ({ id: index, breed })),
      );
    }

    return { deps, dogSearch, dogDetails, miniSearch };
  },
});

function HomeComponent() {
  const data = Route.useLoaderData();

  return (
    <>
      <h1 className="pb-4 text-4xl">Search Dogs</h1>
      <BreedFilter breedSearch={data.miniSearch} />
      <DogList dogs={data.dogDetails} />
      <Pagination results={data.dogSearch} />
    </>
  );
}
