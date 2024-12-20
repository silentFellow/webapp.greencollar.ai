import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { fetchUserByUsername } from "@/query";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useObject } from "@/hooks";
import { fetchCreateUserTemplate } from "@/features/test/components/test-form/query";
import UserForm from "./components/user-form";
import CropForm from "./components/crop-form";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useScanFormStore } from "./zustand";
import { OrderCreationResponse } from "@/types";

const TestForm = ({
  setResponse,
  setTaramHex,
}: {
  setResponse: React.Dispatch<React.SetStateAction<OrderCreationResponse | undefined>>;
  setTaramHex?: React.Dispatch<React.SetStateAction<number | undefined>>;
}) => {
  const { setVerifiedUser, selectedTaram, reset, orderResponse } = useScanFormStore();

  // export the response to the caller of the component
  useEffect(() => {
    if (orderResponse === undefined) return;
    setResponse(orderResponse);
  }, [orderResponse, setResponse]);

  // export the taramhex
  useEffect(() => {
    if (!setTaramHex || selectedTaram === undefined) return;
    setTaramHex(selectedTaram.taram_hex);
  }, [selectedTaram, setTaramHex]);

  // unmount zustand
  useEffect(() => {
    return () => reset();
  }, [reset]);

  const [username, setUsername] = useState("");

  const userTemplate = useQuery({
    queryKey: ["user_template"],
    queryFn: () => fetchCreateUserTemplate(),
  });

  const [flow, setFlow] = useObject({
    userform: false,
  });

  const checkUserMutation = useMutation({
    mutationKey: ["check_user", username],
    mutationFn: async () => {
      if (!username) return;
      const response = await fetchUserByUsername(username);
      return response;
    },
    onSuccess: data => {
      setVerifiedUser(data?.data.users[0]);
    },
  });
  const resUser = checkUserMutation.data?.data.users[0];

  if (userTemplate.isLoading) return <p>Loading...</p>;
  if (userTemplate.isError) return <p>Something went wrong...</p>;

  return (
    <section className="col gap-2">
      {!flow.userform && (
        <section className="mt-3 sm:w-96">
          <p className="font-bold">Check user(username, email, phone): </p>

          <div className="mt-2 flex justify-start items-center gap-3 ">
            <Input
              value={username}
              placeholder="Enter username"
              className="no-focus"
              onChange={e => setUsername(e.target.value)}
            />

            <Button
              className="flex gap-3"
              onClick={() => {
                if (!username) return;
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
        </section>
      )}

      {flow.userform && userTemplate.isSuccess && (
        <div className="mt-3">
          {checkUserMutation.data?.data.count == 0 ? (
            <>
              <h3>Create User: </h3>
              <UserForm
                userTemplate={userTemplate.data.data}
                setUsername={setUsername}
                login={checkUserMutation.mutateAsync}
              />
            </>
          ) : (
            resUser && (
              <>
                <Accordion type="single" collapsible>
                  <AccordionItem value={resUser.user_name}>
                    <AccordionTrigger className="hover:no-underline">
                      hi, {resUser.user_name}
                    </AccordionTrigger>
                    <AccordionContent>
                      <UserForm userTemplate={userTemplate.data.data} def={resUser} />
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </>
            )
          )}
        </div>
      )}

      {resUser && (
        <div className="mt-3">
          <CropForm />
        </div>
      )}
    </section>
  );
};

export default TestForm;
