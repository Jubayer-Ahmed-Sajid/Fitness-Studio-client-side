import React from 'react'
import devImg from "../../assets/images/Developer.png"

const OurTeam = () => {
  return (
    <div className="ourTeam my-[50px]">
          <div className="member flex flex-col justify-center gap-2 items-center">
            <h1 className="text-center text-3xl font-bold  ">Our Team</h1>
            <div className='bg-[#ff4704] h-[4px] w-[90%] lg:w-[20%] rounded-lg'></div>
            <div className="flex flex-col md:flex-row flex-wrap gap-5 justify-evenly items-center">
              <div className="my-[20px] border-4 border-white hover:border-[#FF4804] hover:ease-out duration-[0.5s] flex flex-col items-center shadow-xl w-[90%] lg:w-[30%] rounded-md cursor-pointer p-[20px]">
                <img className="h-[100px] object-cover" src={devImg} alt="devImg"/>
                <h1 className="font-[500] text-xl">Jobayer Ahmed Sajid</h1>
                <h1 className="font-[500] text-[#ff4704]">Team Leader</h1>
              </div>
              <div className="my-[20px] border-4 border-white hover:border-[#FF4804] hover:ease-out duration-[0.5s] flex flex-col items-center shadow-xl w-[90%] lg:w-[30%] rounded-md cursor-pointer p-[20px]">
                <img className="h-[100px] object-cover" src={devImg} alt="devImg"/>
                <h1 className="font-[500] text-xl">Jobayer Rahman Ohee</h1>
                <h1 className="font-[500] text-[#ff4704]">Developer</h1>
              </div>
              <div className="my-[20px] border-4 border-white hover:border-[#FF4804] hover:ease-out duration-[0.5s] flex flex-col items-center shadow-xl w-[90%] lg:w-[30%] rounded-md cursor-pointer p-[20px]">
                <img className="h-[100px] object-cover" src={devImg} alt="devImg"/>
                <h1 className="font-[500] text-xl">Junayet Alam</h1>
                <h1 className="font-[500] text-[#ff4704]">Developer</h1>
              </div>
              <div className="my-[20px] border-4 border-white hover:border-[#FF4804] hover:ease-out duration-[0.5s] flex flex-col items-center shadow-xl w-[90%] lg:w-[30%] rounded-md cursor-pointer p-[20px]">
                <img className="h-[100px] object-cover" src={devImg} alt="devImg"/>
                <h1 className="font-[500] text-xl">Barkat Ullah Rakib</h1>
                <h1 className="font-[500] text-[#ff4704]">Developer</h1>
              </div>
              <div className="my-[20px] border-4 border-white hover:border-[#FF4804] hover:ease-out duration-[0.5s] flex flex-col items-center shadow-xl w-[90%] lg:w-[30%] rounded-md cursor-pointer p-[20px]">
                <img className="h-[100px] object-cover" src={devImg} alt="devImg"/>
                <h1 className="font-[500] text-xl">Fakhruddin ahmed</h1>
                <h1 className="font-[500] text-[#ff4704]">Developer</h1>
              </div>
              <div className="my-[20px] border-4 border-white hover:border-[#FF4804] hover:ease-out duration-[0.5s] flex flex-col items-center shadow-xl w-[90%] lg:w-[30%] rounded-md cursor-pointer p-[20px]">
                <img className="h-[100px] object-cover" src={devImg} alt="devImg"/>
                <h1 className="font-[500] text-xl">Md Shahriar Salam Arman</h1>
                <h1 className="font-[500] text-[#ff4704]">Developer</h1>
              </div>
            </div>
          </div>
        </div>
  )
}

export default OurTeam
