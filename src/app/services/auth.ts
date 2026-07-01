import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  
  private url = 'http://localhost:5000/login';
  private http = inject(HttpClient)

  register(user:any){
    // const users = JSON.parse(localStorage.getItem('users') || '[]');
    // users.push(user);
    // localStorage.setItem('users', JSON.stringify(users));
    // localStorage.setItem('token', 'dummytoken123');

    // for handle with backend API
    return this.http.post(this.url, user);
  }

  login(data:any){
    // const users = JSON.parse(localStorage.getItem('users') || '[]');
    // return users.some((user:any) =>{
    //   if(user.email === email && user.password === password){
    //     localStorage.setItem('isLoggedIn', 'true');
    //     localStorage.setItem('isLoggedUser', JSON.stringify(user));
    //     localStorage.setItem('token', 'dummytoken123');
    //     return true;
    //   } 
    //   return false;
    // });

    // for handle with backend API    
    return this.http.post<any>(this.url, data)
  }

  logout(){
    // return localStorage.removeItem('isLoggedIn');
    return localStorage.removeItem('token');
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('isLoggedIn') === 'true';
  }
  getCurrentUser(){
    return JSON.parse(localStorage.getItem('isLoggedUser') || '{}');
  }
}
