import { Component, OnInit } from '@angular/core';
import { IDailyBnrReport } from './models/IDailyBnrReport'
import { BnrService } from './services/bnr.service';
import { XmlParsingService } from './services/xml-parsing.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'cursBnr';


  public report: IDailyBnrReport;

  constructor(private bnrService: BnrService, private xmlParsingService: XmlParsingService) {
  }

  ngOnInit(): void {

    this.bnrService.getData().subscribe(async (data) => {
      this.report = await this.xmlParsingService.parseXml(data);
    })
  }
}