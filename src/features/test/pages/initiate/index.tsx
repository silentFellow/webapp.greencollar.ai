import { Input } from "@/components/ui/input";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { fetchUserByUsername } from "@/query";
import { useMutation } from "@tanstack/react-query";
import { useRef } from "react";
import { toast } from "sonner";
import { useObject } from "@/hooks";
import { UseUserForm } from "./hooks";

const InitiateTest = () => {
  UseUserForm();
  const usernameRef = useRef<HTMLInputElement>(null);
  const [flow, setFlow] = useObject({
    userform: false,
  });

  const checkUserMutation = useMutation({
    mutationKey: ["check_user", usernameRef.current?.value],
    mutationFn: async () => {
      if (!usernameRef.current?.value) return;
      const response = await fetchUserByUsername(usernameRef.current?.value);
      return response;
    },
  });

  return (
    <section className="col gap-2">
      <Breadcrumbs
        path={{
          Test: "/",
          Initiate: "/test/Initiate",
        }}
      />

      <h1 className="font-bold text-2xl">Initiate Test</h1>

      <div className="mt-3 flex justify-start items-center gap-3 sm:w-96">
        <Input placeholder="Enter username" className="no-focus" ref={usernameRef} />

        <Button
          className="flex gap-3"
          onClick={() => {
            if (!usernameRef.current?.value) return;
            toast.promise(checkUserMutation.mutateAsync, {
              loading: "fetching user",
              error: "user not found",
              finally: () => {
                setFlow("userform", true);
              },
            });
          }}
        >
          <span>Verify</span>
        </Button>
      </div>

      {flow && <p>{JSON.stringify(checkUserMutation.data)}</p>}
    </section>
  );
};

export default InitiateTest;
