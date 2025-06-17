import { useEffect, useState } from "react";
import { FaRegHeart, FaHeart } from "react-icons/fa";

export default function Wishlist() {
  const API_URL =
    import.meta.env.VITE_API_URL || "https://ecoback-jzym.onrender.com";
  const [wishlist, setWishList] = useState([]);
  const [newList, setNewList] = useState({});
  useEffect(() => {
    const getWishlist = async () => {
      try {
        const getWishlist = await fetch(`${API_URL}/api/User/getWishlist`);
        const wishlists = await getWishlist.json();
        setWishList(wishlists);
      } catch (error) {
        console.log(error);
      }
    };
    getWishlist();
  }, [newList]);

  const handelWishList = async (productId, userId, wish) => {
    try {
      const updatewish = await fetch(`${API_URL}/api/User/wishlist/${userId}`, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ productId, wishlist: !wish }),
      });
      const data = await updatewish.json();
      setNewList(data.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className=" bg-white/70 p-2 rounded-xl">
      <div className="mx-2 flex flex-col gap-4">
        <div className=" border-b p-2 border-gray-300">
          <h1 className="sm:text-xl font-semibold text-base">WishList</h1>
        </div>
        <div className="sm:flex-row flex flex-col gap-4 mt-3 items-center sm:justify-start sm:flex-wrap">
          {wishlist &&
            wishlist.length > 0 &&
            wishlist.map((product, index) => {
              return (
                <div key={index} className="relative w-fit">
                  <div className="w-[250px] sm:w-[300px] h-[350px] justify-between p-2 bg-white rounded-sm flex flex-col gap-2  shadow-sm ">
                    <div className=" flex flex-col gap-1">
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

                    <button className="bg-slate-600 text-white p-1 rounded cursor-pointer hover:bg-slate-500">
                      {" "}
                      Add to cart{" "}
                    </button>
                  </div>
                  <div
                    className="absolute w-8 h-8 rounded-full top-1 right-1 bg-gray-200 cursor-pointer flex items-center justify-center"
                    onClick={() => {
                      handelWishList(
                        product._id,
                        product.userRef,
                        product.wishlist
                      );
                    }}
                  >
                    {product.wishlist ? (
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
