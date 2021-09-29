import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { IDailyBnrReport } from 'src/app/models/IDailyBnrReport';

@Component({
  selector: 'app-ron-eur-rate',
  templateUrl: './ron-eur-rate.component.html',
  styleUrls: ['./ron-eur-rate.component.css']
})
export class RonEurRateComponent implements OnInit, OnChanges {

  @Input() report: IDailyBnrReport;

  public eurRate: number;
  public date: string;

  constructor() { }

  ngOnInit(): void {


  }
  ngOnChanges() {
    if (this.report == null)
      return;
    this.date = this.report.date;
    if (this.report.rates == null)
      return;
    var eurRateObj = this.report.rates.find(o => o.currencyName == "EUR");

    if (eurRateObj)
      this.eurRate = eurRateObj.rate;
  }
}
