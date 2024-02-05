import { NavLink, useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import toast from "react-hot-toast";
import { AiFillClockCircle } from "react-icons/ai";
import { BiSolidMessageSquareAdd } from "react-icons/bi";
import { CgGym } from "react-icons/cg";
import { FaHome, FaPhoneAlt, FaUserAlt, FaUsers } from "react-icons/fa";
import { FaBookAtlas, FaBookMedical, FaCalculator } from "react-icons/fa6";
import { GiProgression } from "react-icons/gi";
import { PiSignOutBold } from "react-icons/pi";
import { FaPenNib } from "react-icons/fa";
import "./Sidebar.css"

const Sidebar = () => {
  const navigate = useNavigate();
  const { logOut } = useAuth();

  // logOut function
  const handleLogout = () => {
    logOut()
      .then(() => {
        navigate("/");
        toast.success("Logged out successfully");
      })
      .catch((err) => toast.error(err));
  };

  return (
    <div className="scroolBar w-60 max-h-screen bg-gradient-to-r from-secondary to-primary hidden md:block sticky top-0 overflow-y-auto scroll-smooth" style={{ scrollbarWidth: 'thin', scrollbarColor: '#888 #f1f1f1' }}>
      {/* Sidebar logo or Title */}
      <div className="p-4">
        <h1 className="flex text-2xl gap-1 font-bold bg-primary shadow-lg shadow-gray-500 p-1 rounded-md">
          <CgGym className="text-3xl" /> Fitness
          <span className="text-white">Studio</span>
        </h1>
      </div>
      {/* sidebar content here */}
      <ul className="menu p-4 font-semibold text-base">
        <li>
          <NavLink
            to="/dashboard/profile"
            className={({ isActive, isPending }) =>
              isPending ? "pending" : isActive ? "bg-primary text-white" : ""
            }>
            <FaUserAlt /> My Profile
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/dashboard/bmi_calculator"
            className={({ isActive, isPending }) =>
              isPending ? "pending" : isActive ? "bg-primary text-white" : ""
            }>
            <FaCalculator /> BMI Calculator
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/dashboard/connect_app"
            className={({ isActive, isPending }) =>
              isPending ? "pending" : isActive ? "bg-primary text-white" : ""
            }>
            <BiSolidMessageSquareAdd /> Connected app
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/dashboard/set_goal"
            className={({ isActive, isPending }) =>
              isPending ? "pending" : isActive ? "bg-primary text-white" : ""
            }>
            <AiFillClockCircle /> Set goals
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/dashboard/tracking_progress"
            className={({ isActive, isPending }) =>
              isPending ? "pending" : isActive ? "bg-primary text-white" : ""
            }>
            <GiProgression /> Tracking Progress
          </NavLink>
        </li>
        <li>
          <NavLink to="/dashboard/BlogFrom"
            className={({ isActive, isPending }) =>
              isPending ? "pending" : isActive ? "bg-primary text-white" : ""
            }
          >
            <FaPenNib /> Write a Blog
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/dashboard/my_blogs"
            className={({ isActive, isPending }) =>
              isPending ? "pending" : isActive ? "bg-primary text-white" : ""
            }>
            <FaBookMedical /> My Blogs
          </NavLink>
        </li>
        <div className="divider"></div>

        {/* main layout navlink */}
        <li>
          <NavLink to="/">
            <FaHome /> Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/about_us">
            <FaUsers /> About Us
          </NavLink>
        </li>
        <li>
          <NavLink to="/blogs">
            <FaBookAtlas /> Blogs
          </NavLink>
        </li>
        <li>
          <NavLink to="/contact_us">
            <FaPhoneAlt /> Contact Us
          </NavLink>
        </li>
        <li>
          <button
            onClick={handleLogout}
            className="py-2 px-4 text-white border-b">
            <PiSignOutBold /> Log Out
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
