import Link from "next/link";
import Rating from "react-rating";
import MobileFullStar from "../../assets/svg/MobileFullStar";
import MobileEmptyStar from "../../assets/svg/MobileEmptyStar";

const MobileProductCard = () => {
  return (
    <>
      <Link href={"/product/1"}>
        <div className="min-w-[165px] max-w-[165px] border rounded shadow-sm hover:shadow-md transition-all p-4 mb-4 mx-1">
          <img
            className="w-full rounded mb-2"
            src="/images/imageProduct01.png"
            alt="Image Product"
          />
          <p className="text-sm font-semibold">Nike Air Max 270 React</p>
          <Rating
            emptySymbol={<MobileEmptyStar />}
            fullSymbol={<MobileFullStar />}
            placeholderRating={4}
            placeholderSymbol={<MobileFullStar />}
            fractions={10}
            readonly
          />
          <p className="text-sm font-semibold mt-3 text-[#40BFFF]">$299,43</p>
        </div>
      </Link>
      <Link href={"/product/1"}>
        <div className="min-w-[165px] max-w-[165px] border rounded shadow-sm hover:shadow-md transition-all p-4 mb-4 mx-1">
          <img
            className="w-full rounded mb-2"
            src="/images/imageProduct01.png"
            alt="Image Product"
          />
          <p className="text-sm font-semibold">Nike Air Max 270 React</p>
          <Rating
            emptySymbol={<MobileEmptyStar />}
            fullSymbol={<MobileFullStar />}
            placeholderRating={4}
            placeholderSymbol={<MobileFullStar />}
            fractions={10}
            readonly
          />
          <p className="text-sm font-semibold mt-3 text-[#40BFFF]">$299,43</p>
        </div>
      </Link>
      <Link href={"/product/1"}>
        <div className="min-w-[165px] max-w-[165px] border rounded shadow-sm hover:shadow-md transition-all p-4 mb-4 mx-1">
          <img
            className="w-full rounded mb-2"
            src="/images/imageProduct01.png"
            alt="Image Product"
          />
          <p className="text-sm font-semibold">Nike Air Max 270 React</p>
          <Rating
            emptySymbol={<MobileEmptyStar />}
            fullSymbol={<MobileFullStar />}
            placeholderRating={4}
            placeholderSymbol={<MobileFullStar />}
            fractions={10}
            readonly
          />
          <p className="text-sm font-semibold mt-3 text-[#40BFFF]">$299,43</p>
        </div>
      </Link>
      <Link href={"/product/1"}>
        <div className="min-w-[165px] max-w-[165px] border rounded shadow-sm hover:shadow-md transition-all p-4 mb-4 mx-1">
          <img
            className="w-full rounded mb-2"
            src="/images/imageProduct01.png"
            alt="Image Product"
          />
          <p className="text-sm font-semibold">Nike Air Max 270 React</p>
          <Rating
            emptySymbol={<MobileEmptyStar />}
            fullSymbol={<MobileFullStar />}
            placeholderRating={4}
            placeholderSymbol={<MobileFullStar />}
            fractions={10}
            readonly
          />
          <p className="text-sm font-semibold mt-3 text-[#40BFFF]">$299,43</p>
        </div>
      </Link>
    </>
  );
};

export default MobileProductCard;
