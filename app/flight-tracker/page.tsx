import NewFlightRecord from "@/app/components/flightForm";
import FlightsTable from "@/app/components/flightsTable";
import {Metadata} from 'next'
import {getFlights} from "@/app/services/flightService";
import {cookies} from "next/headers";
import {redirect} from "next/navigation";
import LogoutButton from "@/app/components/logoutButton";


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
        <div className="flex flex-col min-h-screen w-full items-center pt-20 p-4 gap-20">
            <div className="fixed top-5 right-5 z-50 animate-in fade-in slide-in-from-right-5">
                <LogoutButton />
            </div>
            <h1 className="text-4xl font-extrabold leading-tight">
                <span className="bg-linear-to-r from-blue-600 via-purple-500 to-red-500 bg-clip-text text-transparent">
                    Track your flights
                </span>
            </h1>
            <NewFlightRecord/>
            <FlightsTable flightRecords={flights}/>
        </div>
    );
}