import { Component } from '@angular/core';
import { UserService } from '../../services/user-service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login-component',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './login-component.html',
  styleUrl: './login-component.css'
})
export class LoginComponent {

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService
  ) { }

  mobileForm!: FormGroup;
  loading = false;

  ngOnInit() {
    this.mobileForm = this.fb.group({
      mobile: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]]
    })
  }

  onSubmit(): void {
  if (this.mobileForm.valid) {
    this.loading = true;
    const mobile = this.mobileForm.value.mobile;

    this.userService.sendOtp({ mobile }).subscribe({
      next: (data) => {
        this.loading = false;
        // console.log("data", data);

        if (data.status) {
          this.toastr.success(data.message, 'Success');
          this.router.navigate(['/otp'], { queryParams: { mobile } });
        } else {
          this.toastr.error(data.message || 'Failed to send OTP', 'Error');
        }
      },
      error: (err) => {
        this.loading = false;
        console.error('Error sending OTP:', err);
        const message = err?.error?.message || err?.message || 'Invalid OTP';
        this.toastr.error(message, 'Error');
      }
    });

  } else {
    this.mobileForm.markAllAsTouched();
    this.toastr.warning('Please enter a valid mobile number.', 'Validation');
  }

 }
}
