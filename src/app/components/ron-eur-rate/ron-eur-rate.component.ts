import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-ron-eur-rate',
  templateUrl: './ron-eur-rate.component.html',
  styleUrls: ['./ron-eur-rate.component.css']
})
export class RonEurRateComponent implements OnInit {

  @Input() eurRate: number;

  constructor() { }

  ngOnInit(): void {
  }
}
