import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { BreadcrumbsComponent } from "../../breadcrumbs/breadcrumbs.component";
import { AuthService } from '../../../core/services/auth.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-user-register',
  imports: [BreadcrumbsComponent, ReactiveFormsModule, Toast, RouterLink],
  templateUrl: './user-register.component.html',
  styleUrl: './user-register.component.css',
  providers: [MessageService]
})
export class UserRegisterComponent {
  private readonly _authService = inject(AuthService);
  private readonly _FormBuilder = inject(FormBuilder);
  private readonly _MessageService = inject(MessageService);
  private readonly _Router = inject(Router);

  @ViewChild('passwordInput') passwordInput!: ElementRef;
  @ViewChild('hideEye') hideEye!: ElementRef;

  isLoading: boolean = false;
  passwordHidden: boolean = false;

  registerForm = this._FormBuilder.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    address: ['', Validators.required],
  });

  RegisterSubmit() {
    this.isLoading = true;
    if (this.registerForm.valid) {
      this._authService.userRegister(this.registerForm.value).subscribe({
        next: (res) => {
          this.isLoading = false;
          this._MessageService.add({ severity: 'success', summary: 'Success', detail: "Welcome to OutFav!" });
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
