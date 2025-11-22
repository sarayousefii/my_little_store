import { useParams, Link } from "react-router-dom";
import { useGetProductQuery } from "../slices/productApi";
import ProductForm from "./ProductForm";
import { Helmet } from "react-helmet";

const ProductDetails = () => {
  const { productID } = useParams();
  const { data: product = [], isError } = useGetProductQuery(productID);
  const { title, price, description, image } = product;

  if (isError) return <p className="text-center mt-12 text-red-500">مشکلی پیش آمده...</p>;
  if (!product.id) return <p className="text-center mt-12 text-gray-400">در حال بارگذاری...</p>;

  return (
    <div className="bg-gray-100 min-h-screen px-4 py-12 flex justify-center">
      <Helmet>
        <title>{`قیمت و خرید ${title}`}</title>
      </Helmet>

      <div className="bg-white rounded-3xl w-full max-w-5xl shadow-lg p-8 flex flex-col gap-8">

        <div className="w-full rounded-2xl overflow-hidden shadow-sm aspect-[4/3]">
          <img
            src={import.meta.env.MODE === "development" ? `http://localhost:10000/images/${image}` : "https://my-little-store-api-1.onrender.com" }
            alt={title}
            className="w-full h-full object-contain object-center rounded-2xl transition-transform duration-500 hover:scale-105"
          />
        </div>

        <div className="flex flex-col gap-4">
          <h2 className="text-4xl font-extrabold text-gray-800">{title}</h2>
          <p className="text-gray-600 text-lg leading-relaxed">{description}</p>
          <p className="text-orange-500 font-bold text-2xl">قیمت: {price.toLocaleString()} تومان</p>
        </div>

        <div className="w-full flex flex-col gap-4">
          <ProductForm product={product} />

          <Link
            to="/"
            className="w-full text-center py-3 rounded-full bg-gray-200 text-gray-800 hover:bg-gray-300 transition-colors font-semibold"
          >
            بازگشت به محصولات
          </Link>
        </div>

      </div>
    </div>
  );
};

export default ProductDetails;
