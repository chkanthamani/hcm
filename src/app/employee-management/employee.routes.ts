import {Router, Routes} from '@angular/router'

export const employeeRoutes: Routes = [
    {
        path: '',
        loadComponent: () => import('./employees-list/employees-list').then(c => c.EmployeesList),
    },
    {
        path: 'add-employee',
        loadComponent: () => import('./onboarding/add-employee/add-employee').then(c => c.AddEmployee)
    },
    {
        path: 'edit-employee/:id',
        loadComponent: () => import('./onboarding/add-employee/add-employee').then(c => c.AddEmployee)
    }
]