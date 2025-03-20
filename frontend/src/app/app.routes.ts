import { Routes } from '@angular/router';
import { UserLayoutComponent } from './layouts/user-layout/user-layout.component';
import { UserAuthLayoutComponent } from './layouts/user-auth-layout/user-auth-layout.component';
import { AdminAuthLayoutComponent } from './layouts/admin-auth-layout/admin-auth-layout.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { isLoggedInGuard } from './core/guards/is-logged-in.guard';
import { notLoggedInGuard } from './core/guards/not-logged-in.guard';
import { isAdminGuard } from './core/guards/is-admin.guard';

export const routes: Routes = [

    {
        path: "", component: UserLayoutComponent, children: [
            { path: "", redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', loadComponent: () => import('./components/home/home.component').then(h => h.HomeComponent), title: "OutFav" },
            {
                path: "product/:id", loadComponent: () => import('./components/products/product-details/product-details.component').then(p => p.ProductDetailsComponent), children: [
                    { path: "", redirectTo: 'description', pathMatch: 'full' },
                    { path: 'description', loadComponent: () => import('./components/products/product-description/product-description.component').then(p => p.ProductDescriptionComponent) },
                    { path: 'reviews', loadComponent: () => import('./components/reviews/reviews.component').then(r => r.ReviewsComponent) }
                ]
            },
            { path: 'cart', loadComponent: () => import('./components/cart/cart.component').then(c => c.CartComponent) },
            { path: 'about', loadComponent: () => import('./components/about/about.component').then(a => a.AboutComponent) }
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
        path: 'admin', component: AdminAuthLayoutComponent, canActivate: [notLoggedInGuard], children: [
            { path: '', redirectTo: 'login', pathMatch: 'full' },
            { path: 'login', loadComponent: () => import('./components/admin/admin-login/admin-login.component').then(a => a.AdminLoginComponent) }
        ]
    },

    {
        path: 'admin', component: AdminLayoutComponent, canActivate: [isAdminGuard], children: [
            { path: 'dashboard', loadComponent: () => import('./components/admin/admin-dashboard/admin-dashboard.component').then(a => a.AdminDashboardComponent) }
        ]
    },

    { path: '**', component: NotfoundComponent, title: 'Page Not Found' }

];
