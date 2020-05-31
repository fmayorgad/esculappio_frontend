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
    component: AdminLayoutComponent,
  },

  {
    path: 'pacientes',
    loadChildren: () => import('./pacients/pacients.module').then(m => m.PacientsdModule),
    component: AdminLayoutComponent,
    canActivate: [AuthGuard]
  },

  {
    path: 'consultas',
    loadChildren: () => import('./consultations/consultations.module').then(m => m.ConsultationsModule),
    component: AdminLayoutComponent,
  },

  {
    path: 'configuracion',
    loadChildren: () => import('./settings/settingsplatform.module').then(m => m.SettingsModule),
    canActivate: [AuthGuard],
    component: AdminLayoutComponent,
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
