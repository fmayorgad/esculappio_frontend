import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { SchoolConfigurationsRoutingModule } from './schoolconfigurations-routing.module';
import { AccountingPeriodsMainComponent } from './accounting_periods/main/main.component';
import {ChangeDialogsComponent} from './actors/dialogs/change/change.component';
import {ActorsMainComponent} from './actors/main/main.component';
import {CreateDialogComponent} from './actors/dialogs/create/create.component';

const COMPONENTS = [AccountingPeriodsMainComponent, ActorsMainComponent];
const COMPONENTS_DYNAMIC = [ChangeDialogsComponent, CreateDialogComponent];

@NgModule({
  imports: [
    SharedModule,
    SchoolConfigurationsRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_DYNAMIC
  ],
  entryComponents: COMPONENTS_DYNAMIC
})
export class SchoolConfigurationsModule { }
