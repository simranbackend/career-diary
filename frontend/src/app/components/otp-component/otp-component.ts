import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user-service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-otp-component',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './otp-component.html',
  styleUrl: './otp-component.css',
})
export class OtpComponent implements OnInit {
  otpForm!: FormGroup;
  mobile!: string;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.mobile = params['mobile'];
    });

    this.otpForm = this.fb.group({
      otp: ['', [Validators.required, Validators.pattern('^[0-9]{4,6}$')]],
    });
  }

  onSubmit(): void {
    if (this.otpForm.valid) {
      const otp = this.otpForm.value.otp;

      // send mobile and otp in request body so backend can read from req.body
      const payload = { mobile: this.mobile, otp };

      this.userService.login(payload).subscribe({
        next: (data) => {          
          if (data.status) {
            // save token and user info for authenticated session
            try {
              if (data.data && data.data.token) {
                localStorage.setItem('token', data.data.token);
              }
              if (data.data && data.data.user) {
                localStorage.setItem('user', JSON.stringify(data.data.user));
              }
            } catch (e) {
              // ignore storage errors
            }

            this.toastr.success(data.message, 'Success');
            this.router.navigate(['/dashboard']);
          } else {
            this.toastr.error(data.message || 'Failed to send OTP', 'Error');
          }
        },
        error: (err) => {
          // Backend returns 4xx for invalid OTP, which triggers this error path.
          // Show the backend message in a toast so user sees the error.
          console.error('Invalid OTP error response:', err);
          const message = err?.error?.message || err?.message || 'Invalid OTP';
          this.toastr.error(message, 'Error');
        },
      });
    } else {
      this.otpForm.markAllAsTouched();
    }
  }
}
