import { Injectable } from '@angular/core';
import { Parser } from 'xml2js'
import { IDailyBnrReport } from '../models/IDailyBnrReport';
import { IRate } from '../models/IRate';

@Injectable({
  providedIn: 'root'
})
export class XmlParsingService {
  parseXml(data): Promise<IDailyBnrReport> {
    return new Promise<IDailyBnrReport>((resolve, reject) => {
      new Parser().parseString(data, (err, result) => {
        if (err) {
          reject(err);
        } else {

          resolve(extractRates(result));
        }
      });
    });
  }
}

function extractRates(data): IDailyBnrReport {
  let currentDate = new Date(data.DataSet.Body[0].Cube[0]["$"].date).toLocaleDateString();

  var allRawRates = data.DataSet.Body[0].Cube[0].Rate;
  var allRates: Array<IRate> = [];
  for (var i = 0; i < allRawRates.length; i++) {
    let currentRate = data.DataSet.Body[0].Cube[0].Rate[i];

    let currencyName = currentRate["$"].currency;
    let rate = Number(currentRate["_"]);
    allRates.push({
      currencyName: currencyName,
      rate: rate
    });
  }
  console.warn(allRates)

  return {
    date: currentDate,
    rates: allRates
  };
}