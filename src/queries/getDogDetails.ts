import { API_URL } from "../const";
import { Dog } from "../types";
import { handle } from "../utils/handle";

export const getDogDetails = async (resultIds: string[]) => {
  return await handle<Dog[]>(
    fetch(API_URL + "/dogs/", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(resultIds),
    }),
  );
};
