import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PucAccountsModuleMainComponent } from './puc/main/main.component';
import { BudgedAccountsModuleMainComponent } from './budgedaccounts/main/main.component';
import { AuthGuard } from 'app/helpers';

const routes: Routes = [
  {
    path: 'puc',
    component: PucAccountsModuleMainComponent,
    canActivateChild: [AuthGuard],
    children: []
  },
  {
    path: 'cuentas-presupuestales',
    component: BudgedAccountsModuleMainComponent,
    canActivateChild: [AuthGuard],
    children: []
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BillingAccountsRoutingModule { }
