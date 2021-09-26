import { AfterViewInit, Component, Input, OnChanges, OnInit } from '@angular/core';
import { IRate } from 'src/app/models/IRate';
import * as Highcharts from 'highcharts';
import { IDailyBnrReport } from 'src/app/models/IDailyBnrReport';

@Component({
  selector: 'app-chart-rates',
  templateUrl: './chart-rates.component.html',
  styleUrls: ['./chart-rates.component.css']
})
export class ChartRatesComponent implements OnInit, AfterViewInit, OnChanges {

  @Input() report: IDailyBnrReport;

  public readonly chartContainerId: string = "chartContainerId";

  private chart: Highcharts.Chart;

  private afterViewInitTriggered: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }
  ngAfterViewInit() {
    this.afterViewInitTriggered = true;
    this.buildChart();
  }
  ngOnChanges() {
    this.buildChart();
  }
  private buildChart() {
    if (!this.report || !this.afterViewInitTriggered) {
      return;
    }

    this.chart = Highcharts.chart(this.chartContainerId, getOptionsFromRates(this.report));
  }
}

function getOptionsFromRates(report: IDailyBnrReport): any {
  var series = [];
  const allRates = report.rates;
  const title = report.date;

  allRates.forEach((rate: IRate) => {
    if (rate.currencyName == "XAU")
      return true;
    series.push(
      {
        name: rate.currencyName,
        data: [rate.rate as number]
      }
    );
  })

  return {
    chart: {
      type: 'column'

    },
    title: {
      text: "Current bnr rates"
    },
    xAxis: {
      categories: [title]
    },
    series: series
  }
}