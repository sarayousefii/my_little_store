import { useState } from "react";
import ProductModal from "./ProductModal";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, decreaseCart } from "../slices/cartSlice";
import { FaPlus, FaTrashCan } from "react-icons/fa6";

const Product = ({ product }) => {
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart);
  const productExist = cart.entities[product.id];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleAddToCart = () => {
    dispatch(addToCart({ ...product, cartQty: 1 }));
  };

  const handleDecrease = () => {
    dispatch(decreaseCart(product));
  };

  return (
    <>
      <div
        className="relative bg-white border border-gray-200 rounded-2xl shadow-md cursor-pointer hover:shadow-xl transition-transform duration-300 hover:scale-105"
        onClick={openModal}
      >
        <div className="relative w-full overflow-hidden rounded-t-2xl aspect-[4/3]">
          <img
            src={import.meta.env.MODE === "development" ? `http://localhost:10000/images/${product.image}` : "https://my-little-store-api.onrender.com" }
            alt={product.title}
            className="w-full h-full object-contain object-center transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 hover:opacity-100 flex items-center justify-center text-white font-bold transition-opacity">
            مشاهده جزئیات
          </div>
        </div>

        <div className="flex justify-center -mt-3 mb-2 gap-2 relative z-10">
          {productExist && (
            <button
              onClick={(e) => { e.stopPropagation(); handleDecrease(); }}
              className="w-8 h-8 flex items-center justify-center text-white bg-orange-500 rounded-full hover:bg-orange-600 transition"
            >
              <FaTrashCan size={14} />
            </button>
          )}

          {productExist && (
            <span className="w-8 h-8 flex items-center justify-center text-white bg-black rounded-full text-sm shadow-inner">
              {productExist.cartQty}
            </span>
          )}

          <button
            onClick={(e) => { e.stopPropagation(); handleAddToCart(); }}
            className="w-8 h-8 flex items-center justify-center text-white bg-orange-500 rounded-full hover:bg-orange-600 transition"
          >
            <FaPlus size={14} />
          </button>
        </div>

        <div className="p-4 flex flex-col items-center">
          <h3 className="font-bold text-xl text-gray-800 text-center">{product.title}</h3>
          <p className="text-orange-500 font-bold mt-1">{product.price.toLocaleString()} تومان</p>
        </div>
      </div>

      {isModalOpen && <ProductModal product={product} onClose={closeModal} />}
    </>
  );
};

export default Product;
