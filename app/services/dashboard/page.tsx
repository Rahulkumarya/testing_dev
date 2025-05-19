"use client"
import React from 'react'
import ServicesProvided from './components/ambulance/ServicesProvided'
import AllServices from "./components/ambulance/AllServices"
import DoctorAddServiceForm from './components/doctor/AddService'
type Props = {}

const page = (props: Props) => {
  return (
    <div>page
      <ServicesProvided/>
      <AllServices/>
      <br />
      <br />
      <br />
      <DoctorAddServiceForm/>
    </div>
  )
}

export default page