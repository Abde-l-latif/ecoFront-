import React from "react";
import { Link } from "react-router";

export default function Footer() {
  return (
    <div className="z-10 bg-[#c2e1e5] rounded-lg w-[calc(100%-20px)] m-[10px] py-[20px] sm:flex-row items-center text-center gap-4 flex flex-col justify-around">
      <div className="">
        <Link to={"/"} className="">
          <div className=" gap-2 flex items-center">
            <svg
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-10"
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                {" "}
                <path
                  d="M16 7H13V1H9L9 15H13V9H16V7Z"
                  fill="#000000"
                ></path>{" "}
                <path d="M7 12H3V9H0V7H3V4L7 4L7 12Z" fill="#000000"></path>{" "}
              </g>
            </svg>
            <p className="font-bold sm:text-xl text-lg">CoShopping</p>
          </div>
        </Link>
      </div>
      <div className="">
        <h1 className="sm:text-lg text-slate-600 font-bold mb-2 text-base">
          {" "}
          Pages{" "}
        </h1>
        <ul className="flex flex-col gap-1 text-sm sm:text-base ">
          <Link to={"/"} className="group">
            <li className="hover:text-slate-600 group-hover:underline cursor-pointer ">
              Home
            </li>
          </Link>
          <Link to={"/products"} className="group">
            <li className="hover:text-slate-600 group-hover:underline cursor-pointer ">
              products
            </li>
          </Link>
          <Link to={"/about"} className="group">
            <li className="hover:text-slate-600 group-hover:underline cursor-pointer ">
              About
            </li>
          </Link>
          <Link to={"/help"} className="group">
            <li className="hover:text-slate-600 group-hover:underline cursor-pointer ">
              Help
            </li>
          </Link>
        </ul>
      </div>
      <div className="">
        <h1 className="sm:text-lg text-base text-slate-600 font-bold mb-2">
          {" "}
          FAQ{" "}
        </h1>
        <ul className="flex flex-col gap-2  text-sm sm:text-base">
          <li>Privacy Policy</li>
          <li> Terms & Conditions </li>
          <li>Accessibility Statement</li>
          <li> Shipping Policy </li>
        </ul>
      </div>
      <div className="">
        <h1 className="sm:text-lg text-base text-slate-600 font-bold mb-2">
          Contact Our Customer Care
        </h1>
        <div className="text-sm sm:text-base">
          <p>Info@mysite.com</p>
          <p>Tel: 123-456-7890</p>
          <p>
            500 Terry Francois St <br />
            San Francisco, CA 94158
          </p>
        </div>
      </div>
    </div>
  );
}
