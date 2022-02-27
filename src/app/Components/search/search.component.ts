import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router'; //Esto lo necesito para redirigir a los resultados de la búsqueda
import { Airport } from 'src/app/Modules/airport';
import { AirportSevice } from 'src/app/Services/airport.service';
import { of } from 'rxjs';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  providers: [AirportSevice]
})
export class SearchComponent implements OnInit {
  public airports: Array<Airport>; //Array que contendrá los areopuertos
  public current_year: number; //Fecha actual año y mes
  public current_month: number;
  public error:string;
  

  constructor(
    //Necesito una variable para acceder al sevicio
    private _airportService: AirportSevice,
    private _router: Router,                  //Creo los objetos de routing
    private _route: ActivatedRoute
  ) { 
    this.airports=[];
    this.getAirports(); // Llamo a la API para reccoger los aeropuertos y mostrarlos
    
    // Año y mes para los datepickers
    this.current_year = new Date().getFullYear();
    this.current_month = new Date().getMonth()+1;

    //Error
    this.error="";
  }

  ngOnInit(): void {
    console.log("Coponente seach lanzado");
  }
  
  onSubmit(data:any){
    //Si pulsan submit tenemos que hacer la consulta de vuelos
    let airport = data['airport'];
    //Vamos a convertir el datepicker en un timestamp. Obetemos la fecha del array year-month-day y lo convertimos a tiempo y dividimos entre 1000 porque lo queremos en segundos (no en ms).
   
    let begin = new Date(data['begin']['year']+"-"+data['begin']['month']+"-"+data['begin']['day']).getTime()/1000;
    let finish = new Date(data['finish']['year']+"-"+data['finish']['month']+"-"+data['finish']['day']).getTime()/1000;
    console.log(begin);
    console.log(finish);
    
    //Comprobamos errores
    //Se debe haber seleccionado un aeropuerto. Un aeropuerto tiene 4 caracteres
    this.error="";
    let errores="";
    if(airport.length!=4){
      errores = "You must select an airport.\n"
    }
    //Si no se ha seleccionado fecha  
    if(isNaN(begin) ||isNaN(finish)){
      errores+= "You must select a start date and a end date.\n"
    }

    //Las fechas de inicio y fin deben ser menos de 7 (604800 segundos).  
    if(finish-begin > 604800){
      errores+= "The date range must be less than 7 days.\n"
    }
    
    //Las fechas de inicio debe ser menor que la fecha de fin.  
    if(finish-begin < 0){
      errores+= "The end date must be greater than the start date."
    }
    
    console.log(errores);
    //Ya tengo todos los datos correctos, ahora solo tengo que ir a la página de resultados que es una ruta con parámetros enrutados.  
    if(errores == ""){
      this._router.navigate(['results/'+airport+'/'+begin+'/'+finish]); 
    }
    else{
      this.error=errores; //Actualizo el atributo error para actualizar la vista
    }
  }

  getAirports(){
    //En cuanto se construya el fomulario tenemos que llamar a la API para que nos devuleva todos los aeropuertos
    //y poderlos incluir en el dropdown.
    
    this._airportService.allAirports().subscribe({
      next: (v) => {       
        this.airports = v;    // Asigno los aeropertos al array   
        this.airports.sort((a,b) => a.name.localeCompare(b.name)); //Ordeno el array alfabéticamente
      },
      error: (e) => {
        console.log("There was an error: " + e)
      },
      complete: () => {
        console.info('Suscesfull complete')         
      }  
    });

  }

}
