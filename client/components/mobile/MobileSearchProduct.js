import Search from "../../assets/svg/Search";
import Favorite from "../../assets/svg/Favorite";
import Notification from "../../assets/svg/Notification";

const MobileSearchProduct = () => {
  return (
    <div className="w-full grid grid-cols-4 bg-white border-b shadow-sm p-4 mb-4">
      <div className="w-full col-span-3 relative">
        <input
          type="text"
          placeholder="Search Product"
          className="w-full border p-2 pl-8 h-[46px] rounded"
        />
        <div className="absolute top-1/2 left-2 -translate-y-[42%]">
          <Search />
        </div>
      </div>
      <div className="col-span-1 flex justify-around items-center ml-1">
        <Favorite />
        <Notification />
      </div>
    </div>
  );
};

export default MobileSearchProduct;
