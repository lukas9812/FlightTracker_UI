
export const UrlStrings = {
    deleteOneFlight: (id: string) => `http://localhost:5288/api/flight-tracker/delete?query=${id}`,
    searchCities : (query: string) => `http://localhost:5288/api/flight-tracker/search?query=${query}`,
    getAllFlights : 'http://localhost:5288/api/flight-tracker/all',
    insertOneFlight : 'http://localhost:5288/api/flight-tracker/insert',
    login : 'http://localhost:5288/api/login'
}


export const deleteFlightById = async (id: string): Promise<any> => {
    try {
        const response = await fetch(UrlStrings.deleteOneFlight(id), {
            // 'no-store' je správně - říkáte "vždy jdi na server"
            cache: 'no-store',
            method: 'DELETE'
        });

        if (!response.ok) {
            // Můžete zkusit vytáhnout zprávu o chybě z JSONu, pokud ji BE posílá
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || `Server error: ${response.status}`);
        }

        // ASP.NET často vrací 204 No Content pro DELETE.
        // V takovém případě nejde zavolat .json(), proto kontrolujeme status:
        if (response.status === 204) {
            return { success: true };
        }

        return await response.json();
    } catch (error) {
        console.error("Delete flight failed:", error);
        return { success: false, error: error instanceof Error ? error.message : "Unknown error" };
    }
};