import Breadcrumbs from "@/components/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { PiPlay } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchScanRequest } from "./query";
import TestTableDataController from "./components/data-controller";
import { useTableStore } from "./zustand";
import { useLayoutEffect } from "react";
import { parseQuery } from "@/lib/utils";
import { useURLQuery } from "@/hooks";
import TestTable from "./components/test-table";

const Home = () => {
  const navigate = useNavigate();

  // navigate to queries like in store, if current query is empty
  const { query, setQuery } = useTableStore();
  const currentQuery = useURLQuery();

  useLayoutEffect(() => {
    const storeQueryString = parseQuery(query);
    const currentQueryString = parseQuery(currentQuery);

    if (storeQueryString === currentQueryString) return;
    if (!currentQueryString && storeQueryString) navigate(`?${storeQueryString}`);
  }, [query, setQuery, currentQuery, navigate]);

  const scans = useQuery({
    queryKey: ["scans", currentQuery],
    queryFn: () => fetchScanRequest(parseQuery(currentQuery)),
  });

  return (
    <section className="col gap-2">
      <Breadcrumbs path={{ Home: "/" }} />

      <h1 className="font-bold text-2xl">Tests</h1>

      <div className="flex justify-start">
        <Button className="flex gap-3" onClick={() => navigate("/test/initiate")}>
          <PiPlay />
          <span>Start Test</span>
        </Button>
      </div>

      <section className="full mt-2 flex flex-col gap-3">
        <TestTableDataController scans={scans} />
        <TestTable scans={scans} />
      </section>
    </section>
  );
};

export default Home;
