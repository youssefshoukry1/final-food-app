import React from "react";
import { PuffLoader } from "react-spinners"; // بديل لشكل ألطف
import animation from '../../assets/json//Walking burger.json'
import Lottie from "lottie-react";
export default function Loader() {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="text-center">
        <Lottie
          animationData={animation}
          loop
          autoplay
          className="lg:w-44 w-32 mx-auto"
        />
      </div>
    </div>
  );
}