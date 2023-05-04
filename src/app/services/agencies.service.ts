import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AgenciesService {

  constructor(private http: HttpClient) { }

  postAgency(data: any) {
    return this.http.post<any>("http://localhost:8080/agency", data)
  }

  getAgencies() {
    return this.http.get<any>("http://localhost:8080/agency")
  }
}
