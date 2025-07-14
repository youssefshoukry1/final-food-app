import React, { useContext, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import img from '../../assets/img/store.png'
import img2 from '../../assets/img/list (1).png'
import UserContext from '../../context/userContext/UserContext';
export default function Navbar() {
    let navigate = useNavigate()
const [show, setShow] = useState(false);
const [isClosing, setIsClosing] = useState(false);
const { isLogin, setLogin } = useContext(UserContext)

const handleToggle = () => {
  if (show) {
    // بدأ القفل
    setIsClosing(true);
    setTimeout(() => {
      setShow(false);
      setIsClosing(false);
    }, 300); // نفس مدة الأنيميشن
  } else {
    setShow(true);
  }
};

  function logOut() {
    localStorage.removeItem('userToken');
    setLogin(null)
    navigate('/login')
  }

return (

  <nav className="bg-zinc-900 px-6 py-4 flex justify-between items-center shadow-md border-b border-zinc-800 relative">
    <div className="flex items-center gap-4 ">
      <img src={img} alt="logo" className="lg:w-10 w-7" />
      <h2 className="text-orange-400 lg:text-xl text-md font-bold tracking-wide">
        Ofaa Shop
      </h2>
    </div>

    <div className='items flex items-center '>
      <div className='item-left flex items-center'>
          {isLogin && (
      <>
        <li className="relative list-none lg:px-2">
        <button onClick={handleToggle} className="p-1 mx-2 rounded-md hover:bg-zinc-800 transition">
          <img src={img2} alt="list-icon" className="lg:w-5 w-4 my-2" />
        </button>

{(show || isClosing) && (
  <ul
    className={` absolute lg:left-0 lg:top-full mt-2 lg:w-52 bg-gray-900 text-white overflow-y-auto max-h-60 flex flex-col p-3 gap-2 rounded-xl z-50 
      scrollbar-thin scrollbar-thumb-orange-400 scrollbar-track-gray-800
      border border-orange-500
      ${show && !isClosing ? "animate-glow-border" : ""}
      ${isClosing ? "animate-fade-slide-up" : ""}
    `}
  >
      <li ><Link to={'seafood/categorys'}><button className=" w-full text-left px-4 py-2 rounded-md hover:bg-orange-500 hover:text-white transition">Seafood</button></Link></li>
            <li><Link to={'beef/categoryb'}><button className="w-full text-left px-4 py-2 rounded-md hover:bg-orange-500 hover:text-white transition">Beef</button></Link></li>
            <li><Link to={"Breakfast/categorybs"}><button className="w-full text-left px-4 py-2 rounded-md hover:bg-orange-500 hover:text-white transition">Breakfast</button></Link></li>
            <li><Link to={"Chiken/categoryc"}><button className="w-full text-left px-4 py-2 rounded-md hover:bg-orange-500 hover:text-white transition">Chicken</button></Link></li>
            <li><Link to={"Goat/categoryg"}><button className="w-full text-left px-4 py-2 rounded-md hover:bg-orange-500 hover:text-white transition">Goat</button></Link></li>
            <li><Link to={"Lamb/categoryl"}><button className="w-full text-left px-4 py-2 rounded-md hover:bg-orange-500 hover:text-white transition">Lamb</button></Link></li>
            <li><Link to={"Miscellaneos/categorym"}><button className="w-full text-left px-4 py-2 rounded-md hover:bg-orange-500 hover:text-white transition">Miscellaneos</button></Link></li>
            <li><Link to={"Pasta/categoryp"}><button className="w-full text-left px-4 py-2 rounded-md hover:bg-orange-500 hover:text-white transition">Pasta</button></Link></li>
            <li><Link to={"Pork/categorypk"}><button className="w-full text-left px-4 py-2 rounded-md hover:bg-orange-500 hover:text-white transition">Pork</button></Link></li>
            <li><Link to={"Side/categoryse"}><button className="w-full text-left px-4 py-2 rounded-md hover:bg-orange-500 hover:text-white transition">Side</button></Link></li>
            <li><Link to={"Strater/categorysr"}><button className="w-full text-left px-4 py-2 rounded-md hover:bg-orange-500 hover:text-white transition">Starter</button></Link></li>
            <li><Link to={"Vegan/categoryvn"}><button className="w-full text-left px-4 py-2 rounded-md hover:bg-orange-500 hover:text-white transition">Vegan</button></Link></li>
            <li><Link to={"Vegetarian/categoryvan"}><button className="w-full text-left px-4 py-2 rounded-md hover:bg-orange-500 hover:text-white transition">Vegetarian</button></Link></li>
            <li><Link to={"Dessert/categoryd"}><button className="w-full text-left px-4 py-2 rounded-md hover:bg-orange-500 hover:text-white transition">Dessert</button></Link></li>
  </ul>
)}
        
      </li>
      <li className='list-none'>
        <NavLink to="/" className="hover:text-orange-400 transition-colors duration-200">
          Home
        </NavLink>
      </li>
      </>
      
    )}
      </div>
    <ul className="flex lg:gap-6 flex-row lg:mx-6 mx-2  text-gray-200 text-sm md:text-base items-center relative">
      
      {isLogin? (
            <li onClick={logOut } className='list-none'>
        <NavLink to="/login" className="hover:text-orange-400 transition-colors duration-200 ">
          Logout 
        </NavLink>
      </li>
      ): (
        <div className='flex gap-3'>
              <li>
        <NavLink to="/login" className="hover:text-orange-400 transition-colors duration-200">
          Login
        </NavLink>
        </li>
                    <li>
        <NavLink to="/register" className="hover:text-orange-400 transition-colors duration-200">
          Register
        </NavLink>
        </li>
        </div>

        

        )
      }
    </ul>
    </div>
  </nav>
);

}
