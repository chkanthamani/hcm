import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from '../services/auth';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  loginForm!: FormGroup;
  signupForm!: FormGroup;
  loginMode:any = 'login';
  error:any = '';

  authService = inject(Auth);
  router = inject(Router);
  fb = inject(FormBuilder);

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });


    this.signupForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  loginSubmit(){


    this.authService.login(this.loginForm.value).subscribe(res=>{
      console.log(res);
      localStorage.setItem('token', res.token);
      localStorage.setItem('role', res.user.role);
      this.router.navigate(['/dashboard']);
    })
    
    // const {email, password} = this.loginForm.value;
    // const success = this.authService.login(email, password);
    // if(success){
    //   this.router.navigate(['/employees']);
    // }
    // else{
    //   alert('Invalid credentials login');
    // }

  }

  // signUp(){
  //   // if(this.signupForm.valid){
  //   //   if(this.signupForm.value.password !== this.signupForm.value.confirmPassword){
  //   //     this.error = 'Passwords do not match';
  //   //     return;
  //   //   }
  //   //   this.authService.register(
  //   //     this.signupForm.value
  //   //   );
  //   //   alert('Registration successful');
  //   //   this.loginMode = 'login';
  //   //   this.loginForm.reset();
  //   //   this.signupForm.reset();
  //   //   // localStorage.setItem('user', JSON.stringify(this.signupForm.value));
  //   // }
  //   // else{
  //   //   console.log('Invalid form data');
  //   // }

  //   // in backend will handle with api calls
  //   this.authService.register(this.signupForm.value).subscribe({
  //     next: () => {
  //       alert('Registration successfully done')
  //       this.router.navigate(['/login']);
  //     },
  //     error: (err:any) => {
  //       console.log(err,'Error');
  //     }
  //   })
  // }

  formReset(mode:any = 'login'){
    this.loginMode = mode;
    this.loginForm.reset();
    this.signupForm.reset();
  }
}
