import { useState, useRef, useEffect } from "react";
import { storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {
  updateAccountSuccess,
  updateAccountError,
  updateAccountLoading,
} from "../reduxToolKit/slices/userSlice.js";
import { useDispatch, useSelector } from "react-redux";

export default function PersonnelInfo() {
  const API_URL =
    import.meta.env.VITE_API_URL || "https://ecoback-jzym.onrender.com";
  const { userInfo } = useSelector((state) => state.USER);
  const [activePass, setActivePass] = useState(false);
  const [file, setFile] = useState(null);
  const [filePerc, setFilePerc] = useState(null);
  const fileRef = useRef(null);
  const [FormData, setFormData] = useState(userInfo);
  const dispatch = useDispatch();

  useEffect(() => {
    if (file) {
      handelChangeImage(file);
    }
  }, [file]);

  const handelChangeImage = (file) => {
    const imagesRef = ref(storage, file.name);

    const uploadTask = uploadBytesResumable(imagesRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        if (progress < 100) {
          setFilePerc("Upload is " + Math.round(progress) + "% done");
        } else {
          setFilePerc(null);
        }

        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        console.log(error);
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData({ ...FormData, avatar: downloadURL });
        });
      }
    );
  };

  const handelInputChange = (e) => {
    setFormData({ ...FormData, [e.target.id]: e.target.value });
  };

  const handelActive = () => {
    activePass ? setActivePass(false) : setActivePass(true);
  };

  const handelUpdate = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateAccountLoading());
      const update = await fetch(
        `${API_URL}/api/User/UpdateUser/${FormData._id}`,
        {
          method: "PUT",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(FormData),
        }
      );
      if (!update.ok) {
        dispatch(updateAccountError("error in request"));
      }
      const res = await update.json();
      dispatch(updateAccountSuccess(res.res));
    } catch (error) {
      dispatch(updateAccountError(error));
    }
  };

  return (
    <div className=" bg-white/70 p-2 rounded-xl">
      <div className="mx-2 flex flex-col gap-4">
        <div className=" border-b p-2 border-gray-300">
          <h1 className="sm:text-xl font-semibold text-base">
            Personnel information
          </h1>
        </div>
        <form className="flex flex-col gap-2" onSubmit={handelUpdate}>
          <div className="flex flex-col justify-center">
            <input
              type="file"
              ref={fileRef}
              onChange={(e) => {
                setFile(e.target.files[0]);
              }}
              accept="image/*"
              className="hidden"
            />
            <img
              className="sm:w-[150px] sm:h-[150px] w-[100px] h-[100px] rounded-full cursor-pointer"
              src={FormData.avatar || userInfo.avatar}
              alt="imageProfile"
              onClick={() => fileRef.current.click()}
            />
            <p className="text-slate-500"> {filePerc} </p>
          </div>
          <div className="flex flex-col text-xs sm:text-base gap-2 ">
            <label htmlFor="name" className="font-semibold">
              {" "}
              Name :{" "}
            </label>
            <input
              type="text"
              name="name"
              id="username"
              value={FormData.username}
              className="bg-gray-200 outline-none rounded-sm p-2"
              onChange={handelInputChange}
            />
          </div>
          <div className="flex flex-col gap-2  text-xs sm:text-base  ">
            <label htmlFor="email" className="font-semibold">
              {" "}
              email :{" "}
            </label>
            <input
              type="text"
              name="email"
              id="email"
              value={FormData.email}
              className="bg-gray-200 outline-none rounded-sm p-2"
              onChange={handelInputChange}
            />
          </div>
          <div className=" border-gray-300 border p-2 rounded-sm  text-xs sm:text-base  flex flex-col justify-center">
            {activePass && (
              <input
                type="password"
                id="password"
                placeholder="Enter your new password... "
                className="bg-gray-200 outline-none rounded-sm p-2 w-full"
                onChange={handelInputChange}
              />
            )}
            <p
              className="text-sky-600 cursor-pointer hover:underline mt-2"
              onClick={handelActive}
            >
              Change password!
            </p>
          </div>
          <button className="bg-slate-600 text-white p-2 rounded-sm cursor-pointer hover:bg-slate-600/80">
            UPDATE
          </button>
        </form>
      </div>
    </div>
  );
}
