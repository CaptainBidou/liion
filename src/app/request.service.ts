import { Injectable } from '@angular/core';
import { SocketAddress } from 'net';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor() { }



  doRequest(data: any){
    // for res in SocketAddress.getaddrinfo("127.0.0.1", 5000):
    //   with Socket.socket(res[0], socket.SOCKET_STREAM) as s:
    //     s.connect(res[4])
    //     s.sendall(data)
    //     data = s.recv(1024)
    //     print('Received', repr(data))
    // return data
  }
}
