import { useState } from "react";
import { MdShoppingBag } from "react-icons/md";
import { Link } from "react-router";
import { RiMenu2Fill } from "react-icons/ri";
import { useSelector, useDispatch } from "react-redux";
import { FaPlus } from "react-icons/fa6";
import { MdDeleteSweep } from "react-icons/md";
import {
  increamentQuantity,
  decreamentQuantity,
  deleteProductCard,
  getProductUser,
} from "../reduxToolKit/slices/productSlice.js";

export default function Header() {
  const API_URL =
    import.meta.env.VITE_API_URL || "https://ecoback-jzym.onrender.com";
  const dispatch = useDispatch();
  const [menu, setMenu] = useState(false);
  const [activeCart, setActiveCart] = useState(false);
  const { userInfo } = useSelector((state) => state.USER);
  const { productInfo, quantity, totalPrice } = useSelector(
    (state) => state.PRODUCT
  );

  const handelDelete = async (id) => {
    if (userInfo) {
      await fetch(`${API_URL}/api/User/product/removeProduct/${userInfo._id}`, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ id }),
      });
      const getAllcards = await fetch(
        `${API_URL}/api/User/product/getallProductsCart/user/${userInfo._id}`,
        {
          headers: {
            "content-type": "application/json",
          },
        }
      );
      if (!getAllcards.ok) {
        throw new Error("Failed to fetch cart");
      }
      const res = await getAllcards.json();
      dispatch(getProductUser({ res, user: userInfo._id }));
    } else {
      dispatch(deleteProductCard(id));
    }
  };

  const handelMenu = () => {
    if (menu) {
      setMenu(false);
    } else {
      setMenu(true);
    }
  };

  const handelCart = () => {
    setActiveCart(!activeCart);
  };

  const increaseFunc = async (id) => {
    if (userInfo) {
      await fetch(`${API_URL}/api/User/product/addQuantity/${userInfo._id}`, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ id }),
      });
      const getAllcards = await fetch(
        `${API_URL}/api/User/product/getallProductsCart/user/${userInfo._id}`,
        {
          headers: {
            "content-type": "application/json",
          },
        }
      );
      if (!getAllcards.ok) {
        throw new Error("Failed to fetch cart");
      }
      const res = await getAllcards.json();
      dispatch(getProductUser({ res, user: userInfo._id }));
    } else {
      dispatch(increamentQuantity(id));
    }
  };

  const decreaseFunc = async (id) => {
    if (userInfo) {
      if (userInfo) {
        await fetch(
          `${API_URL}/api/User/product/removeQuantity/${userInfo._id}`,
          {
            method: "PUT",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify({ id }),
          }
        );
        const getAllcards = await fetch(
          `${API_URL}/api/User/product/getallProductsCart/user/${userInfo._id}`,
          {
            headers: {
              "content-type": "application/json",
            },
          }
        );
        if (!getAllcards.ok) {
          throw new Error("Failed to fetch cart");
        }
        const res = await getAllcards.json();
        dispatch(getProductUser({ res, user: userInfo._id }));
      }
    } else {
      dispatch(decreamentQuantity(id));
    }
  };

  return (
    <div className="shadow-sm rounded-full py-3 px-5 bg-[#e8f8d7] m-[15px] flex items-center justify-between absolute right-0 left-0 top-0 z-30">
      <Link to={"/"} className="hidden sm:block">
        <div className=" gap-2 flex">
          <svg
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-7"
          >
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              {" "}
              <path d="M16 7H13V1H9L9 15H13V9H16V7Z" fill="#000000"></path>{" "}
              <path d="M7 12H3V9H0V7H3V4L7 4L7 12Z" fill="#000000"></path>{" "}
            </g>
          </svg>
          <p className="font-bold ">CoShopping</p>
        </div>
      </Link>

      <div
        className="sm:hidden block text-2xl cursor-pointer relative  "
        onClick={handelMenu}
      >
        <RiMenu2Fill />
        {menu && (
          <>
            <div
              className="w-5 h-5 bg-slate-700 rotate-45 absolute top-[calc(100%+8px)] right-0
          "
            ></div>
            <ul className="flex gap-3 flex-col top-[40px] absolute w-[250px] bg-slate-700 text-white rounded-sm p-2 text-base">
              <Link
                to={"/"}
                className="group p-1 cursor-pointer hover:bg-white/20 border-b-2"
              >
                <li>Home</li>
              </Link>
              <Link
                to={"/products"}
                className="group p-1 cursor-pointer hover:bg-white/20  border-b-2  "
              >
                <li>products</li>
              </Link>
              <Link
                to={"/about"}
                className="group p-1 cursor-pointer hover:bg-white/20  border-b-2"
              >
                <li>About</li>
              </Link>
              <Link
                to={"/help"}
                className="group p-1 cursor-pointer hover:bg-white/20  border-b-2"
              >
                <li>Help</li>
              </Link>
            </ul>
          </>
        )}
      </div>

      <ul className="sm:flex gap-4 hidden">
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
      <div className="flex gap-3 items-center">
        {userInfo ? (
          <Link to={"/profile"}>
            <div className="w-[25px] h-[25px] rounded-full overflow-hidden">
              <img
                src={userInfo.avatar}
                alt=""
                className="object-cover w-[25px] h-[25px] "
              />
            </div>
          </Link>
        ) : (
          <Link to={"/signin"} className="cursor-pointer">
            <div className="flex gap-2 group ">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-7"
              >
                <g id="SVGRepo_bgCarrier" stroke-width="1"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <path
                    d="M21.97 2.33C21.25 1.51 20.18 1 19 1C17.88 1 16.86 1.46 16.13 2.21C15.71 2.64 15.39 3.16 15.2 3.74C15.07 4.14 15 4.56 15 5C15 5.75 15.21 6.46 15.58 7.06C15.78 7.4 16.04 7.71 16.34 7.97C17.04 8.61 17.97 9 19 9C19.44 9 19.86 8.93 20.25 8.79C21.17 8.5 21.94 7.87 22.42 7.06C22.63 6.72 22.79 6.33 22.88 5.93C22.96 5.63 23 5.32 23 5C23 3.98 22.61 3.04 21.97 2.33ZM20.49 5.73H19.75V6.51C19.75 6.92 19.41 7.26 19 7.26C18.59 7.26 18.25 6.92 18.25 6.51V5.73H17.51C17.1 5.73 16.76 5.39 16.76 4.98C16.76 4.57 17.1 4.23 17.51 4.23H18.25V3.52C18.25 3.11 18.59 2.77 19 2.77C19.41 2.77 19.75 3.11 19.75 3.52V4.23H20.49C20.9 4.23 21.24 4.57 21.24 4.98C21.24 5.39 20.91 5.73 20.49 5.73Z"
                    fill="#000000"
                  ></path>{" "}
                  <path
                    d="M22 12C22 10.69 21.75 9.43 21.28 8.28C20.97 8.5 20.62 8.67 20.25 8.79C20.14 8.83 20.03 8.86 19.91 8.89C20.29 9.85 20.5 10.9 20.5 12C20.5 14.32 19.56 16.43 18.04 17.97C17.75 17.6 17.38 17.26 16.94 16.97C14.23 15.15 9.79 15.15 7.06 16.97C6.62 17.26 6.26 17.6 5.96 17.97C4.44 16.43 3.5 14.32 3.5 12C3.5 7.31 7.31 3.5 12 3.5C13.09 3.5 14.14 3.71 15.1 4.09C15.13 3.97 15.16 3.86 15.2 3.74C15.32 3.37 15.49 3.03 15.72 2.72C14.57 2.25 13.31 2 12 2C6.49 2 2 6.49 2 12C2 14.9 3.25 17.51 5.23 19.34C5.23 19.35 5.23 19.35 5.22 19.36C5.32 19.46 5.44 19.54 5.54 19.63C5.6 19.68 5.65 19.73 5.71 19.77C5.89 19.92 6.09 20.06 6.28 20.2C6.35 20.25 6.41 20.29 6.48 20.34C6.67 20.47 6.87 20.59 7.08 20.7C7.15 20.74 7.23 20.79 7.3 20.83C7.5 20.94 7.71 21.04 7.93 21.13C8.01 21.17 8.09 21.21 8.17 21.24C8.39 21.33 8.61 21.41 8.83 21.48C8.91 21.51 8.99 21.54 9.07 21.56C9.31 21.63 9.55 21.69 9.79 21.75C9.86 21.77 9.93 21.79 10.01 21.8C10.29 21.86 10.57 21.9 10.86 21.93C10.9 21.93 10.94 21.94 10.98 21.95C11.32 21.98 11.66 22 12 22C12.34 22 12.68 21.98 13.01 21.95C13.05 21.95 13.09 21.94 13.13 21.93C13.42 21.9 13.7 21.86 13.98 21.8C14.05 21.79 14.12 21.76 14.2 21.75C14.44 21.69 14.69 21.64 14.92 21.56C15 21.53 15.08 21.5 15.16 21.48C15.38 21.4 15.61 21.33 15.82 21.24C15.9 21.21 15.98 21.17 16.06 21.13C16.27 21.04 16.48 20.94 16.69 20.83C16.77 20.79 16.84 20.74 16.91 20.7C17.11 20.58 17.31 20.47 17.51 20.34C17.58 20.3 17.64 20.25 17.71 20.2C17.91 20.06 18.1 19.92 18.28 19.77C18.34 19.72 18.39 19.67 18.45 19.63C18.56 19.54 18.67 19.45 18.77 19.36C18.77 19.35 18.77 19.35 18.76 19.34C20.75 17.51 22 14.9 22 12Z"
                    fill="#000000"
                  ></path>{" "}
                  <path
                    d="M12 6.92969C9.93 6.92969 8.25 8.60969 8.25 10.6797C8.25 12.7097 9.84 14.3597 11.95 14.4197C11.98 14.4197 12.02 14.4197 12.04 14.4197C12.06 14.4197 12.09 14.4197 12.11 14.4197C12.12 14.4197 12.13 14.4197 12.13 14.4197C14.15 14.3497 15.74 12.7097 15.75 10.6797C15.75 8.60969 14.07 6.92969 12 6.92969Z"
                    fill="#000000"
                  ></path>{" "}
                </g>
              </svg>
              <p className="group-hover:underline group-hover:text-slate-600">
                Sign in
              </p>
            </div>
          </Link>
        )}
        <div className="relative cursor-pointer group" onClick={handelCart}>
          <MdShoppingBag className="text-2xl group-hover:text-slate-700" />
          <div className="w-4 h-4 bg-slate-700 text-white rounded-full flex items-center justify-center  absolute top-[-5px] right-[-5px]">
            <p className="text-xs">{quantity}</p>
          </div>
        </div>
      </div>
      {activeCart ? (
        <div className="absolute top-0 right-0 w-[250px] sm:w-[300px] p-1 z-50 bg-white h-screen rounded-sm">
          <p
            className="absolute font-semibold right-2 top-1 cursor-pointer hover:text-xl duration-300"
            onClick={() => setActiveCart(!activeCart)}
          >
            X
          </p>
          <div className="mt-6 text-center font-bold text-gray-600 overflow-scroll">
            <h1>My Cart</h1>
            <div className="flex flex-col justify-between h-[calc(100vh-60px)]">
              <div className=" flex flex-col mt-2 gap-2 p-1">
                {productInfo &&
                  productInfo.length > 0 &&
                  productInfo.map((x, index) => {
                    return (
                      <div
                        className="p-2 bg-gray-100 flex items-center gap-2 rounded-lg"
                        key={index}
                      >
                        <img
                          src={x.imageUrl[0]}
                          alt=""
                          className="w-[80px] sm:w-[100px] rounded-lg  bg-white h-[80px]"
                        />
                        <div className="flex flex-col justify-around items-start">
                          <p className="w-[100px] text-start  truncate">
                            {x.title}
                          </p>
                          <p className="text-sm text-green-600 font-normal">
                            $
                            {userInfo
                              ? x.addCart.find(
                                  (item) => item.id == userInfo._id
                                )?.Qty *
                                (x.regularePrice - x.discountPrice)
                              : (x.regularePrice - x.discountPrice) *
                                x.productQuantity}
                          </p>
                          <div className="bg-white/80 rounded-xl gap-1 flex items-center h-fit p-1">
                            <div
                              className="h-[25px] relative rounded-full w-[25px] cursor-pointer hover:bg-gray-100 "
                              onClick={() => increaseFunc(x._id)}
                            >
                              <FaPlus className="absolute text-sm top-1/2 left-1/2 -translate-1/2 " />
                            </div>
                            <div className="h-[25px] bg-gray-200 flex items-center justify-center rounded-full w-[25px]">
                              <p className="text-xs text-black ">
                                {userInfo
                                  ? x.addCart.find(
                                      (item) => item.id == userInfo._id
                                    )?.Qty
                                  : x.productQuantity}
                              </p>
                            </div>
                            <div
                              className="h-[25px] relative rounded-full w-[25px] cursor-pointer hover:bg-gray-100 "
                              onClick={() => decreaseFunc(x._id)}
                            >
                              <p className="absolute text-sm top-1/2 left-1/2 -translate-1/2 ">
                                -
                              </p>
                            </div>
                          </div>
                        </div>
                        <div
                          className="flex-1 h-[90px] rounded-lg flex items-center bg-red-400 cursor-pointer hover:bg-red-500 justify-center"
                          onClick={() => handelDelete(x._id)}
                        >
                          <MdDeleteSweep className="text-2xl text-white" />
                        </div>
                      </div>
                    );
                  })}
              </div>
              <div className="flex-col flex gap-2">
                <div className="flex gap-2 justify-center">
                  <p>Total : </p>
                  <div className="">
                    <p>${totalPrice}</p>
                  </div>
                </div>
                <Link to={"/checkout"}>
                  <button className="bg-slate-700 text-white w-full rounded-lg p-2 hover:bg-slate-700/80 cursor-pointer">
                    Checkout
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
