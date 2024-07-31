import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SocketAddress } from 'net';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  http: any;

  constructor(private httpClient: HttpClient) {
    this.http = httpClient;

   }

  // the server is 127.0.0.1:5000
  // send {id: 1, data: {}} to the server

  public doRequest(data: any): Observable<any> {
    return this.http.post('http://127.0.0.1:5000', data);
  }
  public doGithubRequest(data: any): Observable<any> {
    // get the last 10 commits from the github repository
    // CaptainBidou/LIBS
    return this.http.get('https://api.github.com/repos/CaptainBidou/LIBS/commits?per_page=1');
  }

  public doFutbolRequestGet(data: any): Observable<any> {
    var header : any;
    header = {
        'x-rapidapi-host': 'v3.football.api-sports.io',
        'x-rapidapi-key': 'ca4855e29cd2ca318e3010771bdb21b8'
    };
    var param: any;
    param = {
        'team': '126',
        // 'code':'BR'
        'league': '71',
        'season': '2024'
    };
    return this.http.get('https://v3.football.api-sports.io/teams/statistics', {headers: header, params: param});
    // return this.http.get('https://v3.football.api-sports.io/leagues', {headers: header, params: param});
  }
  //team : 126
  //league : 71/73/475/632
  //season : 2024
}
