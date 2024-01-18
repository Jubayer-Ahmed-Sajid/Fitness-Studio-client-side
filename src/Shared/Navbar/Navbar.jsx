import React from "react";
import {
  Navbar,
  Collapse,
  Typography,
  IconButton,
} from "@material-tailwind/react";
import { PiListBulletsFill } from "react-icons/pi";
import { IoCloseSharp } from "react-icons/io5";
import { NavLink } from "react-router-dom";
import Container from "../../Components/Container/Container";

function NavList() {
  return (
    <ul className="my-2 flex flex-col text-black lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-2">
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-medium">
        {/* <a href="#" className="flex items-center md:text-lg hover:underline transition-colors">
          Home
        </a> */}
        <div className="relative group tracking-[1px] w-fit">
          <p className="absolute -bottom-1 left-0 w-[0%] group-hover:w-[100%] duration-500 border-b-2 border-[#FF4804]"></p>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "text-primary underline underline-offset-8 text-xl font-bold"
                : "text-xl font-bold text-gray-600"
            }>
            Home
          </NavLink>
        </div>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-medium">
        {/* <a href="#" className="flex items-center md:text-lg hover:underline transition-colors">
          About Us
        </a> */}
        <div className="relative group tracking-[1px] w-fit">
          <p className="absolute -bottom-1 left-0 w-[0%] group-hover:w-[100%] duration-500 border-b-2 border-[#FF4804]"></p>
          <NavLink
            to="/about_us"
            className={({ isActive }) =>
              isActive
                ? "text-primary underline underline-offset-8 text-xl font-bold"
                : "text-xl font-bold text-gray-600"
            }>
            About Us
          </NavLink>
        </div>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-medium">
        {/* <a href="#" className="flex items-center md:text-lg hover:underline transition-colors">
          Contact
        </a> */}
        <div className="relative group tracking-[1px] w-fit">
          <p className="absolute -bottom-1 left-0 w-[0%] group-hover:w-[100%] duration-500 border-b-2 border-[#FF4804]"></p>
          <NavLink
            to="/contact_us"
            className={({ isActive }) =>
              isActive
                ? "text-primary underline underline-offset-8 text-xl font-bold"
                : "text-xl font-bold text-gray-600"
            }>
            Contact Us
          </NavLink>
        </div>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-medium">
        {/* <a href="#" className="flex items-center md:text-lg hover:underline transition-colors">
          Login
        </a> */}
        <div className="relative group tracking-[1px] w-fit">
          <p className="absolute -bottom-1 left-0 w-[0%] group-hover:w-[100%] duration-500 border-b-2 border-[#FF4804]"></p>
          <NavLink
            to="/login"
            className={({ isActive }) =>
              isActive
                ? "text-primary underline underline-offset-8 text-xl font-bold"
                : "text-xl font-bold text-gray-600"
            }>
            Login
          </NavLink>
        </div>
      </Typography>
    </ul>
  );
}

export function NavbarSimple() {
  const [openNav, setOpenNav] = React.useState(false);

  const handleWindowResize = () =>
    window.innerWidth >= 960 && setOpenNav(false);

  React.useEffect(() => {
    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  return (
    <Navbar className="rounded-none px-6 py-3 bg-white sticky top-0 z-20 bg-opacity-80 backdrop-blur-2xl backdrop-saturate-200 inset-0">
      <Container>
      <div className="flex lg:items-center justify-between text-blue-gray-900 text-black">
        <Typography
          as="a"
          href="#"
          variant="h6"
          className="mr-4 cursor-pointer py-1.5">
          <h1 className="text-2xl font-bold md:text-4xl md:font-extrabold">
            Fitness
            <span className="text-primary text-3xl md:text-5xl">Studio</span>
          </h1>
        </Typography>
        <div className="hidden lg:block">
          <NavList />
        </div>
        <IconButton
          variant="text"
          className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
          ripple={false}
          onClick={() => setOpenNav(!openNav)}>
          {openNav ? (
            <IoCloseSharp className="h-6 w-8" strokeWidth={2} />
          ) : (
            <PiListBulletsFill className="h-6 w-8" strokeWidth={2} />
          )}
        </IconButton>
      </div>
      </Container>
      <Collapse open={openNav} className="w-fit">
        <NavList />
      </Collapse>
    </Navbar>
  );
}

// export default NavList;
