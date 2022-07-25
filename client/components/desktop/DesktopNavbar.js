import Profile from "../../assets/svg/Profile";
import Cart from "../../assets/svg/Cart";
import SearchIcon from "../../assets/svg/SearchIcon";
import ArrowDown from "../../assets/svg/ArrowDown";
import Link from "next/link";

const DesktopNavbar = () => {
  return (
    <>
      <div className="container bg-white md:flex hidden justify-between items-center py-4">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            <span>EN</span>
            <ArrowDown />
          </div>
          <div className="flex items-center space-x-1">
            <span>USD</span>
            <ArrowDown />
          </div>
        </div>
        <div className="flex space-x-8">
          <div className="flex items-center space-x-2 cursor-pointer">
            <Profile />
            <span>My profile</span>
          </div>
          <div className="cursor-pointer">
            <Cart />
          </div>
          <div className="flex items-center">
            <input type="text" placeholder="$0.00" className="w-[45px]" />
            <SearchIcon />
          </div>
        </div>
      </div>
      <div className="w-full h-[1px] bg-[#FAFAFB]" />
      <nav className="w-full bg-white md:block hidden sticky top-0 z-40 py-4">
        <div className="container flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <img className="w-10" src="/images/MR.Logo2.png" alt="Logo" />
            <p className="text-lg font-semibold">E-CommTor</p>
          </div>
          <ul className="flex items-center space-x-16 text-lg font-semibold">
            <li className="cursor-pointer hover:text-[#33A0FF] transition-all">
              <Link href={"/"}>Home</Link>
            </li>
            <li className="cursor-pointer hover:text-[#33A0FF] transition-all">
              <Link href={"/products"}>Products</Link>
            </li>
            <li className="cursor-pointer hover:text-[#33A0FF] transition-all">
              <Link href={"/products"}>Shirts</Link>
            </li>
            <li className="cursor-pointer hover:text-[#33A0FF] transition-all">
              <Link href={"/products"}>Sneakers</Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default DesktopNavbar;
