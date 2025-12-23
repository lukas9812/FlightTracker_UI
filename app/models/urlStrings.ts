
export const UrlStrings = {
    deleteOneFlight: (id: string) => `http://localhost:5288/api/flight-tracker/delete?query=${id}`,
    searchCities : (query: string) => `http://localhost:5288/api/flight-tracker/search?query=${query}`,
    getAllFlights : 'http://localhost:5288/api/flight-tracker/all',
    insertOneFlight : 'http://localhost:5288/api/flight-tracker/insert',
    register: 'http://localhost:5288/api/register',
    login : 'http://localhost:5288/api/login',
    logout : 'http://localhost:5288/api/logout',
}