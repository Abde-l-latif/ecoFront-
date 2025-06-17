import { Link } from "react-router";
import homeImg from "../assets/images/homeImg.png";
import { IoIosSearch } from "react-icons/io";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import {
  getProductSuccess,
  getProductError,
  getProductLoading,
  getProductUser,
  getSingleProduct,
} from "../reduxToolKit/slices/productSlice.js";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";

export default function Home() {
  const API_URL =
    import.meta.env.VITE_API_URL || "https://ecoback-jzym.onrender.com";
  const [allProducts, setAllProducts] = useState([]);
  const navigate = useNavigate();
  const [ERror, setERror] = useState(false);
  const [newWishList, setNewWishList] = useState({});
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.USER);
  const [change, setChange] = useState();

  useEffect(() => {
    if (userInfo) {
      const userProducts = async () => {
        const getAllcards = await fetch(
          `${API_URL}/api/User/product/getallProductsCart/user/${userInfo._id}`,
          {
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

  const displayProduct = (product) => {
    dispatch(getSingleProduct(product));
    navigate("/product");
  };

  const addProduct = async (productId) => {
    if (userInfo) {
      try {
        const userCard = await fetch(
          `${API_URL}/api/User/product/addToCart/user/${userInfo._id}`,
          {
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

  useEffect(() => {
    const getProducts = async () => {
      try {
        const getAllProducts = await fetch(
          `${API_URL}/api/User/product/recentProducts`
        );
        const AllProducts = await getAllProducts.json();
        setAllProducts(AllProducts);

        const getWishlist = await fetch(`${API_URL}/api/User/getWishlist`);
        const wishlists = await getWishlist.json();
        const statusMap = {};
        AllProducts.forEach((product) => {
          // Check if product exists in wishlist response
          statusMap[product._id] = wishlists.some(
            (wishlistProduct) => wishlistProduct._id === product._id
          );
        });
        setNewWishList(statusMap);
      } catch (error) {
        console.log(error);
      }
    };
    getProducts();
  }, []);

  const handelWishList = async (productId, userId) => {
    try {
      const updatewish = await fetch(`${API_URL}/api/User/wishlist/${userId}`, {
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
      setNewWishList((prev) => ({ ...prev, [productId]: data.isInWishList }));

      setERror(false);
    } catch (error) {
      setERror(error);
    }
  };

  const closePopup = () => {
    setERror(false);
  };

  return (
    <div className="">
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
      <div className="pt-22 bg-[#B2BCBE] h-[500px] rounded-b-lg mb-1 ">
        <div className="mx-[20px] sm:mx-[50px] relative">
          <div className="bg-white/30 p-5 rounded-xl">
            <h1 className="sm:text-2xl font-bold mb-2 text-xl">
              Welcome to CoShopping – <br /> Your Ultimate Online Marketplace!
            </h1>
            <h2 className="sm:text-xl mb-2 text-lg">
              One Store, Endless Possibilities
            </h2>
            <p className="font-light w-[300px] sm:w-[350px] text-slate-800">
              At CoShopping, we bring the world of shopping to your fingertips.
              Whether you're searching for electronics, fashion, home
              essentials, or unique gifts, you’ll find it all here—curated for
              quality, priced for value, and delivered with ease.
            </p>
            <Link to={"/products"}>
              <button className="bg-slate-800 text-white p-2 px-4 cursor-pointer hover:bg-slate-700 rounded-lg mt-3">
                {" "}
                Start Now{" "}
              </button>
            </Link>
          </div>
          <img
            src={homeImg}
            alt=""
            className="absolute top-0 md:w-[400px] lg:w-[500px] right-0 lg:right-[100px] hidden md:block"
          />
        </div>
      </div>
      <div className="bg-gray-200 rounded-xl p-5">
        <h1 className="text-xl"> Trending Now</h1>
        <div className="sm:flex-row flex flex-col gap-4 mt-3 items-center sm:justify-start sm:flex-wrap">
          {allProducts &&
            allProducts.length > 0 &&
            allProducts.map((product, index) => {
              return (
                <div key={index} className={`relative w-fit  `}>
                  <div className="w-[250px] sm:w-[300px] h-[350px] justify-between p-2 bg-white rounded-sm flex flex-col gap-2  shadow-sm ">
                    <div
                      className=" flex flex-col gap-1 cursor-pointer"
                      onClick={() => {
                        displayProduct(product);
                      }}
                    >
                      <img
                        src={product.imageUrl[0]}
                        alt="zz"
                        className="w-full bg-gray-300 object-cover rounded-sm h-[200px]"
                      />
                      <p className="text-lg font-semibold capitalize">
                        {product.title}
                      </p>
                      <p className="text-sm font-light truncate">
                        {product.description}
                      </p>
                      {product.offer ? (
                        <div className="flex justify-between">
                          <div className="bg-green-700 text-white px-2 rounded w-fit">
                            <p>
                              $ {product.regularePrice - product.discountPrice}
                            </p>
                          </div>
                          <div className="bg-red-500 text-white px-2 rounded w-fit flex gap-1">
                            <p>Discount</p>
                            <p>${product.discountPrice}</p>
                          </div>
                        </div>
                      ) : (
                        <div className="bg-green-700 text-white px-2 rounded w-fit">
                          <p>$ {product.regularePrice}</p>
                        </div>
                      )}
                    </div>

                    <button
                      className="bg-slate-600 text-white p-1 rounded cursor-pointer hover:bg-slate-500"
                      onClick={() => {
                        addProduct(product._id);
                      }}
                    >
                      Add to cart
                    </button>
                  </div>
                  <div
                    className="absolute w-8 h-8 rounded-full top-1 right-1 bg-gray-200 cursor-pointer flex items-center justify-center"
                    onClick={() => {
                      handelWishList(product._id, userInfo._id);
                    }}
                  >
                    {newWishList[product._id] ? (
                      <FaHeart className="text-red-600 hover:text-xl duration-400" />
                    ) : (
                      <FaRegHeart className="hover:text-xl duration-400" />
                    )}
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
