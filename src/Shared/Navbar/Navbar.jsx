import { useEffect, useState } from "react";
import {
  Navbar,
  Collapse,
  Typography,
  IconButton,
} from "@material-tailwind/react";
import { PiListBulletsFill } from "react-icons/pi";
import { IoCloseSharp } from "react-icons/io5";
import { Link, NavLink } from "react-router-dom";
import NavProfile from "./NavProfile";
import useAuth from "../../Hooks/useAuth";
import { CgGym } from "react-icons/cg";
import { NotificationsMenu } from "./Notification";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { socket } from "../../socketIo/socket";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleUser } from "../../Redux/SingleUserSlice/singleUserSlice";

function NavList({ navbarColor }) {
  const { user } = useAuth()
  return (
    <ul className={`my-2 flex flex-col  lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-1 ${!navbarColor ? 'text-black' : 'text-white'}`}>
      <Typography
        as="li"
        variant="small"

        className="p-1 font-medium">
        {/* <a href="#" className="flex items-center md:text-lg hover:underline transition-colors">
          Home
        </a> */}
        <div className="relative group tracking-[1px] w-fit">
          <p className="absolute -bottom-1 left-0 w-[0%] group-hover:w-[100%] duration-500 border-b-2 border-secondary text-sm"></p>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "text-secondary   underline underline-offset-8 text-sm font-bold"
                : "text-sm font-bold    "
            }>
            Home
          </NavLink>
        </div>
      </Typography>
      <Typography
        as="li"
        variant="small"

        className="p-1 font-medium">
        <div className="relative group tracking-[1px] w-fit">
          <p className="absolute -bottom-1 left-0 w-[0%] group-hover:w-[100%] duration-500 border-b-2 border-secondary"></p>
          <NavLink
            to="/blogs"
            className={({ isActive }) =>
              isActive
                ? "text-secondary   underline underline-offset-8 text-sm  font-bold"
                : "text-sm font-bold    "
            }>
            Blogs
          </NavLink>
        </div>
      </Typography>
      <Typography
        as="li"
        variant="small"

        className="p-1 font-medium">
        <div className="relative group tracking-[1px] w-fit">
          <p className="absolute -bottom-1 left-0 w-[0%] group-hover:w-[100%] duration-500 border-b-2 border-secondary"></p>
          <NavLink
            to="/library"
            className={({ isActive }) =>
              isActive
                ? "text-secondary   underline underline-offset-8 text-sm font-bold"
                : "text-sm  font-bold    "
            }>
            Library
          </NavLink>
        </div>
      </Typography>
      <Typography
        as="li"
        variant="small"

        className="p-1 font-medium">
        <div className="relative group tracking-[1px] w-fit">
          <p className="absolute -bottom-1 left-0 w-[0%] group-hover:w-[100%] duration-500 border-b-2 border-secondary"></p>
          <NavLink
            to="/specialRecipe"
            className={({ isActive }) =>
              isActive
                ? "text-secondary   underline underline-offset-8 text-sm  font-bold"
                : "text-sm font-bold    "
            }>
            Special Recipes
          </NavLink>
        </div>
      </Typography>
      <Typography
        as="li"
        variant="small"

        className="p-1 font-medium">
        <div className="relative group tracking-[1px] w-fit">
          <p className="absolute -bottom-1 left-0 w-[0%] group-hover:w-[100%] duration-500 border-b-2 border-secondary"></p>
          <NavLink
            to="/shop"
            className={({ isActive }) =>
              isActive
                ? "text-secondary   underline underline-offset-8 text-sm  font-bold"
                : "text-sm font-bold    "
            }>
            Shop
          </NavLink>
        </div>
      </Typography>
      <Typography
        as="li"
        variant="small"

        className="p-1 font-medium">
        <div className="relative group tracking-[1px] w-fit">
          <p className="absolute -bottom-1 left-0 w-[0%] group-hover:w-[100%] duration-500 border-b-2 border-secondary"></p>
          <NavLink
            to="/Donate"
            className={({ isActive }) =>
              isActive
                ? "text-secondary   underline underline-offset-8 text-sm  font-bold"
                : "text-sm font-bold    "
            }>
            Donate
          </NavLink>
        </div>
      </Typography>
      <Typography
        as="li"
        variant="small"

        className="p-1 font-medium">
        <div className="relative group tracking-[1px] w-fit">
          <p className="absolute -bottom-1 left-0 w-[0%] group-hover:w-[100%] duration-500 border-b-2 border-secondary"></p>
          <NavLink
            to="/all_events"
            className={({ isActive }) =>
              isActive
                ? "text-secondary   underline underline-offset-8 text-sm  font-bold"
                : "text-sm font-bold    "
            }>
            Events
          </NavLink>
        </div>
      </Typography>
      <Typography
        as="li"
        variant="small"

        className="p-1 font-medium">
        {/* <a href="#" className="flex items-center md:text-lg hover:underline transition-colors">
          About Us
        </a> */}
        <div className="relative group tracking-[1px] w-fit">
          <p className="absolute -bottom-1 left-0 w-[0%] group-hover:w-[100%] duration-500 border-b-2 border-secondary"></p>
          <NavLink
            to="/about_us"
            className={({ isActive }) =>
              isActive
                ? "text-secondary   underline underline-offset-8 text-sm  font-bold"
                : "text-sm font-bold    "
            }>
            About Us
          </NavLink>
        </div>
      </Typography>
      <Typography
        as="li"
        variant="small"

        className="p-1 font-medium">
        {/* <a href="#" className="flex items-center md:text-lg hover:underline transition-colors">
          Contact
        </a> */}
        <div className="relative group tracking-[1px] w-fit">
          <p className="absolute -bottom-1 left-0 w-[0%] group-hover:w-[100%] duration-500 border-b-2 border-secondary"></p>
          <NavLink
            to="/contact_us"
            className={({ isActive }) =>
              isActive
                ? "text-secondary   underline underline-offset-8 text-  font-bold"
                : "text-sm font-bold    "
            }>
            Contact Us
          </NavLink>
        </div>
      </Typography>
      <Typography
        as="li"
        variant="small"

        className="p-1 font-medium">
        {/* <a href="#" className="flex items-center md:text-lg hover:underline transition-colors">
          Login
        </a> */}
        {!user && <div className="relative group tracking-[1px] w-fit">
          <p className="absolute -bottom-1 left-0 w-[0%] group-hover:w-[100%] duration-500 border-b-2 border-secondary"></p>
          <NavLink
            to="/login"
            className={({ isActive }) =>
              isActive
                ? "text-secondary   underline underline-offset-8 text-sm  font-bold"
                : "text-sm font-bold text-gray-00"
            }>
            Login
          </NavLink>
        </div>}
      </Typography>
    </ul>
  );
}

export function NavbarSimple({ navbarColor }) {
  const [openNav, setOpenNav] = useState(false);
  const { user } = useAuth()
  const axiosPublic = useAxiosPublic()
  const [notificationDetails, setNotificationDetails] = useState([])
  const dispatch = useDispatch()

  const { user: userDetails } = useSelector(state => state.user)
  useEffect(() => {
    if (user?.email) {
      dispatch(fetchSingleUser(user?.email))
    }
  }, [dispatch, user])

  const handleWindowResize = () =>
    window.innerWidth >= 960 && setOpenNav(false);

  useEffect(() => {
    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  useEffect(() => {



    axiosPublic.get('/notifications')
      .then(res => {
        setNotificationDetails(res?.data)

      })

  }, [axiosPublic])

  useEffect(() => {
    socket.on('notifications', () => {
      ('New notification received!');
      const fetchNotifications = async () => {
        axiosPublic.get('/notifications')
          .then(res => {
            setNotificationDetails(res?.data)
          })
      };
      fetchNotifications();
    });

  }, [axiosPublic])

  return (
    <Navbar className={`mx-auto min-w-[100vw] rounded-none px-4 sm:px-6 lg:px-3 xl:px-6 py-3 sticky top-0 z-20 bg-opacity-80 backdrop-blur-2xl border-none  backdrop-saturate-200 inset-0 ${!navbarColor ? 'bg-white' : 'bg-black'} transition-all duration-500`}>

      <div className="lg:container mx-auto flex items-center justify-between text-black">
        <Typography
          as="a"
          href="#"
          variant="h6"
          className="mr-4 cursor-pointer py-1.5   ">
          <Link to={'/'} className="scroll-smooth">
            <h1 className={`flex items-center text-xl xs:text-2xl  font-bold md:text-4xl md:font-extrabold  ${navbarColor ? 'text-white' : 'text-black'}`}>
              <CgGym className="text-secondary   mr-1 text-3xl md:text-5xl" />Fitness
              <span className="text-secondary   text-2xl xs:text-3xl md:text-3xl">Studio</span>
            </h1>
          </Link>
        </Typography>
        <div className="flex flex-row-reverse lg:flex-row gap-4 items-center">
          <div className="hidden lg:block">
            <NavList navbarColor={navbarColor} />
          </div>
          <IconButton
            variant="text"
            className={`ml-auto h-6 w-6 hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden ${navbarColor ? 'text-white' : 'text-black'}`}
            ripple={false}
            onClick={() => setOpenNav(!openNav)}>
            {openNav ? (
              <IoCloseSharp className="h-6 w-8" strokeWidth={2} />
            ) : (
              <PiListBulletsFill className="h-6 w-8" strokeWidth={2} />
            )}
          </IconButton>

          <span className="flex  items-center gap-2   ">

            {/* Bell icon with notification button */}
            {user && <NotificationsMenu notificationDetails={notificationDetails} navbarColor={navbarColor} />}

            {/* User Profile component */}
            <span className="">
              {user && <NavProfile navbarColor={navbarColor} />}
            </span>
          </span>


        </div>
      </div>

      <Collapse onClick={() => setOpenNav(!openNav)} open={openNav} className="w-fit">
        <NavList navbarColor={navbarColor} />
      </Collapse>
    </Navbar>
  );
}

// export default NavList;
