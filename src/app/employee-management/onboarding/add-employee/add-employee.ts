import { Component, inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router'
import { Employee } from '../../employees-list/employee';
import { DatePicker } from 'primeng/datepicker';

@Component({
  selector: 'app-add-employee',
  imports: [FormsModule, ReactiveFormsModule, DatePicker],
  templateUrl: './add-employee.html',
  styleUrl: './add-employee.scss',
})
export class AddEmployee {
  editId: any;
  employeeForm !: FormGroup;
  fb = inject(FormBuilder);
  emp = inject(Employee);
  router = inject(Router);

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.editId = params.get('id');
      if (this.editId) {
        this.emp.getEmployeesID(this.editId)
          .subscribe((res: any) => {
            console.log(res,'res');
              this.employeeForm.patchValue({
                firstName: res.firstName,
                lastName: res.lastName,
                email: res.email,
                phone: res.phone,
                department: res.department,
                status: Number(res.status),
                // imagePreview: res.profileImage,
                dateOfJoining: res.dateOfJoining ? this.toLocalDate(res.dateOfJoining) : null
              });
              if(res.profileImage){
                this.imagePreview = res.profileImage;
              }
          });
        }
    });

    this.employeeForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(3), Validators.pattern(/^[a-zA-Z]+$/)]],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      department: [null, Validators.required],
      dateOfJoining: [null, Validators.required],
      customFields: this.fb.array([])
    });

  }
  get customFields(): FormArray {
    return this.employeeForm.get('customFields') as FormArray;
  }

  addCustomField() {
    const field = this.fb.group({
      fieldName: [''],
      fieldValue: [''],
    });
    this.customFields.push(field);
  }
  removeCustomFields(index: number) {
    this.customFields.removeAt(index);
  }

  // single upload
  selectedFile!: File;
  uploadFile(e: any) {
    // basic file view
    this.selectedFile = e.target.files[0];
    const formdata = new FormData()
    formdata.append('file', this.selectedFile);

    this.emp.postEmployees(formdata).subscribe({
      next: res => console.log(res),
      error: err => console.log(err)
    })
  }
  // multi files
  selectedMultipleFiles: File[] = [];
  uploadMultipleFile(e: any) {
    this.selectedMultipleFiles = Array.from(e.target.files);

    const formData = new FormData()
    this.selectedMultipleFiles.forEach(file => {
      formData.append('file', file);
    })
  }

  imagePreview: string | ArrayBuffer | null = null;
  selectedImage!: File;
  // image upload
  uploadImage(e: any) {
    console.log(e, 'e');
    this.selectedImage = e?.target?.files[0];
    const reader = new FileReader(); //here browser creates the object for read the file
    //file exists the local angular cannot reads or display directly fileReader should read the file data
    reader.onload = () => {
      this.imagePreview = reader.result; //once reading completed this func wwill excutes
    };
    reader.readAsDataURL(this.selectedImage); //to read the file content
  }

  removeImage(fileInput: HTMLInputElement) {
    // this.selectedImage = null;
    this.imagePreview = null;
    fileInput.value = '';
  }

  formatDate(date: Date){
    const year = date?.getFullYear();
    const month = String(date?.getMonth() + 1).padStart(2, '0');
    const day = String(date?.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  
  toLocalDate(dateString: string) {
    const [year, month, day] = dateString.split('T')[0].split('-');
    return new Date(+year, +month - 1, +day);
  }

  addEmployee() {
    if (this.employeeForm.invalid) {
      this.employeeForm.markAllAsTouched();
      return;
    }

    const confirmed = window.confirm('Are you sure you want to submit this form?');
    if (!confirmed) {
      return;
    }

    const formData = new FormData();
    const payload = {...this.employeeForm.value, dateOfJoining: this.formatDate(this.employeeForm.value.dateOfJoining)};

    Object.keys(payload).forEach(key =>{
      formData.append(key, payload[key]);
    })
    if(this.selectedImage){
      formData.append('profileImage', this.selectedImage);
    }

    if (this.editId) {
      this.emp
        .updateEmployee(this.editId, formData)
        .subscribe(() => {
          this.router.navigate(['/employees']);
        });
    }
    else {
      this.emp.postEmployees(formData).subscribe({
        next: res => this.router.navigate(['/employees']),
        error: err => console.log(err)
      })
    }
  }

  backTo() {
    this.router.navigate(['/employees']);
  }

}
