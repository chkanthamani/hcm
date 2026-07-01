import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from './employee';
import { map } from 'rxjs';
import { FormsModule } from "@angular/forms";
import { Header } from '../../header/header';
import { DatePipe } from '@angular/common';
import { Tooltip } from '../../tooltip';
import { ShortNamePipe } from '../../pipes/short-name-pipe';

@Component({
  selector: 'app-employees-list',
  imports: [FormsModule, Header, DatePipe, Tooltip, ShortNamePipe],
  templateUrl: './employees-list.html',
  styleUrl: './employees-list.scss',
})
export class EmployeesList {
  router = inject(Router);
  route = inject(ActivatedRoute);
  emp = inject(Employee);

  search:any;
  employeeList: any = []; // original array
  allEmployees:any = []; // for search and sort
  displayEmployees:any = []; // for display purpose

  // sort
  sortColumn:any = '';
  sortDirection:any  = 'asc'

  // pagination
  currentPage:any = 1;
  pageSize:any = 10;
  totalRecords:any = 0;
  pages:any = [];
  selectedEmployee: any = null;
  
  ngOnInit() {
    this.getEmployees();
  }

  // get and fetch all list from api through services
  getEmployees() {
    this.emp.getEmployees().subscribe((data: any) => {
      console.log(data);
      this.employeeList = data;
      this.employeeList = this.employeeList.map((user: any,index:number) => {
        return {...user, fullName: [user.firstName, user.lastName].filter(Boolean).join(' ')}
      });

      this.allEmployees = [...this.employeeList];
      this.updatePagination(this.currentPage);
      console.log(this.employeeList);
    });
  }

  addEmployee(type: 'add' | 'update', id?:number) {
    if(type=='add'){
      this.router.navigate(['/employees/add-employee']);
    }
    else{
        this.router.navigate(['/employees/edit-employee', id]);
    }
  }

  openEmployeeDetails(employee: any) {
    this.selectedEmployee = employee;
    document.body.style.overflow = 'hidden';
  }

  closeEmployeeDetails() {
    this.selectedEmployee = null;
    document.body.style.overflow = '';
  }

  //  deleteEmployee(id:number){
  //   this.emp.deleteEmp(id).subscribe(()=>{
  //     this.getEmployees();
  //   })
  // }

  // search functionality
  searchList(){
    this.allEmployees = this.employeeList.filter((user:any)=>{
      //  return user.fullName?.toLowerCase().includes(this.search.toLowerCase()); for one column only

      // this is for all employees search and filter
      // return Object.values(user).some(value => String(value).toLowerCase().includes(this.search.toLowerCase())) 

      // this is for some column should search
      // return [user.fullName, user.email, user.role].some(value => String(value).toLowerCase().includes(this.search.toLowerCase()))

      // also we can use dynamic search columns like below
      const searchColumns = ['name', 'department', 'email'];
      return searchColumns.some(key=>String(user[key as keyof typeof user]).toLowerCase().includes(this.search.toLowerCase()))
    });
    this.updatePagination(1);
  }

  // sorting
  sort(column:string){
    if(this.sortColumn == column){
      this.sortDirection = this.sortDirection == 'asc'? 'dsc': 'asc';
    }
    else{
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }

    this.allEmployees = this.employeeList.sort((a:any, b:any)=>{      
      const  valueA = a[column as keyof typeof a];
      const  valueB = b[column as keyof typeof b];
      if(typeof valueA == 'string' && typeof valueB == 'string'){
        return this.sortDirection == 'asc' ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
      }

      return this.sortDirection == 'asc' ? (Number(valueA) - Number(valueB)) : (Number(valueB) - Number(valueA));
      
    });
    this.updatePagination(1);
  }
  
  // pagination
  totalPages(){
    const totalPagesCount =  Math.ceil(this.totalRecords/this.pageSize);
    for(let i = 1; i<= totalPagesCount;i++){
      this.pages.push({pageCount: i});
    }
    console.log(this.pages);
  }
  updatePagination(item:number){
    this.currentPage = item;
    if(!this.totalRecords){
      this.totalRecords = this.employeeList.length;
      this.totalPages();
    }
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;

    this.displayEmployees = this.allEmployees.slice(start, end);
  }
  PageNavigation(type:any){
    if(type=='next'){
      if(this.currentPage < this.pages.length){
        this.currentPage++;
        this.updatePagination(this.currentPage);
      }
    }
    else{
      if(this.currentPage > 1){
        this.currentPage--;
        this.updatePagination(this.currentPage);
      }
    }
  }

  deactivateEmployee(id:number){
    const confirmed = window.confirm('Are you sure you want to deactivate this employee?');
    if (!confirmed) {
      return;
    }

    const page = this.currentPage;
    this.emp.updateStatus(id, 0).subscribe(()=>{
      this.getEmployees();
      this.currentPage = page;
    })
  }
  restoreEmployee(id:number){
    const confirmed = window.confirm('Are you sure you want to reactivate this employee?');
    if (!confirmed) {
      return;
    }

    const page = this.currentPage;
    this.emp.updateStatus(id, 1).subscribe(()=>{
      this.getEmployees();
      this.currentPage = page;
    })
  }
}
