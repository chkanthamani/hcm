import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { Employee } from '../../employees-list/employee';
import { AddEmployee } from './add-employee';

describe('AddEmployee', () => {
  let component: AddEmployee;
  let fixture: ComponentFixture<AddEmployee>;
  let employeeService: jasmine.SpyObj<Employee>;

  beforeEach(async () => {
    const employeeServiceSpy = jasmine.createSpyObj('Employee', ['getEmployeesID', 'postEmployees', 'updateEmployee']);
    employeeServiceSpy.getEmployeesID.and.returnValue(of({}));
    employeeServiceSpy.postEmployees.and.returnValue(of({}));
    employeeServiceSpy.updateEmployee.and.returnValue(of({}));

    await TestBed.configureTestingModule({
      imports: [AddEmployee, ReactiveFormsModule, RouterTestingModule],
      providers: [
        { provide: Employee, useValue: employeeServiceSpy },
        { provide: ActivatedRoute, useValue: { paramMap: of({ get: () => null }) } }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AddEmployee);
    component = fixture.componentInstance;
    employeeService = TestBed.inject(Employee) as jasmine.SpyObj<Employee>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should submit the form after confirmation', () => {
    spyOn(window, 'confirm').and.returnValue(true);
    component.employeeForm.patchValue({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      phone: '1234567890',
      dateOfJoining: new Date('2024-01-01')
    });

    component.addEmployee();

    expect(employeeService.postEmployees).toHaveBeenCalled();
  });

  it('should not submit the form when confirmation is cancelled', () => {
    spyOn(window, 'confirm').and.returnValue(false);
    component.employeeForm.patchValue({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      phone: '1234567890',
      dateOfJoining: new Date('2024-01-01')
    });

    component.addEmployee();

    expect(employeeService.postEmployees).not.toHaveBeenCalled();
  });
});
