import Link from "next/link";
import MobileHeader from "./MobileHeader";
import MobileSearchProduct from "./MobileSearchProduct";
import MobileCategory from "./MobileCategory";
import MobileProductCard from "./MobileProductCard";

const MobileHome = () => {
  return (
    <div className="w-full min-h-screen bg-white md:hidden block pb-12">
      <MobileSearchProduct />
      <MobileHeader />
      <MobileCategory />
      <section className="container mt-8">
        <p className="text-[#223263] font-bold mb-4">Top Products</p>
        <div className="flex items-center space-x-4 overflow-x-auto">
          <MobileProductCard />
        </div>
      </section>
      <Link href={"/products"}>
        <img
          className="container mt-6 mb-8 cursor-pointer"
          src="/images/Recomended-Product-Banner.png"
          alt="Recomended Product Banner"
        />
      </Link>
      <section className="container">
        <p className="text-[#223263] font-bold mb-4">Best Price</p>
        <div className="flex items-center space-x-4 overflow-x-auto">
          <MobileProductCard />
        </div>
      </section>
    </div>
  );
};

export default MobileHome;
