import { Component, ElementRef, inject, ViewChild, viewChild } from '@angular/core';
import { BreadcrumbsComponent } from "../../breadcrumbs/breadcrumbs.component";
import { AuthService } from '../../../core/services/auth.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';
import { NgClass } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-user-login',
  imports: [BreadcrumbsComponent, ReactiveFormsModule, Toast],
  templateUrl: './user-login.component.html',
  styleUrl: './user-login.component.css',
  providers: [MessageService, NgClass]
})
export class UserLoginComponent {
  private readonly _authService = inject(AuthService);
  private readonly _FormBuilder = inject(FormBuilder);
  private readonly _MessageService = inject(MessageService);
  private readonly _Router = inject(Router);
  
  @ViewChild('passwordInput') passwordInput!: ElementRef;
  @ViewChild('hideEye') hideEye!: ElementRef;

  isLoading: boolean = false;
  passwordHidden: boolean = false;

  loginForm = this._FormBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  loginSubmit() {
    this.isLoading = true;
    if (this.loginForm.valid) {
      this._authService.userLogin(this.loginForm.value).subscribe({
        next: (res) => {
          this.isLoading = false;
          this._MessageService.add({ severity: 'success', summary: 'Success', detail: "You're Logged In!" });
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
