import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Api} from "../../utils/api"

@Injectable({
  providedIn: 'root'
})
export class AgentService {

  constructor(private http: HttpClient) { }

  postAgent(data: any) {
    return this.http.post<any>(`${Api}/agent`, data)
  }

  getAgents() {
    return this.http.get<any>(`${Api}/agent`)
  }
}
