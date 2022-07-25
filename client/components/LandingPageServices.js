import Shippingcar from "../assets/svg/ShippingCar";
import Refund from "../assets/svg/Refund";
import Support from "../assets/svg/Support";

const LandingPageServices = () => {
  return (
    <>
      <div className="flex flex-wrap justify-evenly items-center py-16">
        <div className="flex flex-col items-center mx-4 mb-10">
          <Shippingcar />
          <div className="w-[200px] text-center mt-6">
            <p className="text-lg font-semibold mb-1">FREE SHIPPING</p>
            <div>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry.
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center mx-4 mb-10">
          <Refund />
          <div className="w-[200px] text-center mt-6">
            <p className="text-lg font-semibold mb-1">100% REFUND</p>
            <div>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry.
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center mx-4 mb-10">
          <Support />
          <div className="w-[200px] text-center mt-6">
            <p className="text-lg font-semibold mb-1">SUPPORT 24/7</p>
            <div>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry.
            </div>
          </div>
        </div>
      </div>
      <div className="text-center text-3xl font-bold mb-14">LATEST NEWS</div>
      <div className="flex flex-wrap justify-evenly items-center pb-20">
        <div className="flex items-center space-x-4 mb-6">
          <img src="/images/Nike_logo_emblem_logotype 1.png" alt="Nike logo" />
          <div className="w-[180px]">
            <div className="text-[#C1C8CE] text-sm">01 Jan, 2022</div>
            <div className="text-lg font-semibold">Fashion Industry</div>
            <div className="text-sm">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry.
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-4 mb-6">
          <img src="/images/figma-1-logo 1.png" alt="Figma logo" />
          <div className="w-[180px]">
            <div className="text-[#C1C8CE] text-sm">01 Jan, 2022</div>
            <div className="text-lg font-semibold">Best Design Tools</div>
            <div className="text-sm">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry.
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-4 mb-6">
          <img src="/images/kronos-logo-1-1 2.png" alt="kronos logo" />
          <div className="w-[180px]">
            <div className="text-[#C1C8CE] text-sm">01 Jan, 2022</div>
            <div className="text-lg font-semibold">HR Community</div>
            <div className="text-sm">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry.
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingPageServices;
