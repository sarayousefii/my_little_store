import MainLayout from "./component/MainLayout";
import { useGetAllProductsQuery } from "./slices/productApi";
import PaginateItems from "./component/PaginateItems";

const App=()=> {
  const { data: products=[], isSuccess, isLoading, isError } = useGetAllProductsQuery();
  return (
    <div className="flex flex-col ">
      <MainLayout>
        <PaginateItems 
          itemsPerPage={8}
          items={products}
          isLoading={isLoading}
          isSuccess={isSuccess}
          isError={isError}
        />
      </MainLayout>
    </div>
  )
}

export default App
