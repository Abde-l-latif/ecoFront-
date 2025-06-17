import { useSelector, useDispatch } from "react-redux";
import { FaRegUser } from "react-icons/fa6";
import { LuShoppingBasket } from "react-icons/lu";
import { PiSignOutFill } from "react-icons/pi";
import { IoHeartOutline } from "react-icons/io5";
import { MdDeleteOutline, MdOutlineCreateNewFolder } from "react-icons/md";

import { useState } from "react";
import PersonnelInfo from "../components/PersonnelInfo.jsx";
import {
  signoutSuccess,
  signoutError,
  deleteAccountSuccess,
  deleteAccountError,
  deleteAccountLoading,
} from "../reduxToolKit/slices/userSlice.js";
import { resetProductCard } from "../reduxToolKit/slices/productSlice.js";
import CreateProduct from "../components/CreateProduct.jsx";
import Wishlist from "../components/wishlist.jsx";
import Orders from "../components/Orders.jsx";

export default function Profile() {
  const dispatch = useDispatch();
  const [active, setActive] = useState("my_Account");
  const { userInfo } = useSelector((state) => state.USER);

  const handelSignout = async () => {
    try {
      await fetch("/api/Auth/signout", {
        method: "POST",
      });
      dispatch(signoutSuccess());
      dispatch(resetProductCard());
    } catch (error) {
      dispatch(signoutError(error));
    }
  };

  const handelDelete = async () => {
    try {
      dispatch(deleteAccountLoading());
      const deleteData = await fetch(`/api/User/DeleteUser/${userInfo._id}`, {
        method: "DELETE",
        headers: {
          "type-content": "application/json",
        },
      });
      if (!deleteData.ok) {
        dispatch(deleteAccountError("Error in the server !! "));
      }
      dispatch(deleteAccountSuccess());
    } catch (error) {
      dispatch(deleteAccountError(error));
    }
  };

  const handelNav = (value) => {
    setActive(value);
  };
  return (
    <div className=" pt-22 bg-[#c7d0bd55] min-h-screen rounded-b-xl">
      <div className="mx-[15px]">
        <h1 className="font-bold sm:text-3xl text-xl text-slate-800">
          Profile{" "}
        </h1>
        <div className="flex sm:gap-5 gap-2 mt-5">
          <div className="bg-[#cfdddf] rounded-xl p-1 sm:p-3 w-fit flex flex-col items-center sm:w-[250px]">
            <div className="flex gap-4 items-center ">
              <div className="sm:w-12 sm:h-12 w-10 h-10 rounded-full overflow-hidden">
                <img
                  src={userInfo.avatar}
                  alt=""
                  className="object-cover h-full"
                />
              </div>
              <div className=" flex-col hidden sm:flex">
                <p className="font-light text-sm">Hello</p>
                <p className="capitalize font-semibold text-sm">
                  {userInfo.username}
                </p>
              </div>
            </div>
            <div className=" mt-5 flex flex-col gap-3 w-fit sm:w-full ">
              <div
                className={
                  active == "my_Account"
                    ? "flex gap-4 items-center border-b border-white p-2 cursor-pointer bg-white/85 rounded-xl"
                    : "flex gap-4 items-center border-b border-white p-2 cursor-pointer  hover:bg-white/80 rounded-xl"
                }
                onClick={() => {
                  handelNav("my_Account");
                }}
              >
                <FaRegUser />
                <p className="hidden sm:block"> My Account </p>
              </div>
              <div
                className={
                  active == "create_product"
                    ? "flex gap-4 items-center border-b border-white p-2 cursor-pointer bg-white/85 rounded-xl"
                    : "flex gap-4 items-center border-b border-white p-2 cursor-pointer  hover:bg-white/80 rounded-xl"
                }
                onClick={() => {
                  handelNav("create_product");
                }}
              >
                <MdOutlineCreateNewFolder />
                <p className="hidden sm:block"> Create Product </p>
              </div>
              <div
                className={
                  active == "my_Orders"
                    ? "flex gap-4 items-center border-b border-white p-2 cursor-pointer bg-white/85 rounded-xl"
                    : "flex gap-4 items-center border-b border-white p-2 cursor-pointer  hover:bg-white/80 rounded-xl"
                }
                onClick={() => {
                  handelNav("my_Orders");
                }}
              >
                <LuShoppingBasket />
                <p className="hidden sm:block"> My Orders </p>
              </div>
              <div
                className={
                  active == "my_Wishlist"
                    ? "flex gap-4 items-center border-b border-white p-2 cursor-pointer bg-white/85 rounded-xl"
                    : "flex gap-4 items-center border-b border-white p-2 cursor-pointer  hover:bg-white/80 rounded-xl"
                }
                onClick={() => {
                  handelNav("my_Wishlist");
                }}
              >
                <IoHeartOutline />
                <p className="hidden sm:block"> My Wishlist </p>
              </div>
              <div
                className=" flex gap-4 items-center border-b border-white p-2 cursor-pointer  hover:text-red-700 rounded-xl"
                onClick={handelSignout}
              >
                <PiSignOutFill />
                <p className="hidden sm:block"> Sign Out </p>
              </div>
              <div
                className=" flex gap-4 items-center bg-red-500 text-white rounded-xl hover:bg-red-700 cursor-pointer p-2"
                onClick={handelDelete}
              >
                <MdDeleteOutline />
                <p className="hidden sm:block"> Delete Accout </p>
              </div>
            </div>
          </div>
          <div className="flex-1">
            {active == "my_Account" ? (
              <PersonnelInfo info={userInfo} />
            ) : active == "create_product" ? (
              <CreateProduct />
            ) : active == "my_Wishlist" ? (
              <Wishlist />
            ) : active == "my_Orders" ? (
              <Orders />
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
