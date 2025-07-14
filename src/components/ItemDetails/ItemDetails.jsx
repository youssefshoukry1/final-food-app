import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import Loader from '../loader/loader';
import animation from '../../assets/json/sad emotion.json'
import Lottie from "lottie-react";
export default function ItemDetails() {
    let { iditem } = useParams();
    const [showFull, setshowFull] = useState(false);
    const toggleText = () => setshowFull(!showFull);

  console.log("meal id from URL:", iditem);


const { isLoading, data } = useQuery({
  queryKey: ['detailsProduct', iditem],
  queryFn: async () => {
    const res  = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${iditem}`);
    console.log("meal data from API:", res.data.meals[0]);
    return res?.data?.meals[0] || []; // Ensure we return an array for consistency
  }
});
  if (isLoading) {
    return <Loader />;
  }


return (
  <div className="my-11 px-4 flex justify-center">
    <div className="max-w-md w-80 lg:w-full p-6 border border-zinc-700 bg-zinc-800 rounded-2xl shadow-lg">
      <img
        className="w-full h-48 object-cover rounded-xl border border-zinc-700"
        src={data.strMealThumb}
        alt={data.strMeal}
      />
      <h2 className="text-orange-400 text-2xl font-semibold mt-4">
        {data.strMeal}
      </h2>
              <h3 className=' text-orange-400 flex gap-2' ><p className='text-white'>Know in:</p>{data?.strArea}</h3>
          <div>
            <h2>Learn how to do it in the link :</h2>
            {data?.strYoutube ? (
              <a href= {data?.strYoutube} className='text-cyan-500'> {data?.strYoutube}</a>
            ): <>
            <p className='text-red-700 text-xl'>sorry there is no video for this category</p>   
                      <Lottie
          animationData={animation}
          loop
          autoplay
          className="lg:w-16 w-32 "
        />
              
            </>
              
            }
        
      </div>
      <h2 className='my-3 text-orange-400 flex'>Recipe <p className='px-1 text-white'>:</p></h2>
      
      <p className="text-gray-300  text-sm leading-relaxed ">
          {
            showFull
              ? data.strInstructions
              : data.strInstructions?.split(" ").slice(0, 40).join(" ") + "..."
          }
        <span
        className="text-orange-500 ml-1 font-medium hover:underline cursor-pointer" 
        onClick={toggleText}
        >
          {showFull ? "seeLess" : "see More"}
        </span>
      </p>
      


    </div>
  </div>
);

}
