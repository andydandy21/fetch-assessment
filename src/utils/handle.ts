import { redirect } from "@tanstack/react-router";

type Query = Promise<Response>;

export const handle = async <T>(query: Query) => {
  const res = await query;
  if (res.status === 200) {
    const json = await res.json();
    return json as T;
  } else if (res.status === 401) {
    throw redirect({
      to: "/login",
    });
  }
};
