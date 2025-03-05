import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

export const isAdminGuard: CanActivateFn = (route, state): Observable<boolean> => {
    const authService = inject(AuthService);
    const router = inject(Router);
    return authService.checkAdmin().pipe(
        map(res => res.data.isAdmin),
        catchError(err => {
            router.navigate(['/admin/login']);
            return of(false);
        })
    );
};
