//IMPORTS NECESARIOS
import { ModuleWithProviders } from "@angular/core";
import {Routes, RouterModule} from "@angular/router";

//IMPORTAR COMPONENTES
import {ResultsComponent} from  './Components/results/results.component';
import {SearchComponent} from  './Components/search/search.component';
import {ErrorComponent} from  './Components/error/error.component';
import {StateComponent} from  './Components/state/state.component';
const appRoutes: Routes = [
    {path: '', component: SearchComponent},
    {path: 'home', component: SearchComponent},
    {path: 'search', component: SearchComponent},
    {path: 'results/:airport/:begin/:finish', component: ResultsComponent},
    {path: 'states', component: StateComponent},
    {path: '**', component: ErrorComponent}
];

//EXPORTACIÓN CONFIGURACIÓN DE LAS RUTAS
export const appRoutingProviders: any[] =[];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forRoot(appRoutes);

