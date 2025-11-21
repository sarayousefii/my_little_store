import { useDispatch, useSelector } from "react-redux";
import { Helmet } from "react-helmet";
import CustomNumeralNumericFormat from "./NumberFormat";
import { addToCart, decreaseCart, getTotals, removeFromCart, selectAll } from "../slices/cartSlice";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { FaPlus, FaTrashCan } from "react-icons/fa6";

const CartTable = () => {
  const cart = useSelector(selectAll);
  const { cartTotalAmount } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTotals());
  }, [cart, dispatch]);

  return (
    <div className="min-h-screen px-4 py-5 bg-gray-100">

      <Helmet>
        <title>سبد خرید | فروشگاه</title>
      </Helmet>

      {cart.length === 0 ? (
        <div className="text-center mt-10 text-gray-600">
          سبد خرید شما خالی است 😊
        </div>
      ) : (
        <>
          <div className="bg-white/70 backdrop-blur-md shadow-lg shadow-black/5 border border-white/50 rounded-2xl p-4 overflow-x-auto">
            <table className="w-full text-gray-700 min-w-[600px]">
              <thead className="text-gray-500 text-sm border-b">
                <tr>
                  <th className="px-4 py-3"></th>
                  <th className="px-6 py-3">محصول</th>
                  <th className="px-6 py-3">تعداد</th>
                  <th className="px-6 py-3">قیمت</th>
                  <th className="px-6 py-3"></th>
                </tr>
              </thead>

              <tbody>
                {cart.map((item, idx) => (
                  <tr key={idx} className="border-b last:border-none hover:bg-white/50 transition">
                    <td className="p-4">
                      <Link to={`/products/${item.id}`} className="relative block w-20 h-20 rounded-lg overflow-hidden">
                        <img
                          src={`http://localhost:9000/images/${item.image}`}
                          alt={item.title}
                          className="w-full h-full object-cover rounded-lg transition-transform duration-500 hover:scale-105"
                        />
                        <div
                          className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity bg-black bg-opacity-20 text-white font-bold text-xs"
                          style={{ textAlign: "center", lineHeight: "5rem" }} 
                        >
                          مشاهده محصول
                        </div>
                      </Link>
                    </td>

                    <td className="px-6 py-4 font-medium">{item.title}</td>

                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => dispatch(decreaseCart(item))}
                          className="w-8 h-8 flex items-center justify-center bg-orange-500 text-white rounded-full hover:bg-orange-600 transition"
                        >
                          <FaTrashCan size={14} />
                        </button>

                        <div className="w-12 text-center py-1 rounded-lg border border-gray-300 bg-gray-50 font-semibold">
                          {item.cartQty}
                        </div>

                        <button
                          onClick={() => dispatch(addToCart(item))}
                          className="w-8 h-8 flex items-center justify-center bg-orange-500 text-white rounded-full hover:bg-orange-600 transition"
                        >
                          <FaPlus size={14} />
                        </button>
                      </div>
                    </td>

                    <td className="px-6 py-4 font-semibold text-orange-500">
                      <CustomNumeralNumericFormat
                        value={item.price * item.cartQty}
                        thousandSeparator=","
                        suffix=" تومان"
                      />
                    </td>

                    <td className="px-6 py-4 text-red-500">
                      <button
                        onClick={() => dispatch(removeFromCart(item))}
                        className="hover:underline"
                      >
                        حذف
                      </button>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 bg-white/70 backdrop-blur-md p-4 rounded-2xl shadow-lg shadow-black/5 border border-white/50 flex flex-wrap justify-end items-center gap-4">
            <div className="text-lg font-semibold text-gray-700">
              قیمت کل:{" "}
              <CustomNumeralNumericFormat
                value={cartTotalAmount}
                thousandSeparator=","
                suffix=" تومان"
              />
            </div>

            <Link
              to="/checkout"
              className="px-6 py-2 rounded-xl bg-black text-white hover:bg-gray-900 transition"
            >
              تایید و پرداخت
            </Link>

            <Link
              to="/"
              className="px-6 py-2 rounded-xl bg-gray-300 text-black hover:bg-gray-400 transition"
            >
              بازگشت به محصولات
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default CartTable;
