import { useLocation } from "react-router-dom";

const useURLQuery = () => {
  const query = new URLSearchParams(useLocation().search);

  const queryObj: { [key: string]: string | null } = {};

  query.forEach((value, key) => {
    queryObj[key] = value;
  });

  return queryObj;
};

export default useURLQuery;
