import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { environment } from '@env/environment';

import { AdminLayoutComponent } from '../theme/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from '../theme/auth-layout/auth-layout.component';
import { LoginComponent } from './sessions/login/login.component';
import { RecoverComponent } from './sessions/recover/recover.component';
import { AuthGuard } from '../helpers';

const routes: Routes = [
  {
    path: 'auth',
    component: AuthLayoutComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent,
        data: { title: 'Login', titleI18n: 'Login' },
      },
      {
        path: 'recoverPassword',
        component: RecoverComponent,
        data: { title: 'Recuperar Contraseña', titleI18n: 'Recover' },
      },
    ],
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
    canActivate: [AuthGuard],
    component: AdminLayoutComponent,
  },
  {
    path: 'cuentas',
    loadChildren: () => import('./billingaccounts/billingaccounts.module').then(m => m.BillingaccountsModule),
    canActivate: [AuthGuard],
    component: AdminLayoutComponent,
  },
  {
    path: 'configuracion',
    loadChildren: () => import('./settings/settingsplatform.module').then(m => m.SettingsModule),
    canActivate: [AuthGuard],
    component: AdminLayoutComponent,
  },
  {
    path: 'configuracion_institucion',
    loadChildren: () => import('./school_configurations/schoolconfigurations.module').then(m => m.SchoolConfigurationsModule),
    canActivate: [AuthGuard],
    component: AdminLayoutComponent,
  },
  {
    path: 'colegios',
    loadChildren: () => import('./schools/schools.module').then(m => m.SchoolsModule),
    component: AdminLayoutComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'bancos',
    loadChildren: () => import('./banks/banks.module').then(m => m.BanksModule),
    component: AdminLayoutComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'solicitudes_modificacion',
    loadChildren: () => import('./requests/requests.module').then(m => m.RequestsModule),
    component: AdminLayoutComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'tipos_documento',
    component: AdminLayoutComponent,
    loadChildren: () => import('./documentTypes/documentTypes.module').then(m => m.DocumentTypesModule),
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard]
  },
  {
    path: 'terceros',
    component: AdminLayoutComponent,
    loadChildren: () => import('./thirdparty/thirdparty.module').then(m => m.ThirdPartyModule),
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard]
  },
  {
    path: 'comprobantes',
    loadChildren: () => import('./vouchers/vouchers.module').then(m => m.VouchersModule),
    component: AdminLayoutComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'fuentes',
    loadChildren: () => import('./revenue/revenue.module').then(m => m.RevenueModule),
    component: AdminLayoutComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'cuentas_bancarias',
    loadChildren: () => import('./bank_accounts/bankAccounts.module').then(m => m.BankAccountsModule),
    component: AdminLayoutComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'documentos',
    loadChildren: () => import('./documents/documents.module').then(m => m.DocumentsModule),
    component: AdminLayoutComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'proyectos',
    component: AdminLayoutComponent,
    loadChildren: () => import('./proyects_subsidiaries/proyects.module').then(m => m.ProyectsSubsidiariesModule),
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard]
  },
  { path: '**', redirectTo: 'dashboard' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: environment.useHash,
    }),
  ],
  exports: [RouterModule],
})
export class RoutesRoutingModule {
}
