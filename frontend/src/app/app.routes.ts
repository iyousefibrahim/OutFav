import { Routes } from '@angular/router';
import { UserLayoutComponent } from './layouts/user-layout/user-layout.component';
import { UserAuthLayoutComponent } from './layouts/user-auth-layout/user-auth-layout.component';
import { AdminAuthLayoutComponent } from './layouts/admin-auth-layout/admin-auth-layout.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { isLoggedInGuard } from './core/guards/is-logged-in.guard';
import { notLoggedInGuard } from './core/guards/not-logged-in.guard';

export const routes: Routes = [

    {
        path: "", component: UserLayoutComponent, canActivate: [isLoggedInGuard], children: [
            { path: "", redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', loadComponent: () => import('./components/home/home.component').then(h => h.HomeComponent), title: "OutFav" },
        ]
    },

    {
        path: "", component: UserAuthLayoutComponent, canActivate: [notLoggedInGuard], children: [
            { path: "", redirectTo: 'login', pathMatch: 'full' },
            { path: 'login', loadComponent: () => import('./components/user/user-login/user-login.component').then(a => a.UserLoginComponent), title: "Login" },
            { path: 'register', loadComponent: () => import('./components/user/user-register/user-register.component').then(a => a.UserRegisterComponent), title: "Register" },
        ]
    },

    {
        path: 'admin', component: AdminAuthLayoutComponent, children: [
            { path: '', redirectTo: 'login', pathMatch: 'full' },
            { path: 'login', loadComponent: () => import('./components/admin/admin-login/admin-login.component').then(a => a.AdminLoginComponent) }
        ]
    },

    {
        path: 'admin', component: AdminLayoutComponent, children: [
            { path: 'dashboard', loadComponent: () => import('./components/admin/admin-dashboard/admin-dashboard.component').then(a => a.AdminDashboardComponent) }
        ]
    },

    { path: '**', component: NotfoundComponent, title: 'Page Not Found' }

];
