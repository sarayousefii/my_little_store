import Product from "./Product";

const ProductsList = ({ products, isSuccess, isLoading, isError }) => {
  return (
    <div className="py-5">
      <div className="container mx-auto px-4">
        {isLoading && (
          <p className="text-center text-white text-lg py-16">در حال بارگذاری...</p>
        )}

        {isError && (
          <p className="text-center text-red-500 text-lg py-16">مشکلی پیش آمده...</p>
        )}

        {isSuccess && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products?.map((product, index) => (
              <Product key={index} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsList;
