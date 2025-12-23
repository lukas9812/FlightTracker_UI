import NewFlightRecord from "@/app/components/flightForm";
import FlightsTable from "@/app/components/flightsTable";
import {Metadata} from 'next'
import {getFlights} from "@/app/services/flightService";

export const metadata: Metadata = {
    title: 'Flight Tracker',
    description: 'Flight record evidence',
}

export default async function RootLayout() {

    const flights = await getFlights();

    return (
        <div className="flex flex-col min-h-screen w-full items-center pt-20 p-4 gap-20">
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