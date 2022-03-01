import { Component, OnInit } from '@angular/core';
import { Flight } from 'src/app/Modules/flight';
import { AirportSevice } from 'src/app/Services/airport.service';
import {Router, ActivatedRoute, Params} from '@angular/router'; 

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css'],
  providers: [AirportSevice]
})
export class ResultsComponent implements OnInit {
  public flights: Array<Flight>; //Array que contendrá todos los vuelos
  public currentFlights: Array<Flight>; //Array que contendrá  los vuelos de la pagina acutal  
  public airport:string;
  public begin:number;
  public finish:number;
  public currentPage:number; //Página actual
  public maxReg:number; //Número máximo de registros por página
  public totalPag:number; //Número total de páginas
  public pagesArray:Array<number>;
  constructor(
    //Necesito una variable para acceder al sevicio
    private _airportService: AirportSevice,
    private _router: Router,                  //Creo los objetos de routing
    private _route: ActivatedRoute
  ) { 
    this.flights=[];
    this.currentFlights =[];  
    this.pagesArray =[]; 
    this.airport = '';
    this.begin = 0;
    this.finish = 0;
    this.currentPage=1;
    this.maxReg=20;
    this.totalPag=0;
    this.getFlights(); // Llamo a la API para reccoger los aeropuertos y mostrarlos
  }

  ngOnInit(): void {
    console.log("Coponente seach lanzado");
  }
  
  getFlights(){
    //En cuanto se construya el fomulario tenemos que llamar a la API para que nos devuleva todos los vuelos
    //y poderlos incluir en la tabla de resultados.
    this._route.params.subscribe({
      next: (v) => {       
        this.airport = v['airport'];    // Asgino el parámetro de búsqueda desde la ruta (airport)     
        this.begin = v['begin'];    // Asgino el parámetro de búsqueda desde la ruta (begin)  
        this.finish = v['finish'];    // Asgino el parámetro de búsqueda desde la ruta (finish)  
      }
    })
   
    this._airportService.findFlights(this.airport,this.begin,this.finish).subscribe({
      next: (v) => {       
        this.flights = v;    // Asigno los aeropertos al array      
        //Tengo un problema ya que no ordena bien los nulos. Así que les voy poner el caracter '-' cuando sea null
        for (let flight of  this.flights){
          if(flight['icao24']==null){
            flight['icao24']='-';
          }
          if(flight['firstSeen']==null){
            flight['firstSeen']='-';
          }
          else{
            flight['firstSeen']=this.timeConverter(Number(flight['firstSeen']));
          }
          if(flight['estDepartureAirport']==null){
            flight['estDepartureAirport']='-';
          }
          if(flight['lastSeen']==null){
            flight['lastSeen']='-';
          }else{
            flight['lastSeen']=this.timeConverter(Number(flight['lastSeen']));
          }
          if(flight['estArrivalAirport']==null){
            flight['estArrivalAirport']='-';
          }
          if(flight['estDepartureAirportHorizDistance']==null){
            flight['estDepartureAirportHorizDistance']='-';
          }
          if(flight['estDepartureAirportVertDistance']==null){
            flight['estDepartureAirportVertDistance']='-';
          }
          if(flight['estArrivalAirportVertDistance']==null){
            flight['estArrivalAirportVertDistance']='-';
          }
          if(flight['departureAirportCandidatesCount']==null){
            flight['departureAirportCandidatesCount']='-';
          }
          if(flight['arrivalAirportCandidatesCount']==null){
            flight['arrivalAirportCandidatesCount']='-';
          }

           
        }
        this.actualRows(1);
       

      },
      error: (e) => {
        console.log("There was an error: " + e)
      },
      complete: () => {
        console.info('Suscesfull complete')         
      }  
    });
 
  }

  actualRows(page:number){
    //Calculamos el número de páginas totales
    this.totalPag = Math.round(this.flights.length/this.maxReg)+1;
    this.currentPage = page; //Actualizamos la página actual
    
    let $numRows=0;
    //Rellenamos el array de páginas
    //Tenemos que tener en cuenta que la última página no tiene máximo de filas, se trata solo del módulo de la división.
    if(this.currentPage == this.totalPag){
      $numRows = this.flights.length%this.maxReg
    }
    else{
      $numRows = this.maxReg
    }
    this.pagesArray=[];
    for (let i=1;i<this.totalPag;i++){
      this.pagesArray[i-1]=i;
    }
    console.log(this.pagesArray);

    //Vamos a calular los registros de la página actual
    for (let i=0;i< $numRows;i++){
      this.currentFlights[i] = this.flights[(this.currentPage-1)*this.maxReg+i]
    }     
   


  }
  sortFlights(field:string){   
    //Método que ordena las columnas. Recibe la clave a ordenar y con eval evaluo la clave para poder ordenarla
    this.flights.sort((a,b) => eval("a."+field).localeCompare(eval("b."+field))); //Ordeno el array alfabéticamente por el campo field
    this.actualRows(this.currentPage);
  }
   timeConverter(timestamp:number){
    var a = new Date(timestamp * 1000);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
    return time;
  }
}




