import React from 'react'

const FAQ = () => {
  return (
    <div className="faq flex flex-col gap-2 justify-center items-center lg:mx-[25px]">
        <h1 className="specialFont text-5xl font-bold">F.A.Q</h1>
        <div className='bg-[#ff4704] h-[5px] w-[50%] lg:w-[15%] rounded-lg'></div>
        <div className="my-[25px] flex lg:gap-2 flex-col md:flex-row">
        <div className="faq-1">
          <div className="collapse border-2 bg-[#ff4704] my-[8px] text-white">
    <input type="radio" name="my-accordion-1" /> 
    <div className="collapse-title text-xl font-medium">
    How do I get started on the platform?
    </div>
    <div className="collapse-content bg-gray-800"> 
      <p className='p-[15px]'>To begin your fitness journey with us, simply sign up for an account on our platform. Once registered, you can explore our diverse range of workouts, programs, and resources tailored to your fitness goals.</p>
    </div>
          </div>
          <div className="collapse border-2 bg-[#ff4704] my-[8px] text-white">
    <input type="radio" name="my-accordion-1" /> 
    <div className="collapse-title text-xl font-medium">
    Are the workouts suitable for all fitness levels?
    </div>
    <div className="collapse-content bg-gray-800"> 
      <p className='p-[15px]'>
        Absolutely! Our platform caters to individuals of all fitness levels, from beginners to advanced. Our programs are designed to be adaptable, allowing you to progress at your own pace and choose workouts that match your current fitness capabilities.
      </p>
    </div>
          </div>
          <div className="collapse border-2 bg-[#ff4704] my-[8px] text-white">
    <input type="radio" name="my-accordion-1" /> 
    <div className="collapse-title text-xl font-medium">
    What kind of support can I expect from the platform?
    </div>
    <div className="collapse-content bg-gray-800"> 
      <p className='p-[15px]'>
      We are committed to providing comprehensive support. Our platform offers expert guidance through certified trainers, community forums for interaction and motivation, and regular updates to keep you informed and engaged on your fitness journey.
      </p>
    </div>
          </div>
        </div>
        <div className="faq-2">
          <div className="collapse border-2 bg-[#ff4704] my-[8px] text-white">
    <input type="radio" name="my-accordion-1" /> 
    <div className="collapse-title text-xl font-medium">
    Can I access the platform on different devices?
    </div>
    <div className="collapse-content bg-gray-800"> 
      <p className='p-[15px]'>Yes, our platform is designed to be accessible on various devices, including smartphones, tablets, and computers. This flexibility ensures that you can engage with your workouts and community from anywhere at any time.</p>
    </div>
          </div>
          <div className="collapse border-2 bg-[#ff4704] my-[8px] text-white">
    <input type="radio" name="my-accordion-1" /> 
    <div className="collapse-title text-xl font-medium">
    Is there a personalized workout plan available?
    </div>
    <div className="collapse-content bg-gray-800"> 
      <p className='p-[15px]'>
      Absolutely! We understand that everyone's fitness journey is unique. Our platform offers personalized workout plans based on your fitness goals, preferences, and progress. This tailored approach ensures that you get the most out of your fitness experience.
      </p>
    </div>
          </div>
          <div className="collapse border-2 bg-[#ff4704] my-[8px] text-white">
    <input type="radio" name="my-accordion-1" /> 
    <div className="collapse-title text-xl font-medium">
    What sets your platform apart from other fitness apps?
    </div>
    <div className="collapse-content bg-gray-800"> 
      <p className='p-[15px]'>
      Our platform distinguishes itself through a combination of innovative workout programs, certified trainers, and a supportive community. We focus not only on physical fitness but also on overall well-being, aiming to create a holistic and empowering experience for our users.
      </p>
    </div>
          </div>
        </div>
        </div>
      </div>
  )
}

export default FAQ
