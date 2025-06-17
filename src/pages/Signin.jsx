import { useState } from "react";
import { para } from "../style/login.module.css";
import loginImg from "../assets/images/loginImg.jpg";
import { Link, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  signinError,
  signinLoading,
  signinSuccess,
} from "../reduxToolKit/slices/userSlice.js";
import GoogleButton from "../components/GoogleButton.jsx";

export default function Signin() {
  const API_URL =
    import.meta.env.VITE_API_URL || "https://ecoback-jzym.onrender.com";
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [Form, SetForm] = useState({
    email: "hamza@gmail.com",
    password: "48128288",
  });
  const { loading, error } = useSelector((state) => state.USER);

  const submitSigninForm = async (e) => {
    e.preventDefault();
    try {
      dispatch(signinLoading());
      const postSignIn = await fetch(`${API_URL}/api/Auth/signin`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(Form),
      });
      if (!postSignIn.ok) {
        dispatch(signinError(postSignIn.message || "login failed !!"));
        return;
      }
      const res = await postSignIn.json();
      dispatch(signinSuccess(res.data));
      navigate("/products");
    } catch (error) {
      dispatch(signinError(error.message));
    }
  };
  return (
    <div className="bg-[#b2bcbe] min-h-screen pt-28  rounded-b-lg">
      <div className=" mx-[30px]  md:mx-[100px] rounded-lg md:p-5 p-2 flex flex-row  gap-3  bg-[#e2e4df] justify-center md:justify-between">
        <form
          className="flex flex-col gap-4 w-[450px] items-center "
          onSubmit={submitSigninForm}
        >
          <h1 className="font-bold text-2xl">Login In</h1>
          <p className="text-sm text-gray font-light">welcome back !</p>
          <input
            type="text"
            name="email"
            id="email"
            className=" p-2 rounded-full w-full outline-none bg-white/40"
            placeholder="Email ..."
            onChange={(e) => {
              SetForm({ ...Form, email: e.target.value });
            }}
            value={Form.email}
          />
          <input
            type="password"
            name="password"
            id="password"
            className=" p-2 rounded-full w-full outline-none bg-white/40"
            placeholder="Password ..."
            onChange={(e) => {
              SetForm({ ...Form, password: e.target.value });
            }}
            value={Form.password}
          />
          <button
            disabled={loading}
            className="bg-black cursor-pointer hover:bg-black/80 text-white w-full rounded-full p-2"
          >
            {loading ? "Loading..." : "Login"}
          </button>
          <div className="flex items-center w-full justify-center relative">
            <p className={para}> Continue with </p>
          </div>
          <GoogleButton />
          <p>
            Not a member ?
            <Link to={"/signup"}>
              <span className="text-sky-500 p-1 font-semibold cursor-pointer hover:underline">
                Sign Up
              </span>
            </Link>
          </p>
          <p
            className={
              error
                ? "text-red-700 text-center font-semibold bg-red-300 p-2 rounded-lg"
                : " "
            }
          >
            {error && error}
          </p>
        </form>
        <div className=" p-5 rounded-lg bg-white hidden md:block">
          <img src={loginImg} alt="login image" className="w-[350px]" />
        </div>
      </div>
    </div>
  );
}
