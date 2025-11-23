import { useDispatch, useSelector } from "react-redux";
import { addToCart, decreaseCart } from "../slices/cartSlice";
import { FaPlus, FaTrashCan } from "react-icons/fa6";
import CustomNumeralNumericFormat from "./NumberFormat";

const ProductForm = ({ product }) => {
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart);
  const productExist = cart.entities[product.id];

  const handleAddToCart = () => dispatch(addToCart({ ...product, cartQty: 1 }));
  const handleDecrease = () => dispatch(decreaseCart(product));

  return (
    <div className="w-full flex flex-row items-center gap-2">
      {productExist ? (
        <>
          <button
            onClick={handleDecrease}
            className="flex-1 flex items-center justify-center border border-orange-400 text-orange-500 bg-white/80 backdrop-blur-sm py-2 rounded-full hover:bg-orange-100 hover:text-orange-600 transition-all duration-300"
          >
            <FaTrashCan />
          </button>

          <span className="flex-1 flex items-center justify-center py-2 border border-orange-400 rounded-full bg-orange-50 text-orange-600 font-semibold">
            {productExist.cartQty}
          </span>

          <button
            onClick={handleAddToCart}
            className="flex-1 flex items-center justify-center border border-orange-400 text-orange-500 bg-white/80 backdrop-blur-sm py-2 rounded-full hover:bg-orange-100 hover:text-orange-600 transition-all duration-300"
          >
            <FaPlus />
          </button>
        </>
      ) : (
        <button
          onClick={handleAddToCart}
          className="w-full flex items-center justify-center border border-orange-400 text-orange-500 bg-white/80 backdrop-blur-sm py-2 rounded-full hover:bg-orange-100 hover:text-orange-600 transition-all duration-300"
        >
          اضافه به سبد خرید
        </button>
      )}
    </div>
  );
};

export default ProductForm;
