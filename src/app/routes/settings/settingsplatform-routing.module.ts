import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlatformMainComponent } from './platform/main/main.component';
import { ProfileMainComponent } from './profile/main/main.component';
import { AuthGuard } from '../../helpers';

const routes: Routes = [
  {
    path: 'platform',
    component: PlatformMainComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    children: []
  },
  
  {
    path: 'profile',
    component: ProfileMainComponent,
    canActivateChild: [AuthGuard],
    children: []
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsPlatformRoutingModule { }
