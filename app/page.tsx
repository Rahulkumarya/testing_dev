"use client"; //use because clients in app folder
import React from "react";
import Heading from "./utils/Heading";
import SignUp from "./services/complete_profile/component/Test";
import HomePage from "./service/home/Hero";
import Footer from "./service/home/Footer";




const Page = () => {


  return (
    <div className="">
      <Heading
        // title in header
        title="UronHealth"
        description="Elearning is a platform for students to learn and get help from teachers"
        keywords="Programming ,MERN, Redux,Machine Learning"
      />
 <HomePage/>
   


   



   <Footer/>

   
    </div>
  );
};

export default Page;
