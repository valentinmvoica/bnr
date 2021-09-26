import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpClient, HttpClientModule, } from '@angular/common/http';
import { BnrService } from './services/bnr.service';
import { XmlParsingService } from './services/xml-parsing.service';
import { RonEurRateComponent } from './components/ron-eur-rate/ron-eur-rate.component';
import { ChartRatesComponent } from './components/chart-rates/chart-rates.component';

@NgModule({
  declarations: [
    AppComponent,
    RonEurRateComponent,
    ChartRatesComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [BnrService, HttpClient, XmlParsingService],
  bootstrap: [AppComponent]
})
export class AppModule { }
