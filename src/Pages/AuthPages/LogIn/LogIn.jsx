import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import GoogleSignIn from "../../../Components/GoogleSignIn/GoogleSignIn";
import { useState } from "react";
import { Helmet } from "react-helmet-async";

const LogIn = () => {
  const [disable, setDisable] = useState(true);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <>
    <Helmet>
      <title>Login - Fitness Studio</title>
    </Helmet>
      <div className="flex flex-col lg:flex-row items-center justify-center gap-10">
        <div>
          <img
            className="w-[700px]"
            src="https://i.ibb.co/fNCmcRV/Login-pana-1.png"
            alt=""
          />
        </div>
        <div>
          <div className="w-full md:w-[700px] lg:w-[400px] mb-10 lg:mb-0 px-5 lg:px-0">
            <div className="w-full">
              <div>
                <h1 className="text-start text-4xl font-semibold">
                  Welcome Back !
                </h1>
                <p className="text-start text-sm text-gray-600 mt-2">
                  Enter to get unlimited access to data & information.
                </p>
              </div>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col gap-2 mt-5">
                  <div>
                    <h1 className="text-start text-sm font-medium mb-1">
                      Email <span className="text-red-500 text-xl">*</span>
                    </h1>
                    <input
                      {...register("email", { required: true })}
                      placeholder="Enter your email address"
                      className="input input-bordered w-full"
                    />
                    {errors.email && (
                      <span className="text-red-400 text-xs">
                        This field is required
                      </span>
                    )}
                  </div>
                  <div>
                    <h1 className="text-start text-sm font-medium mb-1">
                      Password <span className="text-red-500 text-xl">*</span>
                    </h1>
                    <input
                      type="password"
                      {...register("password", {
                        required: true,
                      })}
                      placeholder="Enter password"
                      className="input input-bordered w-full"
                    />
                    {errors.password?.type === "required" && (
                      <span className="text-red-400 text-xs ">
                        This field is required
                      </span>
                    )}
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="form-control w-fit">
                      <label className="cursor-pointer label">
                        <input
                          type="checkbox"
                          onChange={() => setDisable(!disable)}
                          className="checkbox checkbox-warning w-5 h-5 border-[#FF4804]"
                        />
                        <span className="label-text text-sm font-medium ml-2">
                          Remember me
                        </span>
                      </label>
                    </div>
                    <div>
                      <h1 className="text-sm font-medium text-[#FF4804] hover:cursor-pointer">
                        Forgot your password ?
                      </h1>
                    </div>
                  </div>
                  <button
                    className="duration-300 hover:rounded-3xl block w-full select-none rounded-lg bg-[#FF4804] py-3 px-6  text-center align-middle text-xl  text-white shadow-md shadow-[#FFA828]/20 transition-all hover:shadow-lg hover:shadow-[#FFA828]/40 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                    type="submit"
                    disabled={disable}
                    data-ripple-light="true">
                    Log In
                  </button>
                </div>
              </form>
              <div>
                <div className="divider text-gray-500">Or login with</div>
                <GoogleSignIn></GoogleSignIn>
                <div className="flex justify-center items-center gap-2">
                  <p className="text-gray-800 font-medium my-4 flex justify-center font-sans text-sm  leading-normal text-inherit antialiased">
                    {"Don't have an account?"}
                  </p>
                  <Link
                    to="/register"
                    className="block font-medium leading-normal text-[#FF4804] antialiased">
                    Register here
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LogIn;
