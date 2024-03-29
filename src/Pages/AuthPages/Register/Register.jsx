import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import GoogleSignIn from "../../../Components/GoogleSignIn/GoogleSignIn";
import { FaCloudUploadAlt, FaEye, FaEyeSlash } from "react-icons/fa";
import { Helmet } from "react-helmet-async";
import useAuth from "../../../Hooks/useAuth";
import { updateProfile } from "@firebase/auth";
import auth from "../../../firebase/firebase.config";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import axios from "axios";
import toast from "react-hot-toast";
import registerImg from '../../../assets/images/LogInRegistration/register.png'
import { useState } from "react";

const Register = () => {

  const { createUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation()
  const [showPassword, setShowPassword] = useState(false)
  const axiosPublic = useAxiosPublic();
  const imgHostingKey = import.meta.env.VITE_IMG_HOSTING_KEY;
  const imgHostingApi = `https://api.imgbb.com/1/upload?key=${imgHostingKey}`;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const toastId = toast.loading("Registering...");
    const image = { image: data?.image[0] };

    const res = await axios.post(imgHostingApi, image, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    const imgurl = res?.data?.data?.display_url;
    const name = data?.name;
    const email = data?.email;
    const password = data?.password;
    createUser(email, password)
      .then((res) => {
        updateProfile(auth.currentUser, {
          displayName: name,
          photoURL: imgurl,
        })
          .then(() => {
            const userInfo = {
              name: data.name,
              email: data.email,
              image: imgurl
            };
            axiosPublic.post("/users", userInfo).then((res) => {
              if (res.data.insertedId) {
                console.log(res?.data?.insertedId);
              }
            });
            toast.success("Register Successfully !", { id: toastId });

            navigate(location?.state ? location?.state : '/')
          })
          .catch((err) => {
            toast.error(err?.code, { id: toastId });
          });
      })
      .catch((err) => {
        toast.error(err?.message, { id: toastId });
      });
  };

  return (
    <>
      <Helmet>
        <title>Register - Fitness Studio</title>
      </Helmet>
      <div className="flex flex-col lg:flex-row items-center justify-center gap-10">
        <div>
          <div className="w-full md:w-[500px] lg:w-[400px] xl:w-[500px] mb-10 lg:mb-0 px-5 lg:px-5">
            <div className="w-full">
              <div>
                <h1 className="text-start text-4xl font-semibold">
                  Create Account !
                </h1>
                <p className="text-start text-sm text-white/80 mt-2">
                  Enter to get unlimited access to data & information.
                </p>
              </div>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col gap-2 mt-5">
                  <div>
                    <h1 className="text-start text-secondary text-sm font-medium mb-1">
                      Name <span className="text-red-500 text-xl">*</span>
                    </h1>
                    <input
                      type="text"
                      {...register("name", { required: true })}
                      placeholder="Enter your name"
                      className="input input-bordered focus:outline-secondary w-full"
                    />
                    {errors.name && (
                      <span className="text-red-500 text-xs">
                        This field is required
                      </span>
                    )}
                  </div>
                  <div>
                    <h1 className="text-start text-sm text-secondary font-medium mb-1">
                      Email <span className="text-red-500 text-xl">*</span>
                    </h1>
                    <input
                      type="email"
                      {...register("email", {
                        required: true,
                      })}
                      placeholder="Enter your email address"
                      className="input input-bordered focus:outline-secondary w-full"
                    />
                    {errors.email?.type === "required" && (
                      <span className="text-red-500 text-xs ">
                        This field is required
                      </span>
                    )}
                  </div>
                  <div>
                    <h1 className="text-start text-sm text-secondary font-medium mb-1">
                      Password <span className="text-red-500 text-xl">*</span>
                    </h1>
                    <div className="flex items-center">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        {...register("password", {
                          required: true,
                        })}
                        placeholder="Enter your password"
                        className="input input-bordered focus:outline-secondary w-full"
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
                  <div className="relative group border-2 border-dashed rounded-lg py-2 my-2">
                    <div className="flex items-center justify-center gap-5 absolute left-28  group-hover:cursor-pointer">
                      <FaCloudUploadAlt className="text-2xl text-secondary"></FaCloudUploadAlt>
                      <h1 className="text-lg font-medium">Upload Photo</h1>
                    </div>
                    <input
                      type="file"
                      {...register("image", { required: true })}
                      className="w-full opacity-0  group-hover:cursor-pointer"
                    />
                  </div>
                  {errors.image?.type === "required" && (
                    <span className="text-red-500 text-xs ">
                      This field is required
                    </span>
                  )}
                  <button
                    className="duration-300 hover:rounded-3xl block w-full select-none rounded-lg bg-primary py-3 px-6  text-center align-middle text-xl  text-white shadow-md shadow-[#FFA828]/20 transition-all hover:shadow-lg hover:shadow-[#FFA828]/40 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                    type="submit"
                    data-ripple-light="true">
                    Register
                  </button>
                </div>
              </form>
              <div>
                <div className="divider text-gray-500">Or login with</div>
                <GoogleSignIn></GoogleSignIn>
                <div className="flex justify-center items-center gap-2">
                  <p className="text-gray-800 font-medium my-4 flex justify-center font-sans text-sm  leading-normal text-inherit antialiased">
                    Already have an account go?
                  </p>
                  <Link
                    to="/login"
                    className="block font-medium leading-normal text-secondary underline antialiased">
                    Login
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="hidden md:block">
          <img
            className="md:w-[500px] xl:w-[700px]"
            src={registerImg}
            alt=""
          />
        </div>
      </div>
    </>
  );
};

export default Register;
