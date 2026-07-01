import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Dashbaord {
  url = 'http://localhost:5000/dashboard'
  http = inject(HttpClient);

  getDashboardData(){
    return this.http.get(this.url);
  }
}
