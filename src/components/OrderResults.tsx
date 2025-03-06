import { useNavigate, useSearch } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export default function () {
  const searchParams = useSearch({ from: "/" });
  const navigate = useNavigate();
  const [order, setOrder] = useState(
    searchParams.sort?.split(":")[0] ?? "breed",
  );
  const [direction, setDirection] = useState(
    searchParams.sort?.split(":")[1] ?? "asc",
  );

  useEffect(() => {
    const sort = `${order}:${direction}`;
    navigate({
      to: "/",
      search: { ...searchParams, sort: sort },
    });
  }, [order, direction]);

  return (
    <div className="flex items-center gap-2 whitespace-nowrap">
      <p>order by:</p>
      <select
        className="w-min"
        name="order"
        defaultValue={order}
        onChange={(event) => setOrder(event.target.value)}
      >
        <option value="breed">breed</option>
        <option value="name">name</option>
        <option value="age">age</option>
      </select>
      <select
        className="w-min"
        name="direction"
        defaultValue={direction}
        onChange={(event) => setDirection(event.target.value)}
      >
        <option value="asc">ascending</option>
        <option value="desc">descending</option>
      </select>
    </div>
  );
}
