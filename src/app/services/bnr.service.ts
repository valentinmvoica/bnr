import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BnrService {

  constructor(private http: HttpClient) { }

  getData() {
    let headers = new HttpHeaders();
    headers = headers.set('Accept', "text/xml");
    headers = headers.set('responseType', "text/xml");
    return this.http.get("/api/nbrfxrates.xml", { headers: headers, responseType: 'text' })
  }
}
