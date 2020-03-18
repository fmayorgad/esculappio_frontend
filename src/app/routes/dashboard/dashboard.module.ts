import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import {DashboardSuperAdminComponent} from './superadmin/dashboard.component';
import {DashboardSchoolAdminComponent } from './userclient/dashboard.component';
import {DashboardRoutingModule} from './dashboard-routing.module';


const COMPONENTS = [DashboardSuperAdminComponent, DashboardSchoolAdminComponent];
const COMPONENTS_DYNAMIC = [];

@NgModule({
  imports: [
    SharedModule,
    DashboardRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_DYNAMIC
  ],
  entryComponents: COMPONENTS_DYNAMIC
})
export class DashboardModule { }

