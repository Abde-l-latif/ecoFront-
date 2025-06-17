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

export default function Products() {
  const API_URL =
    import.meta.env.VITE_API_URL || "https://ecoback-jzym.onrender.com";
  const [allProducts, setAllProducts] = useState([]);
  const navigate = useNavigate();
  const [ERror, setERror] = useState(false);
  const [newWishList, setNewWishList] = useState({});
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.USER);
  const [change, setChange] = useState();
  const [params, setParams] = useState({
    searchTerm: "",
    sort: "created_At",
    order: "desc",
  });
  const [showMore, setShowMore] = useState(false);

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

  const handelShowMore = async () => {
    const startIndex = allProducts.length;
    const Url = new URLSearchParams(location.search);
    Url.set("startIndex", startIndex);
    const urlString = Url.toString();
    const filtred = await fetch(
      `${API_URL}/api/User/product/filtredProducts?${urlString}`
    );
    const res = await filtred.json();
    if (res.length >= 4) {
      setShowMore(true);
    } else {
      setShowMore(false);
    }
    setAllProducts([...allProducts, ...res]);
  };

  const displayProduct = (product) => {
    dispatch(getSingleProduct(product));
    navigate("/product");
  };

  useEffect(() => {
    const Url = new URLSearchParams(location.search);
    const searchTerm = Url.get("searchTerm");
    const sort = Url.get("sort");
    const order = Url.get("order");
    if (searchTerm || sort || order) {
      setParams({
        searchTerm: searchTerm || "",
        sort: sort || "created_at",
        order: order || "desc",
      });
    }

    const getFiltredData = async () => {
      const urlString = Url.toString();
      const filtred = await fetch(
        `${API_URL}/api/User/product/filtredProducts?${urlString}`
      );
      const res = await filtred.json();
      if (res.length >= 4) {
        setShowMore(true);
      } else {
        setShowMore(false);
      }
      setAllProducts(res);
    };
    getFiltredData();
  }, [location.search]);

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
        const getAllProducts = await fetch(`${API_URL}/api/User/products`);
        const AllProducts = await getAllProducts.json();

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
      if (!userId) {
        return setERror("you need to log in first ");
      } else {
        const updatewish = await fetch(
          `${API_URL}/api/User/wishlist/${userId}`,
          {
            method: "PUT",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify({ productId }),
          }
        );
        if (!updatewish.ok) {
          return setERror("you need to log in first ");
        }
        const data = await updatewish.json();
        setNewWishList((prev) => ({ ...prev, [productId]: data.isInWishList }));

        setERror(false);
      }
    } catch (error) {
      setERror(error);
    }
  };

  const closePopup = () => {
    setERror(false);
  };

  const handelSearch = (e) => {
    if (e.target.type == "text") {
      setParams({ ...params, [e.target.id]: e.target.value });
    }
    if (e.target.id == "sort-order") {
      const sort = e.target.value.split("_")[0] || "created_at";
      const order = e.target.value.split("_")[1] || "desc";
      setParams({ ...params, sort, order });
    }
  };

  const submitForm = async (e) => {
    e.preventDefault();
    let Url = new URLSearchParams();
    Url.set("searchTerm", params.searchTerm);
    Url.set("sort", params.sort);
    Url.set("order", params.order);
    navigate(`/products?${Url}`);
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
      <div className="mx-[15px]">
        <h1 className="font-bold sm:text-2xl text-xl text-slate-800">
          All Products
        </h1>
        <div
          className={`bg-white/30 w-full rounded-sm p-2 mt-3 justify-between flex flex-col`}
        >
          <form
            className="flex flex-col items-start gap-2 sm:flex-row sm:justify-between"
            onSubmit={submitForm}
          >
            <div>
              <div className="flex w-[300px] items-center gap-2 border border-gray-300 rounded-sm">
                <input
                  type="text"
                  placeholder="Search..."
                  className="p-1 outline-none flex-1"
                  id="searchTerm"
                  onChange={handelSearch}
                />
                <IoIosSearch className="w-[22px] text-gray-500 cursor-pointer h-[22px] hover:text-gray-800" />
              </div>
            </div>
            <div className="flex">
              <div className=" text-gray-800 bg-gray-500/20 p-1 rounded-l-md w-fit border border-gray-500">
                <p>Sort by</p>
              </div>
              <select
                className="outline-none border-gray-500 border rounded-r-md px-2"
                id="sort-order"
                onChange={handelSearch}
              >
                <option value="createdAt_desc">Latest</option>
                <option value="createdAt_asc"> Oldest </option>
                <option value="regularePrice_desc">Hight to Low</option>
                <option value="regularePrice_asc"> Low to hight</option>
              </select>
            </div>
          </form>
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
                                ${" "}
                                {product.regularePrice - product.discountPrice}
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
          {showMore && (
            <p
              className="text-green-700 font-bold p-2 w-fit mx-auto cursor-pointer hover:opacity-90 "
              onClick={handelShowMore}
            >
              Show more ...
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
