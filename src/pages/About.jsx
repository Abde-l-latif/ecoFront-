import aboutImg from "../assets/images/aboutImg.jpg";
import { Link } from "react-router";

export default function About() {
  return (
    <div className="mx-[15px] pt-22 ">
      <div className=" md:w-1/2 p-6 rounded-3xl bg-white z-10 relative w-full ">
        <h1 className="text-2xl font-semibold mb-3">Our Story</h1>
        <p>
          CoShopping was born from a simple idea: Why juggle multiple stores
          when you can find everything you need in one spot? <br /> Since our
          launch, we’ve been committed to offering a vast selection of
          high-quality products at competitive prices, saving you time and
          money.
        </p>
        <Link to={"/products"}>
          <button className="text-white bg-amber-400 p-2 rounded mt-5 cursor-pointer hover:bg-amber-500">
            Start now
          </button>
        </Link>
      </div>
      <div className=" md:w-[400px] lg:w-[600px] h-[400px] relative ">
        <img
          src={aboutImg}
          alt=""
          className="md:block absolute  md:-top-[150px] md:left-[50%] rounded-3xl hidden"
        />
        <div className="bg-white absolute  z-10 rounded-3xl p-7 bottom-[100px] lg:w-[500px] md:w-[400px] xl:-right-full md:-right-10/12 sm:block w-full">
          <h1 className="font-bold text-2xl text-slate-700 mb-3">
            Welcome to CoShopping!
          </h1>
          <p>
            At CoShopping, we believe shopping should be easy, fun, and
            accessible to everyone. Whether you're looking for electronics,
            fashion, home essentials, or unique gifts, we’ve got you covered—all
            in one place!
          </p>
        </div>
      </div>
    </div>
  );
}
