import { useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase";
import { useSelector } from "react-redux";

export default function CreateProduct() {
  const API_URL =
    import.meta.env.VITE_API_URL || "https://ecoback-jzym.onrender.com";
  const { userInfo } = useSelector((state) => state.USER);
  const [ProductData, setProductData] = useState({
    title: "",
    description: "",
    offer: false,
    regularePrice: 0,
    discountPrice: 0,
    productQuantity: 1,
    addCart: [],
    wishlist: [],
    imageUrl: [],
    userRef: "",
  });
  const [loading, setLoading] = useState(false);
  const [ERRORY, setERRORY] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const [msg, setMsg] = useState("");

  const [files, setFiles] = useState([]);

  const storeUrl = (file) => {
    return new Promise((resolve, reject) => {
      const ImgRef = ref(storage, file.name);
      const uploadTask = uploadBytesResumable(ImgRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
        },
        (error) => {
          reject(error);
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };

  const HundelSubmitImages = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (files.length < 7 && files.length > 0) {
      setLoading(true);
      const promises = [];
      for (let i = 0; files.length > i; i++) {
        promises.push(storeUrl(files[i]));
      }
      Promise.all(promises)
        .then((URLl) => {
          setProductData({
            ...ProductData,
            imageUrl: ProductData.imageUrl.concat(URLl),
          });
          setLoading(false);
          setERRORY(false);
        })
        .catch((rej) => setERRORY(rej));
    } else {
      setERRORY("minimum images is 0 and maximum 7 !! ");
    }
  };

  const handelProductData = (e) => {
    if (e.target.type == "checkbox") {
      setProductData({ ...ProductData, [e.target.id]: e.target.checked });
    }
    if (
      e.target.type == "text" ||
      e.target.type == "textarea" ||
      e.target.type == "number"
    ) {
      setProductData({ ...ProductData, [e.target.id]: e.target.value });
    }
  };

  const handelSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setSubmitError(false);
      const postProduct = await fetch(
        `${API_URL}/api/User/createProduct/${userInfo._id}`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({ ...ProductData, userRef: userInfo._id }),
        }
      );
      if (!postProduct.ok) {
        setSubmitError("something wrong in request !!!");
        setLoading(false);
      }
      const res = await postProduct.json();
      setMsg(res.msg);
      setLoading(false);
      setProductData({
        title: "",
        description: "",
        offer: false,
        regularePrice: 0,
        discountPrice: 0,
        productQuantity: 1,
        wishlist: [],
        addCart: [],
        imageUrl: [],
        userRef: "",
      });
      setTimeout(() => {
        setMsg("");
      }, 2000);
    } catch (error) {
      setSubmitError(error);
      setLoading(false);
    }
  };

  return (
    <div className=" bg-white/70 p-2 rounded-xl">
      <div className=" border-b p-2 border-gray-300">
        <h1 className="sm:text-xl font-semibold text-base"> Create product</h1>
      </div>
      <form
        className="mt-2 w-[250px] sm:w-[300px] flex flex-col gap-1"
        onSubmit={handelSubmit}
      >
        <div className="flex gap-1 flex-col ">
          <label
            htmlFor="title"
            className="font-semibold text-sm sm:text-base p-1"
          >
            {" "}
            Title :{" "}
          </label>
          <input
            type="text"
            name="title"
            id="title"
            placeholder="Enter Title..."
            value={ProductData.title}
            className="border border-gray-300 p-1 outline-none rounded-sm"
            onChange={handelProductData}
          />
        </div>
        <div className="flex gap-1 flex-col">
          <label
            htmlFor="description"
            className="font-semibold text-sm sm:text-base p-1"
          >
            {" "}
            Description :{" "}
          </label>
          <textarea
            type="textarea"
            id="description"
            name="description"
            value={ProductData.description}
            placeholder="Enter description of product ..."
            className="border border-gray-300 rounded-sm outline-none p-1 min-h-[100px] max-h-[200px]"
            onChange={handelProductData}
          ></textarea>
        </div>
        <div className="flex gap-2 flex-wrap">
          <div className="flex gap-1 items-center">
            <label
              htmlFor="offer"
              className="font-semibold text-sm sm:text-base"
            >
              Offer :
            </label>
            <input
              type="checkbox"
              name="offer"
              id="offer"
              className="border border-gray-300 rounded-sm w-[20px] h-[20px]"
              onChange={handelProductData}
              checked={ProductData.offer}
            ></input>
          </div>
          <div className="flex gap-1 items-center">
            <label
              htmlFor="regularePrice"
              className="font-semibold text-sm sm:text-base"
            >
              Regulare price :
            </label>
            <input
              type="number"
              name="regularePrice"
              id="regularePrice"
              className="border border-gray-300 outline-none p-1 rounded-sm w-[100px]"
              onChange={handelProductData}
              value={ProductData.regularePrice}
            ></input>
          </div>
          {ProductData.offer ? (
            <div className="flex gap-1 items-center">
              <label
                htmlFor="discountPrice"
                className="font-semibold text-sm sm:text-base "
              >
                Discount price :
              </label>
              <input
                type="number"
                name="discountPrice"
                id="discountPrice"
                className="border border-gray-300 outline-none p-1 rounded-sm w-[100px]"
                onChange={handelProductData}
                value={ProductData.discountPrice}
              ></input>
            </div>
          ) : (
            " "
          )}
        </div>
        <div className="border flex gap-1 p-1 items-center rounded-sm border-gray-300 ">
          <input
            type="file"
            className=" w-[80%]"
            multiple
            accept="image/*"
            onChange={(e) => {
              setFiles(Array.from(e.target.files));
            }}
          />
          <button
            disabled={loading}
            type="button"
            className={`p-1 flex justify-center items-center rounded-sm text-white flex-1  bg-slate-700 box-border ${
              loading
                ? "cursor-not-allowed opacity-75"
                : "cursor-pointer hover:bg-slate-700/80 "
            }`}
            onClick={HundelSubmitImages}
          >
            {loading ? (
              <p className="p-1">Loading...</p>
            ) : (
              <p className="p-1">UPLOAD</p>
            )}
          </button>
        </div>
        <p className="text-red-600"> {ERRORY ? ERRORY : ""} </p>
        <div className="flex gap-2 flex-wrap">
          {ProductData.imageUrl &&
            ProductData.imageUrl.length > 0 &&
            ProductData.imageUrl.map((x, index) => {
              return (
                <img
                  key={index}
                  src={x}
                  alt="product image"
                  className="w-[100px] rounded-sm"
                />
              );
            })}
        </div>
        <button
          className={`p-1 text-white bg-sky-500 rounded-sm ${
            loading
              ? "cursor-not-allowed opacity-75"
              : "hover:bg-sky-600 cursor-pointer"
          } `}
          type="submit"
          disabled={loading}
        >
          {loading ? "Loading..." : "Create Product"}
        </button>
      </form>
      <p className="text-green-600">{msg}</p>
      <p className="text-red-600">{submitError}</p>
    </div>
  );
}
