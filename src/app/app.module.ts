import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { routing, appRoutingProviders  } from './app.routing';
import { FormsModule  } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './Components/header/header.component';
import { ResultsComponent } from './Components/results/results.component';
import { FooterComponent } from './Components/footer/footer.component';
import { SearchComponent } from './Components/search/search.component';
import { ErrorComponent } from './Components/error/error.component';
import { StateComponentComponent } from './state-component/state-component.component';
import { StateComponent } from './state/state.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ResultsComponent,
    FooterComponent,
    SearchComponent,
    ErrorComponent,
    StateComponentComponent,
    StateComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    routing,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    appRoutingProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
