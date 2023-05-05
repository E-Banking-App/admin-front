import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AgentService {

  constructor(private http: HttpClient) { }

  postAgent(data: any) {
    return this.http.post<any>("http://localhost:8080/agent", data)
  }

  getAgents() {
    return this.http.get<any>("http://localhost:8080/agent")
  }
}
