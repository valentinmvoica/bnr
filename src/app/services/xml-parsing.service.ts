import { Injectable } from '@angular/core';
import { Parser } from 'xml2js'
import { IRate } from '../models/IRate';

@Injectable({
  providedIn: 'root'
})
export class XmlParsingService {
  parseXml(data): Promise<IRate[]> {
    return new Promise<IRate[]>((resolve, reject) => {
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

function extractRates(data): IRate[] {
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

  return allRates;
}