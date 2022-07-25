import Link from "next/link";
import Home from "../../assets/svg/Home";
import Cart from "../../assets/svg/Cart";
import User from "../../assets/svg/User";
import Shop from "../../assets/svg/Shop";

const MobileNavbar = () => {
  return (
    <nav className="w-full bg-white md:hidden fixed flex sm:justify-center justify-around items-center sm:space-x-20 space-x-1 bottom-0 p-2 border-t shadow-sm z-50">
      <Link href={"/"}>
        <div className="flex flex-col items-center cursor-pointer">
          <Cart color="#9098B1" />
          <p className="text-sm font-medium text-[#9098B1]">Cart</p>
        </div>
      </Link>
      <Link href={"/"}>
        <div className="flex flex-col items-center cursor-pointer">
          <Home />
          <p className="text-sm font-medium text-[#9098B1]">Home</p>
        </div>
      </Link>
      <Link href={"/"}>
        <div className="flex flex-col items-center cursor-pointer">
          <User color="#9098B1" />
          <p className="text-sm font-medium text-[#9098B1]">User</p>
        </div>
      </Link>
      <Link href={"/products"}>
        <div className="flex flex-col items-center cursor-pointer">
          <Shop />
          <p className="text-sm font-medium text-[#9098B1]">Products</p>
        </div>
      </Link>
    </nav>
  );
};

export default MobileNavbar;
