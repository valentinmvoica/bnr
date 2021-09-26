import { Component, OnInit } from '@angular/core';
import { IRate } from './models/IRate';
import { BnrService } from './services/bnr.service';
import { XmlParsingService } from './services/xml-parsing.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'cursBnr';

  public eurRate: number;
  public allRates: IRate[];

  constructor(private bnrService: BnrService, private xmlParsingService: XmlParsingService) {
  }

  ngOnInit(): void {

    this.bnrService.getData().subscribe(async (data) => {
      this.allRates = await this.xmlParsingService.parseXml(data);
      console.error(this.allRates[0])
      this.eurRate = this.allRates.find(o => o.currencyName == "EUR").rate;

    })
  }
}