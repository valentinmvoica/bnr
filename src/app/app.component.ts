import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { IDailyBnrReport } from './models/IDailyBnrReport'
import { BnrService } from './services/bnr.service';
import { XmlParsingService } from './services/xml-parsing.service';

import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'cursBnr';

  private unsubscribe$: Subject<void> = new Subject<void>();

  public report: IDailyBnrReport;

  constructor(private bnrService: BnrService, private xmlParsingService: XmlParsingService) {
  }

  ngOnInit(): void {

    this.bnrService.getData()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(async (data) => {
        this.report = await this.xmlParsingService.parseXml(data);
      }, (err) => {
        console.error("Error retrieving data from the server: ", err)
      })
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}