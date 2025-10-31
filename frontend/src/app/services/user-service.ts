import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  constructor(private http: HttpClient) {}

  private apiUrl = 'http://localhost:4000';

  sendOtp(userData:any): Observable<any> {
    return this.http.post(`${this.apiUrl}/user/send-otp`, userData);
  }

  login(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/user/login`, userData);
  }

  logout(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = token ? new HttpHeaders({ Authorization: `Bearer ${token}` }) : undefined;
    return this.http.post(`${this.apiUrl}/user/logout`, {}, { headers });
  }

}
