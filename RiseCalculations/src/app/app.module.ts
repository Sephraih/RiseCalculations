import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CalculationsComponent } from './calculations/calculations.component';
import { ParserService } from './services/parser.service';
import { HttpClientModule } from '@angular/common/http';
import { ChartsComponent } from './charts/charts.component';
import { SigmoidService } from './services/sigmoid.service';
import { NormaliserService } from './services/normaliser.service';
import { ExponentialApproachService } from './services/exponentialApproach.service';

@NgModule({
  declarations: [
    AppComponent,
    CalculationsComponent,
    ChartsComponent
  ],
  imports: [
    BrowserModule,
	AppRoutingModule,
	BrowserModule,
	HttpClientModule
  ],
  providers: [
    ParserService,
    SigmoidService,
    NormaliserService,
    ExponentialApproachService
	],
  bootstrap: [AppComponent]
})
export class AppModule { }
