import { Routes } from '@angular/router';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
    {
        path: 'login',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        loadComponent: () => import('./login/login').then(c => c.Login)
    },
    // used childRoutes here for better structure and route
    {
        path: 'employees',
        loadChildren: () => import('./employee-management/employee.routes').then(r => r.employeeRoutes),
        canActivate: [authGuard],
        data: {
            roles: ['Admin', 'HR']
        }
    },
    {
        path: 'dashboard',
        loadComponent: () => import('./dashboard/dashboard').then(c=>c.Dashboard),
        canActivate: [authGuard],
        data: {
            roles: ['Admin', 'HR', 'User']
        }
    },
    {
        path: '**', // ** is for handle errors in professional routing
        redirectTo: 'login',
    },
    
];
