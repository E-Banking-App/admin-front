import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Api} from "../../utils/api"

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  constructor(private http: HttpClient) { }

  postClient(data: any) {
    return this.http.post<any>(`${Api}/client`, data)
  }

  getClients() {
    return this.http.get<any>(`${Api}/client`)
  }
}
