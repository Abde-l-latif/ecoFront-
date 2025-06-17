import { useState } from "react";
import signup from "../assets/images/signup.jpg";

import noImageAvatar from "../assets/images/noImageAvatar.jpeg";

import { Link, useNavigate } from "react-router";

export default function Signup() {
  const navigate = useNavigate();
  const [FormData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    avatar: noImageAvatar,
  });
  const [Error, setError] = useState(false);
  const [Loading, setLoading] = useState(false);
  const API_URL =
    import.meta.env.VITE_API_URL || "https://ecoback-jzym.onrender.com";

  const handelPostSignup = async () => {
    try {
      setError(false);
      setLoading(true);
      const postData = await fetch(`${API_URL}/api/Auth/signup`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(FormData),
      });
      const res = await postData.json();
      if (!res.success) {
        setError(res.error);
        setLoading(false);
      }
      setLoading(false);
      navigate("/signin");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#b2bcbe] h-screen w-full pt-20 flex justify-around items-center rounded-b-lg">
      <form
        className="w-[400px] bg-[#e2e4df] h-fit flex flex-col gap-4 p-4 rounded-lg mx-1"
        onSubmit={(e) => {
          e.preventDefault();
          handelPostSignup(FormData);
        }}
      >
        <h1 className="font-bold text-xl text-center">Sign Up</h1>
        <h1 className="font-semibold text-xl text-center">
          {" "}
          Create your account{" "}
        </h1>
        <div className="flex flex-col gap-1">
          <label htmlFor="name" className="font-semibold">
            Name :
          </label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Enter your name ..."
            className=" border p-2 rounded-full"
            value={FormData.username}
            onChange={(e) => {
              setFormData({ ...FormData, username: e.target.value });
            }}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="email" className="font-semibold">
            {" "}
            Email :{" "}
          </label>
          <input
            type="text"
            name="email"
            id="email"
            placeholder="Enter your email..."
            className=" border p-2 rounded-full"
            value={FormData.email}
            onChange={(e) => {
              setFormData({ ...FormData, email: e.target.value });
            }}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="password" className="font-semibold">
            {" "}
            Password :{" "}
          </label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Enter your Password..."
            value={FormData.password}
            className=" border p-2 rounded-full"
            onChange={(e) => {
              setFormData({ ...FormData, password: e.target.value });
            }}
          />
        </div>
        <button
          disabled={Loading}
          className=" hover:bg-black/80 cursor-pointer bg-black text-white p-2 rounded-full"
        >
          {Loading ? "loading..." : "Sign up"}
        </button>
        <p className="text-center font-light">
          Already have an account ?
          <Link to={"/signin"}>
            <span className="pl-1 text-sky-600 font-semibold hover:underline">
              Sign in{" "}
            </span>
          </Link>
        </p>
        <p className="text-center text-red-500">{Error ? Error : null}</p>
      </form>
      <div className="hidden md:block">
        <img
          src={signup}
          alt="kkk"
          className="w-[400px] rounded-lg h-[550px]"
        />
      </div>
    </div>
  );
}
