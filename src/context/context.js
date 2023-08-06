import { createContext } from "react";
import { useContext } from "react";

export const searchContext = createContext(undefined);

export function useSearchContext() {
  const searchTerm = useContext(searchContext);

  if (searchTerm === undefined) {
    throw new Error("useSearchContext must be used with a SearchContext");
  }

  return searchTerm;
}