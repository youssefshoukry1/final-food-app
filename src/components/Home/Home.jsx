import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React, { useRef } from 'react'
import Loader from '../loader/loader';
import { Link } from 'react-router-dom';
import Intro from '../Intro/Intro';
export default function Home() {
  const scrollRef = useRef();

const { data, isLoading } = useQuery({
  queryKey: ['home'],
  queryFn: () =>
    axios
      .get("https://www.themealdb.com/api/json/v1/1/categories.php")
      .then((res) => res.data), // بنرجّع res.data كلها هنا
  select: (data) => data.categories // وبنختار categories من اللي رجع
});

if(isLoading){
  
    return (<Loader/>) 
  
  
}else{
return (
  <>
    <Intro scrollToRef={scrollRef}/>
  <div className='my-11 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-4 rounded-2xl'
  ref={scrollRef}
  >
    {
      data?.map((food) => {
        return (
<div
  key={food.idCategory}
  className="group main p-5 bg-zinc-900 border border-zinc-700 rounded-2xl shadow-md transition duration-500 ease-in-out hover:shadow-orange-400/40 hover:shadow-2xl hover:scale-105 hover:border-orange-400 relative overflow-hidden"
>
  {/* إضاءة متحركة خلفية عند الهوفر */}
  <div className="absolute inset-0 bg-gradient-to-br from-orange-400/10 via-transparent to-yellow-300/10 opacity-0 group-hover:opacity-100 transition duration-700 blur-2xl pointer-events-none"></div>

  <Link to={`/categoryfood/${food.strCategory}`} className='text-center block relative z-10'>
    <img
      className="w-full h-40 object-cover rounded-xl border border-zinc-700 group-hover:scale-105 transition-transform duration-500"
      src={food?.strCategoryThumb}
      alt={food.strCategory}
    />
    <h2 className="text-orange-400 text-xl font-semibold mt-4 tracking-wide group-hover:text-yellow-300 transition-colors duration-300">
      {food.strCategory}
    </h2>
  </Link>
</div>

        );
      })
    }
<Link to="/random/randomid" className="w-full md:w-80">
  <div className="relative h-60 rounded-xl overflow-hidden shadow-lg bg-gradient-to-br from-yellow-200 via-orange-100 to-orange-300 animate-pulse border border-orange-300">
    
    {/* Animation Shadow */}
    <div className="absolute inset-0 z-0 rounded-xl before:absolute before:inset-0 before:rounded-xl before:animate-glow before:bg-gradient-to-r before:from-orange-400 before:via-yellow-500 before:to-pink-500 before:opacity-30" />

    {/* نص الكارت */}
    <div className="absolute inset-0 z-10 flex items-center justify-center px-4 text-center">
      <h2 className="text-white text-xl font-bold leading-snug drop-shadow-lg">
        Get a <span className="text-orange-400">Random Meal</span> <br /> Let's Surprise You! 🎲
      </h2>
    </div>
  </div>
</Link>

    
  </div>
  </>

);

}


}
