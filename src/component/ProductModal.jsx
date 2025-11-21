import { useDispatch, useSelector } from "react-redux";
import { addToCart, decreaseCart } from "../slices/cartSlice";
import { FaPlus, FaTrashCan } from "react-icons/fa6";
import { Link } from "react-router-dom";

const ProductModal = ({ product, onClose }) => {
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart);
  const productExist = cart.entities[product.id];

  const handleAddToCart = () => dispatch(addToCart({ ...product, cartQty: 1 }));
  const handleDecrease = () => dispatch(decreaseCart(product));

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
      onClick={onClose} 
    >
      <div
        className="bg-white rounded-2xl shadow-lg max-w-md w-full relative overflow-hidden"
        onClick={(e) => e.stopPropagation()} 
      >

        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="font-bold text-gray-800">{product.title}</h3>
          <button
            onClick={onClose}
            className="text-gray-700 hover:text-gray-900 transition"
          >
            ✕
          </button>
        </div>

        <div className="w-full overflow-hidden aspect-[4/3]">
          <img
            src={`http://localhost:9000/images/${product.image}`}
            alt={product.title}
            className="w-full h-full object-contain object-center transition-transform duration-300 hover:scale-105"
          />
        </div>

        <div className="p-4 flex flex-col items-center w-full">
          <p className="text-gray-600 text-center line-clamp-1">{product.description}</p>

          <Link
            to={`/products/${product.id}`}
            className="mt-2 px-3 py-1 text-sm bg-gray-800 text-white rounded-full hover:bg-gray-900 transition"
          >
            جزییات محصول
          </Link>

          <p className="text-orange-500 font-bold mt-2">{product.price.toLocaleString()} تومان</p>

          <div className="flex flex-row flex-wrap justify-center gap-3 mt-4">
            {productExist && (
              <button
                onClick={handleDecrease}
                className="w-12 h-12 flex items-center justify-center text-white bg-orange-500 rounded-full hover:bg-orange-600 transition"
              >
                <FaTrashCan size={16} />
              </button>
            )}

            {productExist && (
              <span className="w-12 h-12 flex items-center justify-center text-white bg-black rounded-full text-sm shadow-inner">
                {productExist.cartQty}
              </span>
            )}

            <button
              onClick={handleAddToCart}
              className="w-12 h-12 flex items-center justify-center text-white bg-orange-500 rounded-full hover:bg-orange-600 transition"
            >
              <FaPlus size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
