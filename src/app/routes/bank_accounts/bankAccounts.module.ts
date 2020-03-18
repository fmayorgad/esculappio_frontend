import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SharedModule } from '@shared';
import { BankAccountsRoutingModule } from './bankAccounts-routing.module';
import { BankAccountsModuleMainComponent } from './components/main/main.component';
import {CreateAccountBankDialogComponent} from './components/dialogs/create/create.component';
import {EditSchoolDialogComponent} from './components/dialogs/edit/edit.component';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
const COMPONENTS = [BankAccountsModuleMainComponent];
const COMPONENTS_DYNAMIC = [CreateAccountBankDialogComponent, EditSchoolDialogComponent];

@NgModule({
  imports: [
    SharedModule,
    BankAccountsRoutingModule
  ],schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_DYNAMIC
  ],
  entryComponents: COMPONENTS_DYNAMIC
})
export class BankAccountsModule { }
