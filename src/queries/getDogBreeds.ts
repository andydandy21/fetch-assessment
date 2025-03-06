import { API_URL } from "../const";
import { handle } from "../utils/handle";

export const getDogBreeds = async () => {
  return await handle<string[]>(
    fetch(API_URL + "/dogs/breeds", {
      credentials: "include",
    }),
  );
};
