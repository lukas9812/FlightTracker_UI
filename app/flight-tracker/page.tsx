import NewFlightRecord from "@/app/components/flightForm";
import FlightsTable from "@/app/components/flightsTable";
import {Metadata} from 'next'
import {getFlights} from "@/app/services/flightService";
import {cookies} from "next/headers";
import {redirect} from "next/navigation";
import React from "react";
import DropDownMenu from "@/app/components/dropdownMenu";

export const metadata: Metadata = {
    title: 'Flight Tracker',
    description: 'Flight record evidence',
}

export default async function RootLayout() {

    const cookieStore = await cookies()
    const token = cookieStore.get('AuthToken')

    if (!token) {
        redirect('/login')
    }
    const flights = await getFlights();

    return (
        <div>
            <div className="fixed top-5 right-5 z-50 animate-in fade-in">
                <DropDownMenu></DropDownMenu>
            </div>
            <h1 className="mt-8 ml-6 lg:ml-0 text-start text-2xl lg:text-4xl font-extrabold leading-tight lg:text-center">
            <span className="bg-linear-to-r from-blue-600 via-purple-500 to-red-500 bg-clip-text text-transparent">
                Track your flights ..
            </span>
            </h1>

            <div className="mt-5">
                <NewFlightRecord/>
            </div>

            <div className="p-12">
                <FlightsTable flightRecords={flights} />
            </div>
        </div>

        // <div className="relative min-h-screen">
        //     <Image
        //         src="/main-page-bg.jpg"
        //         alt="Pozadí Airbus A380"
        //         fill
        //         unoptimized={true}
        //         priority
        //     />
        //     <div className="relative z-10 flex flex-col items-stretch gap-20 w-full">
        //         <div className="fixed top-5 right-5 z-50 animate-in fade-in slide-in-from-right-5">
        //             <LogoutButton/>
        //         </div>
        //         <h1 className="pt-10 text-4xl font-extrabold leading-tight text-center">
        //         <span className="pt-10 bg-linear-to-r from-blue-600 via-purple-500 to-red-500 bg-clip-text text-transparent">
        //             Track your flights ..
        //         </span>
        //         </h1>
        //         <NewFlightRecord/>
        //         <FlightsTable flightRecords={flights}/>
        //     </div>
        // </div>
    );
}