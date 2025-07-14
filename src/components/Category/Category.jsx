import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import Loader from '../loader/loader';

export default function FoodDetails() {
  let { category } = useParams();
  console.log("meal id from URL:", category);

const { isLoading, data } = useQuery({
  queryKey: ['categoryProduct', category],
  queryFn: async () => {
    const { data } = await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
    console.log("meal data from API:", data);
    return data.meals || [];
  }
});
  if (isLoading) {
    return <Loader />;
  }

return (
  <div className="my-11 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-4">
    {
      data?.map((meal) => (
      <Link
  to={`/itemdetails/${meal.idMeal}`}
  key={meal.idMeal}
  className="block group"
>
  <div className="relative p-5 bg-zinc-800 border border-zinc-700 rounded-2xl shadow-md hover:shadow-orange-400/40 hover:shadow-2xl hover:scale-105 hover:border-orange-400 transition-all duration-500 ease-in-out overflow-hidden">
    
    {/* ضوء خلفي متحرك عند الهوفر */}
    <div className="absolute inset-0 bg-gradient-to-br from-orange-400/10 via-transparent to-yellow-300/10 opacity-0 group-hover:opacity-100 transition duration-700 blur-2xl pointer-events-none z-0"></div>

    <div className="relative z-10">
      <img
        src={meal.strMealThumb}
        alt={meal.strMeal}
        className="w-full h-40 object-cover rounded-xl border border-zinc-700 group-hover:scale-105 transition-transform duration-500"
      />
      <h2 className="text-orange-400 text-xl font-semibold mt-4 text-center group-hover:text-yellow-300 transition-colors duration-300">
        {meal.strMeal}
      </h2>
      <p className="text-gray-300 mt-3 text-sm leading-relaxed text-justify">
        {meal?.strInstructions?.split(" ").slice(0, 40).join(" ")}
      </p>
    </div>
  </div>
</Link>

      ))
    }
  </div>
);

}
