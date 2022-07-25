import Link from "next/link";
import PageHead from "../components/PageHead";
import ProductPattern from "../assets/svg/ProductPattern";
import ProductCard from "../components/ProductCard";
import MobileProductCard from "../components/mobile/MobileProductCard";
import MobileNavbar from "../components/mobile/MobileNavbar";

const Products = () => {
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
              <div>13 items</div>
              <ProductPattern />
            </div>
            <div className="md:flex hidden flex-wrap justify-between items-center">
              <ProductCard />
            </div>
            <div className="flex md:hidden flex-wrap justify-around items-center">
              <MobileProductCard />
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default Products;
