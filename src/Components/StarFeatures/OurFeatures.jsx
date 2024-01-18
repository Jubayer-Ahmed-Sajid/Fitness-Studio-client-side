import { FaRunning } from "react-icons/fa";
import { GiProgression } from "react-icons/gi";
import { IoMdTimer } from "react-icons/io";
import { CgGym } from "react-icons/cg";
import Title from "../Title/TItle";
import Container from "../Container/Container";
const Star = () => {
  // const cardStyle = 'w-[280px] max-w-xs text-center bg-primary flex flex-col justify-center items-center transform transition-transform duration-500 py-5 rounded-xl shadow-xl'

  const cardStyle =
    " w-[280px] text-center bg-primary flex flex-col justify-center items-center transform transition-transform duration-500 py-5 rounded-xl shadow-xl cursor-pointer";
  return (
    <Container>
      <div className="mt-[50px] mb-[120px]">
        <section className="">
          <Title title={"Our Features"}></Title>
            <div className="flex flex-col lg:flex-row justify-between items-center gap-8 my-[50px]">
              <div className=" ">
                <div className={`${cardStyle} hover:translate-y-4 `}>
                  <div>
                    <FaRunning className="text-8xl text-center text-white"></FaRunning>
                  </div>

                  <div className="mt-2">
                    <h3 className="text-lg font-medium text-gray-100">
                      Activity Tracking
                    </h3>
                  </div>
                </div>
              </div>

              <div
                className={`${cardStyle} hover:-translate-y-4 lg:mb-[-150px]  `}>
                <div>
                  <GiProgression className="text-8xl text-center text-white"></GiProgression>
                </div>

                <div className="mt-2">
                  <h3 className="text-lg font-medium text-gray-100">
                    Progress Analytics
                  </h3>
                </div>
              </div>

              <div className="">
                <div className={`${cardStyle} hover:translate-y-4 `}>
                  <div>
                    <IoMdTimer className="text-8xl text-center text-white"></IoMdTimer>
                  </div>

                  <div className="mt-2">
                    <h3 className="text-lg font-medium text-gray-100">
                      Time Management
                    </h3>
                  </div>
                </div>
              </div>

              <div
                className={`${cardStyle} hover:-translate-y-4 lg:mb-[-150px]`}>
                <div>
                  <CgGym className="text-8xl text-center text-white"></CgGym>
                </div>

                <div className="mt-2">
                  <h3 className="text-lg font-medium text-gray-100">
                    Workout Progress
                  </h3>
                </div>
              </div>
            </div>
        </section>
      </div>
    </Container>
  );
};

export default Star;
