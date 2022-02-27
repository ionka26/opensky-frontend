export class Flight{
    constructor(
        public id:string,
        public icao24:string,
        public firstSeen:string,	
        public estDepartureAirport:string,
        public lastSeen:string,
        public estArrivalAirport:string,
        public callsign	:string,
        public estDepartureAirportHorizDistance:string,
        public estDepartureAirportVertDistance:string,
        public estArrivalAirportHorizDistance:string,
        public estArrivalAirportVertDistance:string,
        public departureAirportCandidatesCount:string,
        public arrivalAirportCandidatesCount:string
    ){}
}