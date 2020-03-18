import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { BillingAccountsRoutingModule } from './billingaccounts-routing.module';
import {PucAccountsModuleMainComponent} from './puc/main/main.component';
import {BudgedAccountsModuleMainComponent} from './budgedaccounts/main/main.component';

import {PUCDialogsCreateComponent} from './puc/dialogs/create/create.component';
import {PUCDialogsEditComponent} from './puc/dialogs/edit/edit.component';

import {BudgetAccountsDialogsCreateComponent} from './budgedaccounts/dialogs/create/create.component';
import {BudgetAccountsDialogsEditComponent} from './budgedaccounts/dialogs/edit/edit.component';

const COMPONENTS = [PucAccountsModuleMainComponent, BudgedAccountsModuleMainComponent];
const COMPONENTS_DYNAMIC = [PUCDialogsCreateComponent , PUCDialogsEditComponent, BudgetAccountsDialogsCreateComponent, BudgetAccountsDialogsEditComponent];

@NgModule({
  imports: [
  SharedModule,
  BillingAccountsRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_DYNAMIC
  ],
  entryComponents: COMPONENTS_DYNAMIC
})
export class BillingaccountsModule { }

