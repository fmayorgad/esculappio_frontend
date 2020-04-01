import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { BanksRoutingModule } from './banks-routing.module';
import { BanksMainComponent } from './main/main.component';
import { BanksDialogsCreateComponent } from './dialogs/create/create.component';
import { BanksDialogsEditComponent } from './dialogs/edit/edit.component';

const COMPONENTS = [BanksMainComponent ];
const COMPONENTS_DYNAMIC = [BanksDialogsCreateComponent, BanksDialogsEditComponent];

@NgModule({
  imports: [
    SharedModule,
    BanksRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_DYNAMIC
  ],
  entryComponents: COMPONENTS_DYNAMIC
})
export class BanksModule { }
