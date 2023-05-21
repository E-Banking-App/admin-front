import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Api} from "../../utils/api"

@Injectable({
  providedIn: 'root'
})
export class AgenciesService {

  constructor(private http: HttpClient) { }

  postAgency(data: any) {
    return this.http.post<any>(`${Api}/agency`, data)
  }

  getAgencies() {
    return this.http.get<any>(`${Api}/agency`)
  }
}
