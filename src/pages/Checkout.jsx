import { useState } from "react";
import { TbTruckDelivery } from "react-icons/tb";
import { FiBox } from "react-icons/fi";
import { useSelector, useDispatch } from "react-redux";
import { setOrder } from "../reduxToolKit/slices/productSlice.js";
import { useNavigate } from "react-router";

export default function Checkout() {
  const navigate = useNavigate();
  const { productInfo, quantity, totalPrice } = useSelector(
    (state) => state.PRODUCT
  );
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.USER);
  const [error, setError] = useState(false);
  const [checkoutData, setCheckoutData] = useState({
    type: "Delivery",
    name: "",
    email: "",
    phone: "",
    country: "",
    city: "",
    ZipCode: "",
    productCart: productInfo,
    quantity,
    totalPrice,
  });

  const handelTypes = (e) => {
    if (e.target.type == "checkbox") {
      setCheckoutData({ ...checkoutData, type: e.target.id });
    }
    if (e.target.type == "text" || e.target.type == "number") {
      setCheckoutData({ ...checkoutData, [e.target.id]: e.target.value });
    }
  };

  const storeCheckout = () => {
    if (userInfo) {
      dispatch(setOrder(checkoutData));
      navigate("/");
    } else {
      setError(true);
    }
  };

  const handelerrorClose = () => {
    setError(!error);
  };

  return (
    <div className="lg:px-22 md:px-10 p-5 pt-22">
      <h1 className="text-2xl font-semibold">CheckOut</h1>
      <div className="mt-2 flex flex-col md:flex-row gap-5">
        <div className=" flex-1">
          <h2 className="font-semibold">Shipping Information</h2>
          <div className="mt-2 flex flex-wrap gap-5">
            <div
              className={`flex border gap-3 p-2 pr-10 justify-start rounded items-center w-fit border-gray-300 ${
                checkoutData.type === "Delivery"
                  ? "border-sky-600 text-sky-600 bg-sky-100"
                  : " border-gray-300"
              }`}
            >
              <input
                type="checkbox"
                className="w-[20px] h-[20px] rounded-full border appearance-none cursor-pointer checked:border-sky-600 checked:bg-sky-300 border-gray-300 "
                id="Delivery"
                checked={checkoutData.type === "Delivery" ? true : false}
                onChange={handelTypes}
              />
              <TbTruckDelivery />
              <p>Delivery</p>
            </div>
            <div
              className={`flex border gap-3 p-2 pr-10 justify-start rounded items-center w-fit border-gray-300 ${
                checkoutData.type === "Pick"
                  ? "border-sky-600 text-sky-600 bg-sky-100"
                  : " border-gray-300"
              }`}
            >
              <input
                type="checkbox"
                className="w-[20px] h-[20px] rounded-full border appearance-none cursor-pointer checked:border-sky-600 checked:bg-sky-300 border-gray-300 "
                id="Pick"
                checked={checkoutData.type === "Pick" ? true : false}
                onChange={handelTypes}
              />
              <FiBox />
              <p>Pick up</p>
            </div>
          </div>
          <div className="mt-2 flex flex-col gap-3">
            <div className="flex flex-col gap-1">
              <label htmlFor="Fullname" className="font-semibold text-sm">
                Full Name :{" "}
              </label>
              <input
                type="text"
                name="Fullname"
                placeholder="Enter your full name..."
                className="border outline-none p-2 border-gray-300 rounded"
                id="name"
                onChange={handelTypes}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="email" className="font-semibold text-sm">
                Email:{" "}
              </label>
              <input
                type="text"
                name="email"
                placeholder="Enter your Email..."
                className="border outline-none p-2 border-gray-300 rounded"
                id="email"
                onChange={handelTypes}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="phone" className="font-semibold text-sm">
                Phone Number :{" "}
              </label>
              <input
                type="number"
                name="phone"
                placeholder="Enter your number..."
                id="phone"
                className="border outline-none p-2 border-gray-300 rounded"
                onChange={handelTypes}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="country" className="font-semibold text-sm">
                Country :{" "}
              </label>
              <input
                type="text"
                name="country"
                placeholder="Enter your country name..."
                id="country"
                className="border outline-none p-2 border-gray-300 rounded"
                onChange={handelTypes}
              />
            </div>
            <div className=" flex gap-3 flex-wrap">
              <div className="flex flex-col gap-1">
                <label htmlFor="city" className="font-semibold text-sm">
                  city :{" "}
                </label>
                <input
                  type="text"
                  name="city"
                  placeholder="Enter your city name..."
                  id="city"
                  className="border outline-none p-2 border-gray-300 rounded"
                  onChange={handelTypes}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="ZipCode" className="font-semibold text-sm">
                  ZipCode :{" "}
                </label>
                <input
                  type="number"
                  name="ZipCode"
                  placeholder="Enter your ZipCode name..."
                  id="ZipCode"
                  className="border outline-none p-2 border-gray-300 rounded"
                  onChange={handelTypes}
                />
              </div>
            </div>
          </div>
        </div>
        <div className=" flex-1">
          <h2 className="font-semibold">Review your cart</h2>
          <div className="flex flex-col gap-3 mt-2">
            {checkoutData.productCart &&
              checkoutData.productCart.length > 0 &&
              checkoutData.productCart.map((product, index) => {
                return (
                  <div
                    key={index}
                    className=" bg-gray-200 rounded-sm flex gap-3"
                  >
                    <img
                      src={product.imageUrl}
                      alt=""
                      className="w-[100px] h-[70px] "
                    />
                    <div className="flex flex-col justify-between">
                      <div className="">
                        <h1 className="font-semibold text-normal">
                          {product.title}
                        </h1>
                        <p className="text-gray-500 text-sm font-semibold">
                          x
                          {userInfo
                            ? product.addCart.find((x) => x.id == userInfo._id)
                                ?.Qty
                            : product.productQuantity}
                        </p>
                      </div>
                      <h4 className="font-semibold text-slate-800">
                        {" "}
                        $
                        {userInfo
                          ? product.addCart.find((x) => x.id == userInfo._id)
                              ?.Qty *
                            (product.regularePrice - product.discountPrice)
                          : product.productQuantity *
                            (product.regularePrice - product.discountPrice)}
                      </h4>
                    </div>
                  </div>
                );
              })}
          </div>
          <div className="mt-3 flex flex-col gap-3">
            <div className="flex justify-between border border-gray-300 p-1 rounded">
              <p className="text-gray-500">SubTotal : </p>
              <h6 className="font-bold">$ {checkoutData.totalPrice}</h6>
            </div>
            <div className="flex justify-between border border-gray-300 p-1 rounded">
              <p className="text-gray-500">quantityTotal : </p>
              <h6 className="font-bold"> {checkoutData.quantity} Qty</h6>
            </div>
            {checkoutData.type == "Delivery" ? (
              <div className="flex justify-between border border-gray-300 p-1 rounded">
                <p className="text-gray-500">Shipping : </p>
                <h6 className="font-bold">
                  {" "}
                  $5.00 + ${checkoutData.totalPrice}{" "}
                </h6>
              </div>
            ) : (
              ""
            )}
            {checkoutData.type == "Delivery" ? (
              <div className="flex justify-between border border-gray-300 p-1 rounded">
                <p className="text-gray-500">Total : </p>
                <h6 className="font-bold"> $ {5 + checkoutData.totalPrice} </h6>
              </div>
            ) : (
              ""
            )}
          </div>
          <button
            className="bg-sky-800 text-white w-full p-2 rounded-lg mt-2 cursor-pointer hover:bg-sky-700"
            onClick={storeCheckout}
          >
            Place order
          </button>
          {error ? (
            <div className="mt-3 p-3 bg-red-300 rounded-lg relative">
              <p className="text-red-800"> You need to Login first </p>
              <button
                className="absolute right-10 cursor-pointer border-red-400 text-red-600 rounded-[10%] bg-red-400 px-3 border top-1/2 -translate-y-1/2"
                onClick={handelerrorClose}
              >
                Close
              </button>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}
