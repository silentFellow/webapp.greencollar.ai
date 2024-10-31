import { useURLQuery } from "@/hooks";
import { useTableStore } from "@/pages/home/zustand";
import { useNavigate } from "react-router-dom";
import { parseQuery } from "@/lib/utils";
import { useLayoutEffect, useState } from "react";

export const useSetFilter = () => {
  const navigate = useNavigate();

  const { query, setQuery } = useTableStore();
  const currentQuery = useURLQuery();

  const [isNavigating, setIsNavigating] = useState(false);

  // change queries like in filter
  useLayoutEffect(() => {
    if (isNavigating) {
      setIsNavigating(false);
      return;
    }
    if (!parseQuery(query)) return;
    navigate(`?${parseQuery(query)}`);
  }, [query, isNavigating, navigate]);

  // sync between store and current queries
  useLayoutEffect(() => {
    const storeQueryString = parseQuery(query);
    const currentQueryString = parseQuery(currentQuery);

    if (!currentQueryString && storeQueryString) navigate(`?${storeQueryString}`);
    if (currentQueryString && currentQueryString !== storeQueryString) {
      const newQuery: Record<string, string | null> = {};
      Object.keys(query).map(key => {
        newQuery[key] = currentQuery[key] || null;
      });
      setQuery(newQuery);
      setIsNavigating(true);
      return;
    }
    if (storeQueryString === currentQueryString) return;
  }, [query, setQuery, currentQuery, navigate]);
};
