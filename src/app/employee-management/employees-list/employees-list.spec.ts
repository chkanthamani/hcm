import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { Employee } from './employee';
import { EmployeesList } from './employees-list';

describe('EmployeesList', () => {
  let component: EmployeesList;
  let fixture: ComponentFixture<EmployeesList>;
  let employeeService: jasmine.SpyObj<Employee>;

  beforeEach(async () => {
    const employeeServiceSpy = jasmine.createSpyObj('Employee', ['getEmployees', 'updateStatus']);
    employeeServiceSpy.getEmployees.and.returnValue(of([]));
    employeeServiceSpy.updateStatus.and.returnValue(of({}));

    await TestBed.configureTestingModule({
      imports: [EmployeesList, RouterTestingModule],
      providers: [{ provide: Employee, useValue: employeeServiceSpy }]
    }).compileComponents();

    fixture = TestBed.createComponent(EmployeesList);
    component = fixture.componentInstance;
    employeeService = TestBed.inject(Employee) as jasmine.SpyObj<Employee>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should deactivate employee after confirmation', () => {
    spyOn(window, 'confirm').and.returnValue(true);

    component.deactivateEmployee(1);

    expect(employeeService.updateStatus).toHaveBeenCalledWith(1, 0);
  });

  it('should not deactivate employee when confirmation is cancelled', () => {
    spyOn(window, 'confirm').and.returnValue(false);

    component.deactivateEmployee(1);

    expect(employeeService.updateStatus).not.toHaveBeenCalled();
  });
});
