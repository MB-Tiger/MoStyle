import { useState } from "react";
import Link from "next/link";
import PageHead from "../../components/PageHead";

const ProductInfo = () => {
  return (
    <>
      <PageHead title={"Products"} desc={"mines"} />
      <div className="w-full min-h-screen bg-white">
        <div className="w-full flex justify-center items-center h-12 bg-[#F6F7F8] mb-10">
          <div>
            <Link href={"/"}>
              <span className="text-[#33A0FF] cursor-pointer">Home </span>
            </Link>
            <span className="text-sm text-[#C1C8CE]">/</span>
            <Link href={"/products"}>
              <span className="text-[#33A0FF] cursor-pointer"> Products </span>
            </Link>
            <span className="text-sm text-[#C1C8CE]">/</span>
            <span> Nike Airmax 270</span>
          </div>
        </div>
        <div className="container"></div>
      </div>
    </>
  );
};

export default ProductInfo;
