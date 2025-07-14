import React from 'react'
import { FaLinkedin, FaWhatsapp } from 'react-icons/fa'
import img from '../../assets/img/Snapchat-2125464010.jpg'
export default function Footer() {
  return (
    <footer className="bg-zinc-900 text-white py-6 mt-20">
      <div className="container mx-auto flex flex-col items-center justify-center gap-4 px-4 text-center">
        {/* الصورة */}
        <img
          src={img}
          alt="Youssef Shoukry"
          className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-lg"
        />

        {/* النص */}
        <p className="text-sm md:text-base">
          Designed and developed by <strong>Youssef Shoukry</strong>
        </p>

        {/* وسائل التواصل */}
        <div className="flex items-center gap-6 text-xl">
          <a
            href="https://www.linkedin.com/in/youssef-shoukry-4568a3348?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-400 transition"
          >
            <FaLinkedin />
          </a>
          <a
            href="https://wa.me/201204470794"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-green-400 transition"
          >
            <FaWhatsapp />
          </a>
        </div>

        {/* الرقم */}
        <p className="text-xs text-gray-400">Phone: 01204470794</p>
      </div>
    </footer>
  )
}
