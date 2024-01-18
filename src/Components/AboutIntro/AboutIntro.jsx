import aboutIntro from "../../assets/images/aboutIntro.png"
import React from 'react'

const AboutIntro = () => {
  return (
    <div className="intro lg:flex justify-evenly items-center">
        <div className="lg:w-[50%]">
        <h1 className=" text-2xl lg:text-5xl font-bold my-[15px] ">About <span className="text-[#ff4704]" >FitnessStudio</span></h1>
        <p className="font-[500]">Welcome to our inclusive <span className="text-[#ff4704] font-bold">Fitnessstudio</span>, where certified trainers offer personalized <span className="text-[#ff4704] font-bold">workouts </span>, including HIIT, yoga, and strength conditioning. Whether you're a fitness enthusiast or beginner, we're here to support your journey to improved health and wellness in a motivating atmosphere. Join us to redefine your fitness experience and achieve your <span className="text-[#ff4704] font-bold">goals.</span></p>
        </div>
        <div className="lg:w-[50%]">
        <img className="w-full" src={aboutIntro} alt="About page" />
        </div>
      </div>
  )
}

export default AboutIntro
