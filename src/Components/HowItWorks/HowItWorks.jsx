// import React from 'react';
import { useNavigate } from "react-router";
import signupImg from "../../assets/images/Allura - Freelancing.png";
import trackingImg from "../../assets/images/Fitz - Morning Routine (1).png";
import Title from "../Title/TItle";
import Container from "../Container/Container";

const HowItWorks = () => {
  const buttonStyle =
    "p-2 xs:p-2.5 transition-all duration-500 w-[110px] xs:w-[130px] font-bold  rounded border-[3px] active:bg-[#ff470470] active:scale-90 hover:text-white";
  const textSideStyle = "flex flex-col gap-7  w-full md:w-[50%] max-w-[550px]";
  const navigate = useNavigate();
  const handleLogin = () => {
    navigate("/login");
  };
  return (
    <Container>
      <div className=" my-10">
        <Title title={"How it works"}></Title>
        {/* signup  */}
        <div className="flex flex-col md:flex-row  justify-between items-center gap-7">
          <div className="w-full md:w-[50%]">
            <img className="md:w-full mx-auto" src={signupImg} alt="" />
          </div>
          <div className={`${textSideStyle}`}>
            <h2 className="text-4xl font-semibold">Sign Up</h2>
            <p className="text-sm font-semibold">
              Access exclusive content, track your progress, and join a
              supportive community. As a member, enjoy special benefits and
              discounts. Elevate your well-being – Sign up today for a
              healthier, happier you!
            </p>
            <button
              onClick={handleLogin}
              className={`${buttonStyle} bg-[#ff470436] hover:bg-[#ff4704]  border-[#ff4704] hover:border-transparent`}>
              Log in
            </button>
          </div>
        </div>

        {/* tracking workout */}

        <div className=" flex flex-col md:flex-row-reverse  justify-between items-center gap-7">
          <div className="w-full md:w-[50%]">
            <img className="md:w-full mx-auto" src={trackingImg} alt="" />
          </div>
          <div className={`${textSideStyle} md:items-end`}>
            <h2 className="text-4xl font-semibold">Tracking workout</h2>
            <p className="text-sm font-semibold md:text-right">
              Discover the power of tracking your workouts at Finess Studio!
              Effortlessly monitor your progress, set goals, and witness your
              fitness journey unfold. Our user-friendly interface makes it easy
              to log and track every workout, providing the motivation you need
              to achieve your wellness goals.{" "}
            </p>
          </div>
        </div>
        <div className="flex flex-col md:flex-row  justify-between items-center gap-7">
          <div className="w-full md:w-[50%]">
            <img className="md:w-full mx-auto" src={signupImg} alt="" />
          </div>
          <div className={`${textSideStyle}`}>
            <h2 className="text-4xl font-semibold">Achive Goal</h2>
            <p className="text-sm font-semibold text-justify">
              Achieve your fitness goals with ease at Finess Studio! Set
              personalized milestones, track your progress, and celebrate your
              victories along the way. Our platform empowers you to design a
              roadmap to success, ensuring every step brings you closer to your
              desired outcomes. Join Finess Studio and turn your aspirations
              into achievements – start your journey towards a healthier,
              happier you today!
            </p>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default HowItWorks;
