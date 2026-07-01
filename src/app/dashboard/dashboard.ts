import { Component, inject } from '@angular/core';
import { Header } from '../header/header';
import { Dashbaord } from '../dashbaord';
import { Employee } from '../employee-management/employees-list/employee';

@Component({
  selector: 'app-dashboard',
  imports: [Header],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
  dashboard = inject(Dashbaord);
  emp = inject(Employee);
  dashboardData: any;
  employees: any[] = [];
  selectedEmployee: any = null;

  ngOnInit() {
    this.dashboard.getDashboardData().subscribe((res: any) => {
      this.dashboardData = res;
    });

    this.emp.getEmployees().subscribe((res: any) => {
      this.employees = (res || []).map((user: any) => ({
        ...user,
        fullName: [user.firstName, user.lastName].filter(Boolean).join(' ')
      }));
    });
  }

  openEmployeeDetails(employee: any) {
    this.selectedEmployee = employee;
    document.body.style.overflow = 'hidden';
  }

  closeEmployeeDetails() {
    this.selectedEmployee = null;
    document.body.style.overflow = '';
  }
}
