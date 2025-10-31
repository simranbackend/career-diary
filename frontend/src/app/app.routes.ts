import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login-component/login-component';
import { OtpComponent } from './components/otp-component/otp-component';
import { DashboardComponent } from './components/dashboard-component/dashboard-component';
import { authGuardGuard } from './guard/auth-guard-guard';
import { AddCompanyComponent } from './components/company/add-company-component/add-company-component';
import { ViewCompanyComponent } from './components/company/view-company-component/view-company-component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, canActivate: [authGuardGuard] },
  { path: 'otp', component: OtpComponent, canActivate: [authGuardGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [authGuardGuard] },
  { path: 'add-company', component: AddCompanyComponent, canActivate: [authGuardGuard] },
  { path: 'view-companies', component: ViewCompanyComponent, canActivate: [authGuardGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
