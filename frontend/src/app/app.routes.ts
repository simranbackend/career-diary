import { Routes } from '@angular/router';
import { LoginComponent } from './components/login-component/login-component';
import { OtpComponent } from './components/otp-component/otp-component';
import { DashboardComponent } from './components/dashboard-component/dashboard-component';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'otp', component: OtpComponent },
    { path: 'dashboard', component: DashboardComponent },
];
