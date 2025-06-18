import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import {
  getProductSuccess,
  getProductError,
  getProductLoading,
  getProductUser,
} from "../reduxToolKit/slices/productSlice.js";

export default function Product() {
  const API_URL =
    import.meta.env.VITE_API_URL || "https://ecoback-jzym.onrender.com";
  const dispatch = useDispatch();
  const { singleProduct } = useSelector((state) => state.PRODUCT);
  const { userInfo } = useSelector((state) => state.USER);
  const [wishlist, setwishlist] = useState({});
  const [ERror, setERror] = useState(false);
  const [change, setChange] = useState();

  useEffect(() => {
    if (userInfo) {
      const userProducts = async () => {
        const getAllcards = await fetch(
          `${API_URL}/api/User/product/getallProductsCart/user/${userInfo._id}`,
          {
            credentials: "include",
            method: "GET",
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
      };
      userProducts();
    }
  }, [change]);

  const addProduct = async (productId) => {
    if (userInfo) {
      try {
        const userCard = await fetch(
          `${API_URL}/api/User/product/addToCart/user/${userInfo._id}`,
          {
            credentials: "include",
            method: "PUT",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify({ productId }),
          }
        );
        if (!userCard.ok) {
          throw new Error("Failed to add product");
        }
        const response = await userCard.json();
        setChange(response);
      } catch (error) {
        dispatch(getProductError(error));
      }
    } else {
      try {
        dispatch(getProductLoading());
        const getProductCart = await fetch(
          `${API_URL}/api/User/product/addToCart/${productId}`,
          {
            headers: {
              "content-type": "application/json",
            },
          }
        );
        if (!getProductCart.ok) {
          throw new Error("Failed to fetch cart");
        }
        const { data } = await getProductCart.json();
        dispatch(getProductSuccess(data));
      } catch (error) {
        dispatch(getProductError(error));
      }
    }
  };

  const handelWishList = async (productId, userId) => {
    try {
      const updatewish = await fetch(`${API_URL}/api/User/wishlist/${userId}`, {
        credentials: "include",
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ productId }),
      });
      if (!updatewish.ok) {
        return setERror("you need to log in first ");
      }
      const data = await updatewish.json();
      setwishlist((prev) => ({ ...prev, [productId]: data.isInWishList }));

      setERror(false);
    } catch (error) {
      setERror(error);
    }
  };

  const closePopup = () => {
    setERror(false);
  };
  return (
    <div className={`pt-22 bg-[#c7d0bd55]  min-h-screen rounded-b-xl relative`}>
      {ERror ? (
        <div className="w-[250px] flex gap-3 flex-col sm:w-[400px] rounded-sm bg-red-300 p-2 absolute top-1/2 left-1/2 z-10 -translate-1/2 ">
          <p className="text-red-700 text-center font-semibold">{ERror}</p>
          <button
            className="text-red-700 cursor-pointer hover:bg-red-700/20 border-red-700 border rounded-sm p-1"
            onClick={closePopup}
          >
            Close
          </button>
        </div>
      ) : (
        ""
      )}
      <div className="flex gap-5 mx-[15px] p-3 justify-center flex-col sm:flex-row ">
        <div className="  flex justify-center items-center rounded-sm bg-slate-300">
          <img
            src={singleProduct.imageUrl}
            alt=""
            className="w-[300px] sm:w-[450px]"
          />
        </div>
        <div className=" min-w-[300px] sm:w-[450px] bg-white/30 rounded-sm p-3">
          <div className="flex flex-col justify-between h-full min-h-[300px]">
            <div>
              <h1 className="text-2xl capitalize font-semibold mb-3">
                {singleProduct.title}
              </h1>
              <p>{singleProduct.description}.</p>
              <div className="flex justify-between mt-3">
                <div className="flex gap-5 ">
                  <div className="bg-green-600 text-white p-1 rounded">
                    <p>
                      ${" "}
                      {singleProduct.regularePrice -
                        singleProduct.discountPrice}
                    </p>
                  </div>
                  {singleProduct.offer && (
                    <div className="bg-red-600 text-white p-1 rounded">
                      <p>$ {singleProduct.discountPrice}</p>
                    </div>
                  )}
                </div>
                <div
                  className="border w-[40px] rounded flex items-center justify-center cursor-pointer"
                  onClick={() => {
                    handelWishList(singleProduct._id, userInfo?._id);
                  }}
                >
                  {wishlist[singleProduct._id] ? (
                    <FaHeart className="text-red-600 hover:text-xl duration-400" />
                  ) : (
                    <FaRegHeart className="hover:text-xl duration-400" />
                  )}
                </div>
              </div>
            </div>
            <div
              className="bg-slate-700 text-white p-2 rounded cursor-pointer flex justify-center items-center hover:bg-slate-700/80 duration-200"
              onClick={() => {
                addProduct(singleProduct._id);
              }}
            >
              <p>add to Cart</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
