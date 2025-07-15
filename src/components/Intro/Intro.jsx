import React from 'react';
import video from '../../assets/videos/2894889-uhd_3840_2160_24fps.mp4';
import video2 from '../../assets/videos/vegan-food.mp4';
import animation from '../../assets/json/Burger Loading - Food & Beverage.json'
import Lottie from 'lottie-react';

export default function Intro({ scrollToRef }) {
  const handleScroll = () => {
    scrollToRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative h-screen w-full">
                    <div className=' absolute  flex justify-center '>
          <Lottie animationData={animation} loop={true} className='flex w-56 lg:w-96 lg:-my-12  '/>
        </div>
      <video
        src={video}
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-screen object-cover"
      />

      {/* Overlay content */}
      <div className="  absolute top-0 left-0 w-full h-full flex flex-col items-start justify-center bg-black/40 px-10 lg:px-20 ">
        <h1 className="text-orange-400 lg:text-7xl text-3xl font-bold my-4 lg:my-10">
          Welcome to
        </h1>
        <p className="text-white lg:text-5xl text-xl font-semibold mx-20 lg:mx-36">
          Our Company
        </p>

       <button
  onClick={handleScroll}
  className="group relative lg:mx-96 mx-32 my-5 flex items-center gap-3 rounded-2xl bg-orange-400 px-6 py-2 text-white font-bold shadow-xl hover:bg-orange-500 transition-all duration-500 ease-in-out hover:shadow-orange-500/50 active:scale-95"
>
  <span className="text-lg lg:text-xl">Let's Start</span>

  <div className="relative w-10 h-10 overflow-hidden rounded-full shadow-md group-hover:scale-110 transition-transform duration-500">
    <video
      src={video2}
      autoPlay
      loop
      muted
      playsInline
      className="absolute top-0 left-0 w-full h-full object-cover"
    />
    <div className="absolute inset-0 bg-black/20 rounded-full group-hover:bg-black/10 transition-all duration-500" />
  </div>

  <span className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 opacity-0 group-hover:opacity-20 blur-md transition-all duration-500" />
</button>


      </div>

    </div>
  );
}
