import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Api} from "../../utils/api"

@Injectable({
  providedIn: 'root'
})
export class SigninService {

  constructor(private http: HttpClient) { }

  postSignin(data: any) {
    return this.http.post<any>(`${Api}/auth/authenticate`, data)
  }
}
