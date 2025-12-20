import NewFlightRecord from "@/app/components/flightForm";
import FlightsTable from "@/app/components/flightsTable";
import {Space_Grotesk} from 'next/font/google';
import {Metadata} from 'next'
import {getFlights} from "@/app/services/flightService";
import {useFlightStore} from "@/app/models/store";

export const metadata: Metadata = {
    title: 'Flight Tracker',
    description: 'Flight record evidence',
}
const spaceGroteskLight = Space_Grotesk({
    weight: ['500'],
    subsets: ['latin'],
    display: 'swap',
});

export default async function FlightTrackerPage() {
    const flights = await getFlights();

    return (
        <main className={spaceGroteskLight.className}>
                <div className="flex flex-col min-h-screen w-full items-center pt-20 bg-gray-300 p-4 gap-20">
                    <h1 className="text-4xl font-extrabold leading-tight">
                        {/*<span className="bg-linear-to-r from-blue-600 via-purple-500 to-red-500 bg-clip-text text-transparent">*/}
                        {/*    Track your flights*/}
                        {/*</span>*/}
                        <span className="text-black">Track your flights..</span>
                    </h1>
                    <NewFlightRecord/>
                    <FlightsTable flightRecords={flights}/>
                </div>
        </main>
    );
}