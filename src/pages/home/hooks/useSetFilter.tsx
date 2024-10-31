import { useURLQuery } from "@/hooks";
import { useTableStore } from "@/pages/home/zustand";
import { useNavigate } from "react-router-dom";
import { parseQuery } from "@/lib/utils";
import { useLayoutEffect } from "react";

export const useSetFilter = () => {
  const navigate = useNavigate();

  const { query, setQuery } = useTableStore();
  const currentQuery = useURLQuery();

  // change queries like in filter
  useLayoutEffect(() => {
    if (!parseQuery(query)) return;
    navigate(`?${parseQuery(query)}`);
  }, [query, navigate]);

  // sync between store and current queries
  useLayoutEffect(() => {
    const storeQueryString = parseQuery(query);
    const currentQueryString = parseQuery(currentQuery);

    if (storeQueryString === currentQueryString) return;
    if (!currentQueryString && storeQueryString) navigate(`?${storeQueryString}`);
  }, [query, setQuery, currentQuery, navigate]);
};
