import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { FormEvent } from "react";
import Button from "../components/Button";
import { API_URL } from "../const";

export const Route = createFileRoute("/login")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    // convert formData to json for the endpoint
    const formDataObj = Object.fromEntries(formData.entries());
    const res = await fetch(API_URL + "/auth/login", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formDataObj),
    });

    if (res.status === 200) {
      navigate({ to: "/" });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="m-auto flex max-w-xl flex-col gap-2 p-4 [&>input]:rounded [&>input]:border [&>input]:px-4 [&>input]:py-2"
    >
      <h1 className="text-4xl">Login</h1>
      <input type="text" name="name" placeholder="Name" required />
      <input type="email" name="email" placeholder="Email" required />
      <div>
        <Button className="float-end" type="submit">
          Submit
        </Button>
      </div>
    </form>
  );
}
