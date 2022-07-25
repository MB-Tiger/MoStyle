import Link from "next/link";
import Shirt from "../../assets/svg/Shirt";
import Sneaker from "../../assets/svg/Sneaker";
import Bag from "../../assets/svg/Bag";

const MobileCategory = () => {
  return (
    <section className="container mt-6">
      <div className="text-[#223263] font-bold mb-3">Categories</div>
      <div className="flex items-center space-x-4">
        <Link href={"/products"}>
          <div className="flex flex-col items-center">
            <div className="relative w-[70px] h-[70px] rounded-full border border-[#EBF0FF] shadow cursor-pointer mb-2">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <Shirt />
              </div>
            </div>
            <span className="text-xs text-[#9098B1]">Shirts</span>
          </div>
        </Link>
        <Link href={"/products"}>
          <div className="flex flex-col items-center">
            <div className="relative w-[70px] h-[70px] rounded-full border border-[#EBF0FF] shadow cursor-pointer mb-2">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <Sneaker />
              </div>
            </div>
            <span className="text-xs text-[#9098B1]">Sneakers</span>
          </div>
        </Link>
        <Link href={"/products"}>
          <div className="flex flex-col items-center">
            <div className="relative w-[70px] h-[70px] rounded-full border border-[#EBF0FF] shadow cursor-pointer mb-2">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <Bag />
              </div>
            </div>
            <span className="text-xs text-[#9098B1]">Bags</span>
          </div>
        </Link>
      </div>
    </section>
  );
};

export default MobileCategory;
