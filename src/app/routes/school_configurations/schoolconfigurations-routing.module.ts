import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../helpers';
import {AccountingPeriodsMainComponent} from './accounting_periods/main/main.component';
import {ActorsMainComponent} from './actors/main/main.component';


const routes: Routes = [
  {
    path: 'periodos_contables',
    component: AccountingPeriodsMainComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    children: []
  },
  {
    path: 'actores',
    component: ActorsMainComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    children: []
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SchoolConfigurationsRoutingModule { }
