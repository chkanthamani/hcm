import { Component, inject } from '@angular/core';
import { Auth } from '../services/auth';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [NgClass, RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  styleUrl: './header.scss',
  standalone:true
})
export class Header {
  auth = inject(Auth);
  route = inject(Router);
  role:any;

  ngOnInit(){
    this.role = localStorage.getItem('role')
  }

  logout(){
    this.auth.logout();
    this.route.navigate(['/login']);
  }

  // navigate(val:any){
  //   if(val == 'Employees'){
  //     this.route.navigate(['/employees']);
  //   }
  //   else{
  //     this.route.navigate(['/dashboard']);
  //   }
  // }
}
