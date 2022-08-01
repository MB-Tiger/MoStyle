import Link from "next/link";
import axios from "axios";
import { useQuery, dehydrate, QueryClient } from "@tanstack/react-query";
import PageHead from "../components/PageHead";
import ProductPattern from "../assets/svg/ProductPattern";
import ProductCard from "../components/ProductCard";
import MobileProductCard from "../components/mobile/MobileProductCard";
import MobileNavbar from "../components/mobile/MobileNavbar";

export async function getServerSideProps() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(
    ["products"],
    async () => await (await axios.get("http://localhost:4313/product")).data
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

const Products = () => {
  const { data, isLoading, isError } = useQuery(["products"], () =>
    axios.get("http://localhost:4313/product")
  );

  console.log(data);

  return (
    <>
      <PageHead title={"Products"} desc={"mines"} />
      <MobileNavbar />
      <div className="w-full min-h-screen bg-white pb-8">
        <div className="w-full flex justify-center items-center h-12 bg-[#F6F7F8]">
          <div>
            <Link href={"/"}>
              <span className="text-[#33A0FF] cursor-pointer">Home </span>
            </Link>
            <span className="text-sm text-[#C1C8CE]">/</span>
            <span> Products</span>
          </div>
        </div>
        <div className="container grid grid-cols-4 md:space-x-8 mt-10">
          <div className="md:col-span-1 col-span-4 w-full h-[400px] bg-[#F6F7F8] rounded p-4">
            filter
          </div>
          <main className="md:col-span-3 col-span-4 w-full md:mt-0 mt-8">
            <div className="w-full flex justify-between items-center bg-[#F6F7F8] rounded p-4 mb-8">
              <div>{data.data?.length} items</div>
              <ProductPattern />
            </div>
            <div className="md:flex hidden flex-wrap justify-between items-center">
              {isError ? (
                <div>
                  We are sorry. Something went wrong and we can't show you the
                  result
                </div>
              ) : isLoading ? (
                <div className="animate-spin w-16 h-16 m-16 rounded-full border-[10px] border-transparent border-b-[10px] border-b-red-800 mx-auto"></div>
              ) : (
                <ProductCard />
              )}
            </div>
            <div className="flex md:hidden flex-wrap justify-around items-center">
              {isError ? (
                <div>
                  We are sorry. Something went wrong and we can't show you the
                  result
                </div>
              ) : isLoading ? (
                <div className="animate-spin w-16 h-16 m-16 rounded-full border-[10px] border-transparent border-b-[10px] border-b-red-800 mx-auto"></div>
              ) : (
                <MobileProductCard />
              )}
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default Products;
