import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react'
import { Link, useParams } from 'react-router-dom';
import Loader from '../loader/loader';

export default function Goat() {
  let { category } = useParams();
  console.log("meal id from URL:", category);

const { isLoading, data } = useQuery({
  queryKey: ['categoryProduct', category],
  queryFn: async () => {
    const { data } = await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=Goat`);
    console.log("meal data from API:", data);
    return data.meals || [];
  }
});
  if (isLoading) {
    return <Loader />;
  }

return (
  <div className="my-11 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-4">
    {
      data?.map((meal) => (
        <Link
          to={`/itemdetails/${meal.idMeal}`}
          key={meal.idMeal}
          className="block"
        >
          <div className="p-5 bg-zinc-800 border border-zinc-700 rounded-2xl shadow-md hover:shadow-orange-400/30 transition duration-300">
            <img
              src={meal.strMealThumb}
              alt={meal.strMeal}
              className="w-full h-40 object-cover rounded-xl border border-zinc-700"
            />
            <h2 className="text-orange-400 text-xl font-semibold mt-4 text-center">
              {meal.strMeal}
            </h2>
                  <p className="text-gray-300 mt-3 text-sm leading-relaxed">
          {
              meal?.strInstructions?.split(" ").slice(0, 40).join(" ")
          }
      </p>
          </div>
        </Link>
      ))
    }
  </div>
);

}
