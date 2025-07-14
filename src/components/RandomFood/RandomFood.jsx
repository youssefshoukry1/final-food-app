import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Loader from '../loader/loader';

export default function RandomFood() {
  const [showFull, setShowFull] = useState(false);
  const toggleText = () => setShowFull(!showFull);
  const [timer, setTimer] = useState(30); // العداد التنازلي

  // دالة جلب البيانات
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['Random'],
    queryFn: () =>
      axios
        .get('https://www.themealdb.com/api/json/v1/1/random.php')
        .then((res) => res?.data?.meals[0]),
  });

  // عداد تنازلي كل ثانية
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev === 1) {
          refetch();     // لما يوصل صفر، نجيب وجبة جديدة
          return 30;     // ونرجّع العداد
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval); // تنظيف التايمر
  }, [refetch]);

  if (isLoading || !data) {
    return <Loader />;
  }

  return (
    <>
      <div className="my-11 px-4 flex justify-center">
        <div className="max-w-md lg:w-full w-80 p-6 border border-zinc-700 bg-zinc-800 rounded-2xl shadow-lg">
          {/* عداد */}
          <div className="mb-2 text-gray-400 text-sm text-right">
            Next meal in: <span className="text-orange-400 font-semibold">{timer}</span> sec
          </div>

          <img
            className="w-full h-48 object-cover rounded-xl border border-zinc-700"
            src={data.strMealThumb}
            alt={data.strMeal}
          />
          <h2 className="text-orange-400 text-2xl font-semibold mt-4">{data.strMeal}</h2>

          <h3 className="text-orange-400 flex gap-2">
            <p className="text-white">Known in:</p> {data?.strArea}
          </h3>

          <div className="my-2">
            <h2>Learn how to do it in the link:</h2>
            <a
              href={data?.strYoutube}
              className="text-cyan-500"
              target="_blank"
              rel="noopener noreferrer"
            >
              {data?.strYoutube}
            </a>
          </div>

          <h2 className="my-3 text-orange-400 flex">
            Recipe <p className="px-1 text-white">:</p>
          </h2>

          <p className="text-gray-300 text-sm leading-relaxed">
            {showFull
              ? data.strInstructions
              : data.strInstructions?.split(' ').slice(0, 40).join(' ') + '...'}
            <span
              className="text-orange-500 ml-1 font-medium hover:underline cursor-pointer"
              onClick={toggleText}
            >
              {showFull ? 'see Less' : 'see More'}
            </span>
          </p>
        </div>
      </div>
    </>
  );
}
