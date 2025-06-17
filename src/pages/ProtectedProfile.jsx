import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router";

export default function ProtectedProfile() {
  const { userInfo } = useSelector((state) => state.USER);
  return (
    <div>{userInfo ? <Outlet /> : <Navigate to={"/signin"}></Navigate>}</div>
  );
}
