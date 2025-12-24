import NewFlightRecord from "@/app/components/flightForm";
import FlightsTable from "@/app/components/flightsTable";
import {Metadata} from 'next'
import {getFlights} from "@/app/services/flightService";
import {cookies} from "next/headers";
import {redirect} from "next/navigation";
import LogoutButton from "@/app/components/logoutButton";
import Image from "next/image";
import React from "react";


export const metadata: Metadata = {
    title: 'Flight Tracker',
    description: 'Flight record evidence',
}

export default async function RootLayout() {

    const cookieStore = await cookies()
    const token = cookieStore.get('X-Access-Token')

    if (!token) {
        redirect('/login')
    }
    const flights = await getFlights();

    return (
        <div className="relative min-h-screen">
            <Image
                src="/dark-2.jpg"
                alt="Pozadí Airbus A380"
                fill
                unoptimized={true}
                priority
            />
            <div className="relative z-10 flex flex-col items-center gap-20 w-full">
                <div className="fixed top-5 right-5 z-50 animate-in fade-in slide-in-from-right-5">
                    <LogoutButton/>
                </div>
                <h1 className="pt-10 text-4xl font-extrabold leading-tight">
                <span className="pt-10 bg-linear-to-r from-blue-600 via-purple-500 to-red-500 bg-clip-text text-transparent">
                    Track your flights
                </span>
                </h1>
                <NewFlightRecord/>
                <FlightsTable flightRecords={flights}/>
            </div>
        </div>
    );
}