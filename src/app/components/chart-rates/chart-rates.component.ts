import { AfterViewInit, Component, Input, OnChanges, OnInit } from '@angular/core';
import { IRate } from 'src/app/models/IRate';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-chart-rates',
  templateUrl: './chart-rates.component.html',
  styleUrls: ['./chart-rates.component.css']
})
export class ChartRatesComponent implements OnInit, AfterViewInit, OnChanges {

  @Input() allRates: IRate[];
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
    if (!this.allRates || !this.afterViewInitTriggered) {
      return;
    }

    this.chart = Highcharts.chart(this.chartContainerId, getOptionsFromRates(this.allRates));
  }
}

function getOptionsFromRates(allRates: IRate[]): any {
  let title = "Current Rates";
  var series = [];

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
    xAxis: {
      categories: [title]
    },
    series: series
  }
}