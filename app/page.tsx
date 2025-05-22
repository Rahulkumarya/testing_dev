"use client"; //use because clients in app folder
import React, { FC, useState } from "react";
import Heading from "./utils/Heading";



interface Props {}

const Page: FC<Props> = (props) => {


  return (
    <div className="">
      <Heading
        // title in header
        title="UronHealth"
        description="Elearning is a platform for students to learn and get help from teachers"
        keywords="Programming ,MERN, Redux,Machine Learning"
      />

    <h1 className="text-black text-center">Home page </h1>
   
    </div>
  );
};

export default Page;
