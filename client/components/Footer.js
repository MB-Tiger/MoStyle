import Link from "next/link";
import Facebook from "../assets/svg/Facebook";
import Twitter from "../assets/svg/Twitter";

const Footer = () => {
  return (
    <footer className="w-full bg-[#BCDDFE] pt-20 pb-10">
      <div className="container">
        <div className="flex flex-wrap justify-between mb-8">
          <div className="w-[235px] mx-2 mb-12">
            <div className="flex items-center space-x-2">
              <img className="w-10" src="/images/MR.Logo2.png" alt="Logo" />
              <p className="text-lg font-semibold">MoStyle</p>
            </div>
            <div className="text-sm mt-4">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever.Since the 1500s, when an unknown printer.
            </div>
          </div>
          <div className="w-[235px] mx-2 mb-12">
            <p className="text-lg font-semibold">Follow Us</p>
            <div className="text-sm mt-4">
              Since the 1500s, when an unknown printer took a galley of type and
              scrambled.
            </div>
            <div className="flex items-center space-x-8 mt-4">
              <Facebook />
              <Twitter />
            </div>
          </div>
          <div className="w-[180px] mx-2 mb-12">
            <p className="text-lg font-semibold mb-4">Contact Us</p>
            <div>E-commTor, 4578 Marmora Road, Glasgow D04 89GR</div>
          </div>
        </div>
        <div className="flex flex-wrap justify-between">
          <div className="mb-12 mx-2">
            <p className="text-lg font-semibold mb-4">Information</p>
            <ul>
              <li>Anout Us</li>
              <li>Information</li>
              <li>Privacy Policy</li>
              <li>Terms & Conditions</li>
            </ul>
          </div>
          <div className="mb-12 mx-2">
            <p className="text-lg font-semibold mb-4">Service</p>
            <ul>
              <li>About Us</li>
              <li>Information</li>
              <li>Privacy Policy</li>
              <li>Terms & Conditions</li>
            </ul>
          </div>
          <div className="mb-12 mx-2">
            <p className="text-lg font-semibold mb-4">My Account</p>
            <ul>
              <li>About Us</li>
              <li>Information</li>
              <li>Privacy Policy</li>
              <li>Terms & Conditions</li>
            </ul>
          </div>
          <div className="mb-12 mx-2">
            <p className="text-lg font-semibold mb-4">Our Offers</p>
            <ul>
              <li>About Us</li>
              <li>Information</li>
              <li>Privacy Policy</li>
              <li>Terms & Conditions</li>
            </ul>
          </div>
        </div>
        <div className="w-[95%] h-[2px] rounded-full bg-white mx-auto mt-8"></div>
        <div className="flex flex-wrap justify-between items-center mt-8">
          <div className="text-[#C1C8CE] text-sm mb-2">
            @ 2018 Ecomerce theme by www.bisenbaev.com
          </div>
          <img className="mb-2" src="/images/Brands.png" alt="Brands" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
