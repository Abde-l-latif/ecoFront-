import { useSelector } from "react-redux";

export default function Orders() {
  const { dataOrder } = useSelector((state) => state.PRODUCT);
  const { userInfo } = useSelector((state) => state.USER);

  return (
    <div className="bg-white/70 p-2 rounded-lg shadow">
      <h1 className="font-semibold text-slate-800 text-xl">Orders</h1>
      {dataOrder ? (
        <>
          <div className=" bg-gray-500/20 mt-3 p-3 rounded-lg">
            <h1 className="font-semibold">Shipping Information</h1>
            <div className="flex gap-6">
              <h6 className="font-medium">name</h6>
              <p className="text-gray-700 capitalize">{dataOrder.name}</p>
            </div>
            <div className="flex gap-6">
              <h6 className="font-medium">email</h6>
              <p>{dataOrder.email}</p>
            </div>
            <div className="flex gap-6">
              <h6 className="font-medium">phone</h6>
              <p>{dataOrder.phone}</p>
            </div>
            <div className="flex gap-6">
              <h6 className="font-medium">country</h6>
              <p>{dataOrder.country}</p>
            </div>
            <div className="flex gap-6">
              <h6 className="font-medium">city</h6>
              <p>{dataOrder.city}</p>
            </div>
            <div className="flex gap-6">
              <h6 className="font-medium">Zip</h6>
              <p>{dataOrder.ZipCode}</p>
            </div>
          </div>
          <div className=" mt-3 p-3 rounded-lg">
            <h1 className="font-semibold">Products</h1>
            <div className="flex flex-col gap-3">
              {dataOrder.productCart.map((x, index) => {
                return (
                  <div
                    key={index}
                    className="p-2 bg-gray-500/30 rounded-lg flex items-center gap-3"
                  >
                    <img
                      src={x.imageUrl}
                      alt=""
                      className="w-[80px] h-[50px] "
                    />
                    <div className="font-semibold">
                      <h1>{x.title}</h1>
                    </div>
                    <p className="text-gray-500">
                      x{x.addCart.find((x) => x.id == userInfo._id)?.Qty}
                    </p>
                    <p className="font-bold text-sm text-slate-600">
                      ${x.regularePrice - x.discountPrice} /
                    </p>
                    <p className="font-bold text-sm">
                      $
                      {x.addCart.find((x) => x.id == userInfo._id)?.Qty *
                        (x.regularePrice - x.discountPrice)}
                    </p>
                  </div>
                );
              })}
              <div className="flex justify-between p-2">
                <h1 className="font-bold"> Total Price :</h1>
                <p className="text-green-700 font-semibold bg-green-200 p-1 rounded-sm">
                  $
                  {dataOrder.type == "Delivery"
                    ? dataOrder.totalPrice + 5
                    : dataOrder.totalPrice}
                </p>
              </div>
            </div>
          </div>
        </>
      ) : (
        <p className="mt-3 text-gray-600">
          {" "}
          thier is no Orders in your Account{" "}
        </p>
      )}
    </div>
  );
}
