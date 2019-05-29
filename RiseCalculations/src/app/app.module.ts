import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ParserService } from './services/parser.service';
import { HttpClientModule } from '@angular/common/http';
import { ChartsComponent } from './charts/charts.component';
import { SigmoidService } from './services/sigmoid.service';
import { LinearService } from './services/linear.service';
import { ExponentialService } from './services/exponential.service';
import { NormaliserService } from './services/normaliser.service';
import { ParserOutputComponent } from './parser-output/parser-output.component';

@NgModule({
  declarations: [
    AppComponent,
    ChartsComponent,
    ParserOutputComponent
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
    ExponentialService,
    LinearService
	],
  bootstrap: [AppComponent]
})
export class AppModule { }
