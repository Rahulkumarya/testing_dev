"use client"
import React, {useEffect} from 'react'
import {useRouter} from "next/navigation"
import {useSelector} from "react-redux"
import ServicesProvided from './components/ambulance/ServicesProvided'
// import AllServices from "./components/ambulance/AllServices"
import DoctorAddServiceForm from './components/doctor/AddService'
type Props = {}

const page = (props: Props) => {
  const router = useRouter();
  const user = useSelector((state: store) => state.auth.user);

  useEffect(() => {
    if (!user?._id) {
      // Not logged in, redirect to login page
      router.push("/login");
    }
  }, [user, router]);

  // Optionally show a loader while checking auth
  if (!user?._id) return <div>Redirecting to login...</div>;
  return (
    <div>
      <ServicesProvided/>
    
      <br />
      <br />
      <br />
      <DoctorAddServiceForm/>
    </div>
  )
}

export default page