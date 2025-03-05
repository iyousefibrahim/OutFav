import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Toast } from 'primeng/toast';
import { AuthService } from '../../../core/services/auth.service';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-admin-login',
  imports: [ReactiveFormsModule, Toast, RouterLink],
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.css',
  providers: [MessageService]
})
export class AdminLoginComponent {

  private readonly _authService = inject(AuthService);
  private readonly _FormBuilder = inject(FormBuilder);
  private readonly _MessageService = inject(MessageService);
  private readonly _Router = inject(Router);

  @ViewChild('passwordInput') passwordInput!: ElementRef;
  @ViewChild('hideEye') hideEye!: ElementRef;

  isLoading: boolean = false;
  passwordHidden: boolean = false;

  adminForm = this._FormBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  loginSubmit() {
    this.isLoading = true;
    if (this.adminForm.valid) {
      this._authService.adminLogin(this.adminForm.value).subscribe({
        next: (res) => {    
          this.isLoading = false;
          this._MessageService.add({ severity: 'success', summary: 'Success', detail: "Welcome Admin!" });
          localStorage.setItem('token', JSON.stringify(res.data.token));
          setTimeout(() => {
            this._Router.navigate(['/home']);
          }, 2500);
        },
        error: (err) => {
          this.isLoading = false;
          this._MessageService.add({ severity: 'error', summary: 'Error', detail: err.error.message, life: 5000 });
        }
      })
    }
  }

  togglePasswordVisibility() {
    if (this.passwordInput) {
      const isPassword = this.passwordInput.nativeElement.type === 'password';
      this.passwordInput.nativeElement.type = isPassword ? 'text' : 'password';
      this.passwordHidden = !isPassword;
    }
  }
}
