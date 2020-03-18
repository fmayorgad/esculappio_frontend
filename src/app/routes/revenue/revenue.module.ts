import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { RevenueRoutingModule } from './revenue-routing.module';
import { RevenueDialogsCreateComponent } from './dialogs/create/create.component';
import { RevenueMainComponent } from './main/main.component';
import {RevenueDialogsEditComponent} from './dialogs/edit/edit.component';

const COMPONENTS = [ RevenueMainComponent];
const COMPONENTS_DYNAMIC = [RevenueDialogsCreateComponent, RevenueDialogsEditComponent];

@NgModule({
  imports: [
    SharedModule,
    RevenueRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_DYNAMIC
  ],
  entryComponents: COMPONENTS_DYNAMIC
})
export class RevenueModule { }
