import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardSuperAdminComponent } from './superadmin/dashboard.component';
import {DashboardSchoolAdminComponent} from './userclient/dashboard.component';
import { getProfile } from '../../../assets/data/globals';

const profile = getProfile();
const profileVal = {
  SUPER_ADMIN : DashboardSuperAdminComponent,
  CONTADOR : DashboardSchoolAdminComponent
};

const routes: Routes = [
  { path: '', component: profileVal[profile] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {

}

