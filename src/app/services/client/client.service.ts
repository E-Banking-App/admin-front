import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  constructor(private http: HttpClient) { }

  postClient(data: any) {
    return this.http.post<any>("http://localhost:8080/client", data)
  }

  getClients() {
    return this.http.get<any>("http://localhost:8080/client")
  }
}
