import ArrowGif from "@/public/imgs/Arrow down icon animation.gif";
import LandingNavbar from "@/components/landing-navbar";
import Image from "next/image";

const LandingPage = () => {
  return (
    <div className="flex justify-center">
      <div className="min-w-75 max-w-4xl w-200">
        <LandingNavbar />

        {/* <HeroTypeWriter /> */}

        <div className="flex justify-center">
          <Image src={ArrowGif} alt="" className="size-20 sm:size-26" />
          <Image src={ArrowGif} alt="" className="size-20 sm:size-26" />
          <Image src={ArrowGif} alt="" className="size-20 sm:size-26" />
        </div>
        {/* <ChooseBook /> */}
        {/* <ChooseBook2 /> */}
      </div>
    </div>
  );
};

export default LandingPage;
