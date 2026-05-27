"use client";
import Loading from '@/app/(authenticated)/loading'
import { saveCredentials } from '@/lib/calendarService';
import { useSearchParams, useRouter } from 'next/navigation';
import React, { startTransition, useEffect } from 'react'
import { toast } from "sonner"

const Page = () => {
    const router = useRouter()
    const searchParams  = useSearchParams()
    // console.log("Search params:", searchParams.toString());
    useEffect(() => {
        startTransition(async () => {
            try{
            const response = await saveCredentials(searchParams.toString());
            if (response.success) {
                toast.success("Calendar connected successfully!")
                router.push("/reminders")
            }else{
                toast.error("Failed to connect calendar. Please try again.")
            }
        }catch(error){
            console.error("Error saving calendar credentials:", error);
            toast.error("Failed to connect calendar. Please try again.")
        }
    })
        
    }, [searchParams])
  return <Loading />
}

export default Page