import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SocketAddress } from 'net';
import { Observable } from 'rxjs';
import { Test } from './Model/Test.model';

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  http: any;

  constructor(private httpClient: HttpClient) {
    this.http = httpClient;

   }


   ip="http://192.168.1.103:5000/";
  // the server is 127.0.0.1:5000
  // send {id: 1, data: {}} to the server

  public doPostRequest(route:string,data:any): Observable<any> {
    return this.http.post(this.ip+route,data);
  }


   public doGetRequest(route:string): Observable<any> {
    return this.http.get(this.ip+route);
  }

  public doDeleteRequest(route:string): Observable<any> {
    return this.http.delete(this.ip+route);
  }

  public doPutRequest(route:string,data:any): Observable<any> {
    return this.http.put(this.ip+route,data);
  }
  //team : 126
  //league : 71/73/475/632
  //season : 2024
}
