import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const isAdminGuard: CanActivateFn = (route, state) => {
    // Route not found check the server on Railway
    const authService = inject(AuthService);
    return authService.checkAdmin();
};
