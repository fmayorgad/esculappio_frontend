import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ThirdTypesMainComponent } from './types/main/main.component';
import { ThirdsMainComponent } from './thirds/main/main.component';
import { AuthGuard } from 'app/helpers';

const routes: Routes = [
  {
    path: 'terceros_listado',
    component: ThirdsMainComponent,
    canActivateChild: [AuthGuard],
    children: []
  },
  {
    path: 'terceros_tipos',
    component: ThirdTypesMainComponent,
    canActivateChild: [AuthGuard],
    children: []
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ThirdPartyRoutingModule { }
