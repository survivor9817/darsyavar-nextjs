import ArrowGif from "@/public/imgs/Arrow down icon animation.gif";
import LandingNavbar from "@/components/landing-page/landing-navbar";
import Image from "next/image";
import HeroTypeWriter from "@/components/landing-page/hero-typewriter";
import ChooseBook from "@/components/landing-page/choose-book";

const LandingPage = () => {
  return (
    <div className="min-w-75 max-w-4xl w-200 mx-auto">
      <LandingNavbar />

      <HeroTypeWriter />

      <div className="flex justify-center">
        <Image src={ArrowGif} alt="" className="size-20 sm:size-26" />
        <Image src={ArrowGif} alt="" className="size-20 sm:size-26" />
        <Image src={ArrowGif} alt="" className="size-20 sm:size-26" />
      </div>
      <ChooseBook />
      {/* <ChooseBook2 /> */}
    </div>
  );
};

export default LandingPage;
