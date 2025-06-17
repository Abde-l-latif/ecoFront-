import React from "react";

export default function Help() {
  return (
    <>
      <div className="bg-slate-900 h-[500px] flex items-center flex-col justify-center rounded-b-lg">
        <div className="text-white flex flex-col items-center gap-3">
          <h1 className="text-4xl mb-4 font-bold">Customer Care</h1>
          <p className="border-b w-[150px] border-white"></p>
          <p className="text-2xl">we're here to Help </p>
          <p className="text-center">
            Our Customer Care team is here to assist you with any questions,
            <br /> concerns, or issues you may have.
          </p>
        </div>
      </div>
      <div className="flex gap-5 m-[15px] flex-col md:flex-row">
        <div className="flex-1 bg-green-100 rounded-lg p-3">
          <h1 className="text-center text-2xl font-semibold mb-3">
            {" "}
            We're here to help{" "}
          </h1>
          <form className="flex flex-col gap-5">
            <div className=" flex flex-col sm:flex-row gap-6">
              <div className="flex flex-col flex-1">
                <label htmlFor="Firstname">First name : </label>
                <input
                  type="text"
                  name="Firstname"
                  className="border-b outline-none"
                />
              </div>
              <div className="flex flex-col flex-1">
                <label htmlFor="Lastname">Last name : </label>
                <input
                  type="text"
                  name="Lastname"
                  className="border-b outline-none"
                />
              </div>
            </div>
            <div className=" flex  flex-col sm:flex-row  gap-6">
              <div className="flex flex-col flex-1">
                <label htmlFor="Email">Email : </label>
                <input
                  type="text"
                  name="Email"
                  className="border-b outline-none"
                />
              </div>
              <div className="flex flex-col flex-1">
                <label htmlFor="Number">Phone: </label>
                <input
                  type="number"
                  name="Number"
                  className="border-b outline-none"
                />
              </div>
            </div>
            <div className="flex flex-col">
              <label htmlFor="message"> Message :</label>
              <textarea
                name="message"
                className="border-b outline-none min-h-[100px] max-h-[200px]"
              ></textarea>
            </div>
            <button className="bg-slate-800 text-white p-2 rounded-lg hover:bg-slate-800/80 cursor-pointer">
              {" "}
              Submit{" "}
            </button>
          </form>
        </div>

        <div className="flex-1 bg-blue-100 rounded-lg p-3 text-center ">
          <h1 className="text-center text-lg sm:text-2xl font-semibold mb-5">
            More Ways to Contact Us
          </h1>
          <div className="flex flex-col items-center gap-3">
            <h2 className="pb-[30px] w-fit border-b text-base sm:text-xl font-medium">
              Whatsapp Chat
            </h2>
            <p className="mb-5 text-sm sm:text-base">
              Our Customer Care team is here to assist you with any questions,
              <br /> concerns, or issues you may encounter.
            </p>
          </div>
          <div className="flex flex-col items-center  gap-3">
            <h2 className="pb-[30px] w-fit border-b text-base sm:text-xl font-medium">
              Email Support
            </h2>
            <p className="mb-5 text-sm sm:text-base">
              Send us an email at CoShopping@mysite.com, and we’ll respond
              within <br />
              48 hours.
            </p>
          </div>
          <div className="flex flex-col items-center  gap-3">
            <h2 className="pb-[30px] w-fit border-b text-base sm:text-xl font-medium">
              Call Us
            </h2>
            <p className="mb-5 text-sm sm:text-base">
              Call us at 123-456-7890 <br />
              for direct assistance from our support team.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
