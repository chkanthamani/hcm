import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { Dashboard } from './dashboard';
import { Dashbaord } from '../dashbaord';
import { Employee } from '../employee-management/employees-list/employee';

describe('Dashboard', () => {
  let component: Dashboard;
  let fixture: ComponentFixture<Dashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Dashboard],
      providers: [
        {
          provide: Dashbaord,
          useValue: {
            getDashboardData: () => of({ totalEmployees: 2, activeEmployees: 1, inactiveEmployees: 1, adminCount: 1, hrCount: 1, employeeCount: 0 })
          }
        },
        {
          provide: Employee,
          useValue: {
            getEmployees: () => of([{ id: 1, firstName: 'John', lastName: 'Doe', email: 'john@example.com', department: 'Admin', status: 1, dateOfJoining: '2024-01-01' }])
          }
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Dashboard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load employees for the dashboard table', () => {
    expect(component.employees.length).toBe(1);
    expect(component.employees[0].fullName).toBe('John Doe');
  });
});
