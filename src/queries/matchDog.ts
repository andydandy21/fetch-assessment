import { API_URL } from "../const";
import { handle } from "../utils/handle";

export const matchDog = async (ids: string[]) => {
  return await handle<{ match: string }>(
    fetch(API_URL + "/dogs/match", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(ids),
    }),
  );
};
