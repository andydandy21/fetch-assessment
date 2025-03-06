import { useNavigate } from "@tanstack/react-router";
import { API_URL } from "../const";
import Button from "./Button";

export default function () {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const res = await fetch(API_URL + "/auth/logout", {
      method: "POST",
      credentials: "include",
    });
    if (res.status === 200) {
      navigate({ to: "/login" });
    }
  };

  return <Button onClick={handleLogout}>Logout</Button>;
}
