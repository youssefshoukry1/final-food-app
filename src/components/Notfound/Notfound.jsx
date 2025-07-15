import React from 'react'
import img from '../../assets/img/error.svg'
export default function Notfound() {
  return (
<div className='flex items-center justify-center flex-col h-screen gap-4 '>
<img src={img} alt="error-massege" className=' object-cover w-2/3 lg:w-2/6 rounded-3xl '/>
</div>


  )
}