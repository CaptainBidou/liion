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

}
