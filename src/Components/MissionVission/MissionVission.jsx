import React from 'react'
import missionpic from "../../assets/images/missionpic.png"
import visionImg from "../../assets/images/visionImg.png"

const MissionVission = () => {
  return (
    <div>
        <div className="mission and vision section my-[50px]">
          <div className="flex flex-col items-center">
           <h1 className="font-bold text-3xl">Our Mission
           <spna className="specialFont text-[#ff4704]"> & </spna>
           Vision</h1>
           <div className='bg-[#ff4704] h-[4px] w-[90%] lg:w-[25%] rounded-lg'></div>
          </div>
          <div className="missionSection flex flex-col lg:flex-row gap-2 my-[25px] items-center ">
            <div  className="lg:w-[50%]">
            <img  className="w-full " src={missionpic} alt="mission pic"/>
            </div>
            <div className="lg:w-[50%] flex flex-col gap-2">
              <h1 className="text-2xl font-bold">Our Mission</h1>
              <div className='bg-[#ff4704] h-[4px] w-[30%] lg:w-[25%] rounded-lg'></div>
              <p className="font-[500]">                
                Our mission is to inspire and empower individuals to lead healthier, more fulfilling lives through fitness and well-being. We are committed to creating a supportive and inclusive community where everyone, regardless of their fitness level, feels welcomed and motivated. Our goal is to provide personalized and innovative fitness solutions that cater to the diverse needs of our members. By fostering a positive and encouraging environment, we aim to guide individuals on their journey to optimal health, helping them achieve their fitness goals and embrace a sustainable and active lifestyle. Through a combination of cutting-edge programs, expert guidance, and a sense of community, we aspire to make a lasting impact on the well-being of our members, promoting a happier and healthier way of life.
              </p>
            </div>
          </div>
          <div className="visionSection flex flex-col lg:flex-row-reverse gap-2 my-[25px] items-center ">
            <div  className="lg:w-[50%]">
            <img  className="w-full " src={visionImg} alt="mission pic"/>
            </div>
            <div className="lg:w-[50%] flex flex-col gap-2 lg:text-right lg:items-end">
              <h1 className="text-2xl font-bold">Our Vision</h1>
              <div className='bg-[#ff4704] h-[4px] w-[30%] lg:w-[25%] rounded-lg'></div>
              <p className="font-[500]">                
              Our vision is to be a beacon of health and vitality, transforming lives by promoting a holistic approach to fitness and well-being. We envision a community where individuals not only achieve their fitness goals but also cultivate a profound sense of overall wellness. Through continuous innovation, personalized guidance, and a strong sense of community, we aim to set new standards in the fitness industry. Our vision is to inspire and lead a movement toward a healthier, more active, and fulfilling lifestyle, leaving a lasting impact on individuals and the broader community.
              </p>
            </div>
          </div>
        </div>
      </div>
  )
}

export default MissionVission
