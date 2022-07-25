import Link from "next/link";
import Rating from "react-rating";
import FullStar from "../assets/svg/FullStar";
import EmptyStar from "../assets/svg/EmptyStar";

const ProductCard = () => {
  return (
    <>
      <Link href={"/product/1"}>
        <div className="w-[300px] flex flex-col items-center space-y-1 pb-4 border-2 rounded mx-2 mb-8 shadow-sm hover:shadow-md transition-all cursor-pointer">
          <img
            className="w-full rounded mb-2"
            src="/images/imageProduct01.png"
            alt="Product image"
          />
          <p className="font-semibold">Nike Air Max 270 React</p>
          <Rating
            emptySymbol={<EmptyStar />}
            fullSymbol={<FullStar />}
            placeholderRating={4}
            placeholderSymbol={<FullStar />}
            fractions={10}
            readonly
          />
          <p className="text-[#40BFFF] text-lg font-semibold">$299,43</p>
        </div>
      </Link>
      {/* the next section is for test */}
      <Link href={"/product/1"}>
        <div className="w-[300px] flex flex-col items-center space-y-1 pb-4 border-2 rounded mx-2 mb-8 shadow-sm hover:shadow-md transition-all cursor-pointer">
          <img
            className="w-full mb-2"
            src="/images/imageProduct01.png"
            alt="Product image"
          />
          <p className="font-semibold">Nike Air Max 270 React</p>
          <Rating
            emptySymbol={<EmptyStar />}
            fullSymbol={<FullStar />}
            placeholderRating={4}
            placeholderSymbol={<FullStar />}
            fractions={10}
            readonly
          />
          <p className="text-[#40BFFF] text-lg font-semibold">$299,43</p>
        </div>
      </Link>
      <Link href={"/product/1"}>
        <div className="w-[300px] flex flex-col items-center space-y-1 pb-4 border-2 rounded mx-2 mb-8 shadow-sm hover:shadow-md transition-all cursor-pointer">
          <img
            className="w-full mb-2"
            src="/images/imageProduct01.png"
            alt="Product image"
          />
          <p className="font-semibold">Nike Air Max 270 React</p>
          <Rating
            emptySymbol={<EmptyStar />}
            fullSymbol={<FullStar />}
            placeholderRating={4}
            placeholderSymbol={<FullStar />}
            fractions={10}
            readonly
          />
          <p className="text-[#40BFFF] text-lg font-semibold">$299,43</p>
        </div>
      </Link>
      <Link href={"/product/1"}>
        <div className="w-[300px] flex flex-col items-center space-y-1 pb-4 border-2 rounded mx-2 mb-8 shadow-sm hover:shadow-md transition-all cursor-pointer">
          <img
            className="w-full mb-2"
            src="/images/imageProduct01.png"
            alt="Product image"
          />
          <p className="font-semibold">Nike Air Max 270 React</p>
          <Rating
            emptySymbol={<EmptyStar />}
            fullSymbol={<FullStar />}
            placeholderRating={4}
            placeholderSymbol={<FullStar />}
            fractions={10}
            readonly
          />
          <p className="text-[#40BFFF] text-lg font-semibold">$299,43</p>
        </div>
      </Link>
    </>
  );
};

export default ProductCard;
