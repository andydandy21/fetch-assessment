import { defaultParseSearch, Link, useSearch } from "@tanstack/react-router";
import { PropsWithChildren } from "react";
import { DogSearchResult } from "../types";
import { DogSearchParams } from "../validaters/searchParams";
import Button from "./Button";

type PaginationProps = {
  results?: DogSearchResult;
};

export default function (props: PaginationProps) {
  if (!props.results) return null;
  const searchParams = useSearch({ from: "/" });

  return (
    <div className="flex justify-between py-4">
      <PaginationNavigation link={props.results.prev} search={searchParams}>
        Previous
      </PaginationNavigation>
      <p>
        page {(searchParams.from ?? 0) / (searchParams.size ?? 1) + 1} of{" "}
        {Math.ceil(props.results.total / (searchParams.size ?? 1))}
      </p>
      <PaginationNavigation link={props.results.next} search={searchParams}>
        Next
      </PaginationNavigation>
    </div>
  );
}

type PaginationNavigationProps = {
  link?: string;
  search: DogSearchParams;
} & PropsWithChildren;

const PaginationNavigation = (props: PaginationNavigationProps) => {
  const url = props.link
    ? defaultParseSearch(props.link.split("?")[1])
    : undefined;
  const breeds = [...(props.search.breeds ?? [])];
  const search = { ...url, breeds };

  return (
    <Button
      className="!p-0 disabled:pointer-events-none disabled:bg-gray-300 disabled:opacity-50"
      disabled={props.link === undefined}
      onClick={() => window.scrollTo(0, 0)}
    >
      <Link className="block px-4 py-2" to={"/"} search={search}>
        {props.children}
      </Link>
    </Button>
  );
};
