import { Injectable } from '@angular/core';
import { appsettingsCliente } from '../settings/appsettings';
import { HttpClient } from '@angular/common/http';
import {   Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = appsettingsCliente.apiUrl ;
  public loginStatusSubject = new Subject<boolean>();
  constructor(private http: HttpClient) { 
  
  }

  login (correo:string,password:string): Observable<any>{
    const body ={correo,password}
    return this.http.post(`${this.apiUrl}/ingresar`,body);
  }

  public getCurrentUser() {
    return this.http.get(`${this.apiUrl}/actual-usuario`);
  }

  public loginUser(token: any) {
    localStorage.setItem('token', token);
    return true;
  }
  public setUser(user: any) {
    localStorage.setItem('user', JSON.stringify(user));  
    
  }
  public getUser() {
    if (typeof window !== 'undefined' && localStorage) {
      let userStr = localStorage.getItem('user');
      if (userStr != null) {
        return JSON.parse(userStr);
      } else {
        this.logout();
        return null;
      }
    }
    return null;   
  }

  public isLoggedIn(): boolean {
    if (typeof window !== 'undefined' && localStorage) {
      const token = localStorage.getItem('token');
      return !!token;
    }
    return false;
  }

  public logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('role'); 
    this.loginStatusSubject.next(false);
    return true;
  }

  public getToken() {
    return localStorage.getItem('token');
  }
  public setUserRole(role: string) {
    localStorage.setItem('role', role);
  }
  public getUserRole() {
    return localStorage.getItem('role');
  }
  
}
