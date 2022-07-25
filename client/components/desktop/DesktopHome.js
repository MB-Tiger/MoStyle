import DesktopHeader from "./DesktopHeader";
import ProductCard from "../ProductCard";
import LandingPageServices from "../LandingPageServices";
import Link from "next/link";

const DesktopHome = () => {
  return (
    <div className="w-full min-h-screen bg-white md:block hidden">
      <DesktopHeader />
      <section className="container pt-8 pb-2">
        <div className="text-center text-3xl font-bold mb-10">Top Products</div>
        <div className="flex flex-wrap justify-between items-center">
          <ProductCard />
        </div>
        <Link href={"/products"}>
          <div className="text-blue-500 font-semibold text-center underline underline-offset-4 cursor-pointer">
            LOAD MORE
          </div>
        </Link>
      </section>
      <div className="w-full h-[600px] bg-[#40BFFF] relative mt-20">
        <img
          className="absolute -top-20 right-0"
          src="/images/shoes-shoe-png-transparent-shoe-images-pluspng-17 1.png"
          alt="header shoe"
        />
        <div className="max-w-[475px] absolute lg:top-1/2 lg:-translate-y-1/2 bottom-8 left-12 text-white">
          <div className="text-4xl font-bold mb-4">
            Adidas Men Running Sneakers
          </div>
          <div className="text-lg mb-1">
            Performance and design. Taken right to the edge.
          </div>
          <Link href={"/products"}>
            <div className="underline underline-offset-4 font-medium cursor-pointer">
              SHOPE NOW
            </div>
          </Link>
        </div>
      </div>
      <LandingPageServices />
    </div>
  );
};

export default DesktopHome;
