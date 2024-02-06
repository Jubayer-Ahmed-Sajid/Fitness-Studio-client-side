// import React from 'react';

import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../MainLayout/MainLayout";
import LogIn from "../Pages/AuthPages/LogIn/LogIn";
import Register from "../Pages/AuthPages/Register/Register";
import Home from "../Pages/Home/Home";
import Error from "../Pages/Error/Error";
import AboutUs from "../Pages/AboutUs/AboutUs";
import Dashboard from "../Pages/Dashboard/Dashboard";
import ConnectApp from "../Pages/ConnectApp/ConnectApp";
import Profile from "../Components/Profile/Profile";
import TrackProgress from "../Pages/TrackProgress/TrackProgress";
import BmiCalculator from "../Pages/BMI_Calculator/BmiCalculator";
import SetGoal from "../Pages/Set_Goal/SetGoal";
import CreateGoal from "../Pages/Set_Goal/CreateGoal";
import ContactUs from "../Pages/ContactUs/ContactUs";
import Blogpage from "../Pages/BlogPage/Blogpage";
import PrivateRoute from "./PrivateRoute";
import DynamicBlogpage from "../Pages/DynamicBlogpage/DynamicBlogpage";
import UploadBlogs from "../Pages/UploadBlogs/UploadBlogs";
import FitbitTerms from "../Components/Terms & Conditions/FitbitTerms";
import MyBlogs from "../Components/MyBlogs/MyBlogs";
import StravaCondition from "../Pages/ConnectApp/Strava/StravaCondition";
import UsersBlog from "../Pages/UsersBlog/UsersBlog";
import DynamicBlogpage2 from "../Pages/DynamicBlogpage/DynamicBlogpage2";
import StravaActivities from "../Components/StravaActivities/StravaActivities";
import CompareActivity from "../Components/StravaActivities/CompareActivity";

const MyRouts = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement: <Error></Error>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/about_us",
        element: <AboutUs></AboutUs>,
      },
      {
        path: "/blogs",
        element: <Blogpage />,
      },
      {
        path: "/blogs/:id",
        element: <DynamicBlogpage />,
      },
      {
        path: "/blogs/:email",
        element: <UsersBlog />,
      },
      {
        path: "/blogs/:id/:email",
        element: <UsersBlog />,
      },
      {
        path: "/blogs/:id/:email/:newId",
        element: <DynamicBlogpage2 />,
      },
      {
        path: "/services",
        element: <div>This is Services</div>,
      },

      {
        path: "/contact_us",
        element: <PrivateRoute><ContactUs></ContactUs></PrivateRoute>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/login",
        element: <LogIn></LogIn>,
      },
      {
        path: '/permission',
        element: <FitbitTerms></FitbitTerms>
      }
    ],
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    children: [
      {
        path: "profile",
        element: <PrivateRoute><Profile></Profile></PrivateRoute>,
      },
      {
        path: "bmi_calculator",
        element: <PrivateRoute><BmiCalculator /></PrivateRoute>,
      },
      {
        path: "BlogFrom",
        element: <UploadBlogs />,
      },
      {
        path: "set_goal",
        element: <PrivateRoute><SetGoal></SetGoal></PrivateRoute>,
      },
      {
        path: "tracking_progress",
        element: <PrivateRoute><TrackProgress /></PrivateRoute>,
      },
      {
        path: "connect_app",
        element: <PrivateRoute><ConnectApp></ConnectApp></PrivateRoute>
      },
      {
        path: "strava_connect",
        element: <StravaCondition></StravaCondition>
      },
      {
        path: "strava_activities",
        element: <StravaActivities></StravaActivities>
      },
      {
        path: "/dashboard/compare_activity/:id1/:id2",
        element: <CompareActivity></CompareActivity>
      },
      {
        path: "set_goal/create_goal",
        element: <PrivateRoute><CreateGoal></CreateGoal></PrivateRoute>,
      },
      {
        path: "my_blogs",
        element: <PrivateRoute><MyBlogs /></PrivateRoute>,
      },
    ],
  },
]);

export default MyRouts;
