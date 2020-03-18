import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { VouchersRoutingModule } from './vouchers-routing.module';
import { VouchersMainComponent } from './main/main.component';
import {VouchersDialogsCreateComponent} from './dialogs/create/create.component';
import {VouchersDialogsEditComponent} from './dialogs/edit/edit.component'

const COMPONENTS = [VouchersMainComponent ];
const COMPONENTS_DYNAMIC = [VouchersDialogsCreateComponent, VouchersDialogsEditComponent];

@NgModule({
  imports: [
    SharedModule,
    VouchersRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_DYNAMIC
  ],
  entryComponents: COMPONENTS_DYNAMIC
})
export class VouchersModule { }
