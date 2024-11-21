import Breadcrumbs from "@/components/Breadcrumbs";
import TestForm from "@/features/test/components/test-form";
import { OrderCreationResponse } from "@/types";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const InitiateTest = () => {
  const navigate = useNavigate();
  const [response, setResponse] = useState<OrderCreationResponse>();

  useEffect(() => {
    if (response === undefined) return;
    navigate(`/order/${response.order_id}`);
  }, [response, navigate]);

  return (
    <section className="col gap-2">
      <Breadcrumbs
        path={{
          Test: "/",
          Initiate: "/test/Initiate",
        }}
      />

      <TestForm setResponse={setResponse} />
    </section>
  );
};

export default InitiateTest;
