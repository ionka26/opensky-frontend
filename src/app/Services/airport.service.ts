import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Airport } from 'src/app/Modules/airport';
import { Flight } from 'src/app/Modules/flight';
import { global } from 'src/app/Services/global';

@Injectable()
export class AirportSevice{
    public url: string;
    
    constructor(
        public _http: HttpClient
    ){
        this.url = global.url; //asigno al atributo url, la url de la Api que están en global.ts
    }

    test(){
        return "Hola aeropuertos!";
    }

    //Este método devuelve todos los aeropuertos (o la mayoría). Para ello llamamos a la API del back-end para recbir un JSON con todos los datos.
    
    allAirports(): Observable<any>{       
        return this._http.get(this.url+'/airports'); //Devolvemos el json de la API que devuelve todos los aeropuertos del back-end
    }
    
    //Este método devuelve todos los vuelos entre dos fechas timestamp. Para ello llamamos a la API del back-end para recbir un JSON con todos los datos.
    //Le pasamos el aeropuerto, la fecha de inicio y la fecha de fin
    //La API recibie los parámetro por GET en ruta. P.E. http://localhost/opensky/public/flights/EDDF/1517227200/1517230800    
    
    findFlights(airport:string,begin:number,finish:number): Observable<any>{      
        return this._http.get(this.url+'/flights'+'/'+airport+'/'+begin+'/'+finish);
    }


}
