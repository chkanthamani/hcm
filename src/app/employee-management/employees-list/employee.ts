import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Employee {
  private url = 'http://localhost:5000/employees';

  private http = inject(HttpClient);

  getEmployees() {
    return this.http.get(this.url);
  }
  // get employees by id
  getEmployeesID(id: number) {
    return this.http.get(`${this.url}/${id}`);
  }

  postEmployees(data:any){
    return this.http.post(this.url, data);
  }

  // put
  updateEmployee(id:number, data:any){
    return this.http.put(`${this.url}/${id}`, data);
  }

  // patch
  updateEmployeeEmail(id:number, email:string){
    return this.http.patch(`${this.url}/${id}`, {email: email})
  }

  // delete
  deleteEmp(id:number){
    return this.http.delete(`${this.url}/${id}`);
  }
  
  // status update
  updateStatus(id:number, status:number){
    return this.http.put(`${this.url}/${id}/status`, {status});
  }
}