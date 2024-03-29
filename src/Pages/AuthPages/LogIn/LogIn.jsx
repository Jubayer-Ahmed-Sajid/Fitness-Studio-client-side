import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import GoogleSignIn from "../../../Components/GoogleSignIn/GoogleSignIn";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import useAuth from "../../../Hooks/useAuth";
import toast from "react-hot-toast";
import logInImg from '../../../assets/images/LogInRegistration/login.png'
import { FaEye, FaEyeSlash } from "react-icons/fa";

const LogIn = () => {

  const [disable, setDisable] = useState(true);
  const [showPassword, setShowPassword] = useState(false)
  const { loginUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const toastId = toast.loading("Logging...");
    const email = data?.email;
    const password = data?.password;
    loginUser(email, password)
      .then((res) => {
        toast.success("Logged in successfully", { id: toastId });

        navigate('/')
      })
      .catch((error) => {
        console.log(error)
        toast.error(error.code, { id: toastId });
      });
  };

  return (
    <>
      <Helmet>
        <title>Login - Fitness Studio</title>
      </Helmet>
      <div className="flex flex-col lg:flex-row items-center justify-center gap-10 ">
        <div className="hidden lg:block">
          <img
            className=" md:w-[500px] xl:w-[700px]"
            src={logInImg}
            alt=""
          />
        </div>
        <div>
          <div className="w-full md:w-[500px] lg:w-[400px] xl:w-[500px] mb-10 lg:mb-0 px-5 lg:px-5">
            <div className="w-full">
              <div>
                <h1 className="text-start text-4xl font-semibold">
                  Welcome Back !
                </h1>
                <p className="text-start text-sm text-white/80 mt-2">
                  Enter to get unlimited access to data & information.
                </p>
              </div>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col gap-2 mt-5">
                  <div>
                    <h1 className="text-start text-secondary text-sm font-medium mb-1">
                      Email <span className="text-red-500 text-xl">*</span>
                    </h1>
                    <input
                      {...register("email", { required: true })}
                      placeholder="Enter your email address"
                      className="input input-bordered focus:outline-secondary w-full text-black"
                    />
                    {errors.email && (
                      <span className="text-red-500 text-xs">
                        This field is required
                      </span>
                    )}
                  </div>
                  <div>
                    <h1 className="text-start text-secondary text-sm font-medium mb-1">
                      Password <span className="text-red-500 text-xl">*</span>
                    </h1>
                    <div className="flex items-center">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        {...register("password", {
                          required: true,
                        })}
                        placeholder="Enter password"
                        className="relative input input-bordered focus:outline-secondary w-full text-black"
                      />
                      <span className="absolute ml-[330px] text-lg cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
                        {
                          showPassword ? <FaEye title="Hide"></FaEye> : <FaEyeSlash title="Show"></FaEyeSlash>
                        }
                      </span>
                    </div>
                    {errors.password?.type === "required" && (
                      <span className="text-red-500 text-xs ">
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
                          className="checkbox checkbox-info w-5 h-5 border-primary"
                        />
                        <span className="label-text text-sm font-medium ml-2 text-black">
                          Remember me
                        </span>
                      </label>
                    </div>
                    <div>
                      <h1 className="text-sm font-medium text-primary hover:text-secondary hover:cursor-pointer hover:underline">
                        Forgot your password ?
                      </h1>
                    </div>
                  </div>
                  <button
                    className="duration-300 hover:rounded-3xl block w-full select-none rounded-lg bg-primary py-3 px-6  text-center align-middle text-xl  text-white shadow-md shadow-[#FFA828]/20 transition-all hover:shadow-lg hover:shadow-[#FFA828]/40 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
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
                    className="block font-medium leading-normal text-secondary underline antialiased">
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
