import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  constructor(private http: HttpClient) { }

  postAdmin(data: any) {
    return this.http.post<any>("http://localhost:8080/admin", data)
  }

  getAdmins() {
    return this.http.get<any>("http://localhost:8080/admin")
  }
}
