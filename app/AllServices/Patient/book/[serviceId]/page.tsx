"use client"
import React from 'react'
import { useParams } from 'next/navigation'
import { useGetDoctorServiceByIdQuery } from '@/redux/features/services/dprofile/ServiceApi'
interface Props {
    
}

const page = (props: Props) => {
    return (
        <div className='max-w-3xl mx-auto p-6 space-y-6 container'>
            <h1 className='text-3xl font-bold'>Booking Page</h1>
            Booking page for service
            <p>Service ID:</p>
        </div>
    )
}

export default page
