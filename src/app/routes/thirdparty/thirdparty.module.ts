import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { ThirdPartyRoutingModule } from './thirdparty-routing.module';
import { ThirdTypesMainComponent } from './types/main/main.component';
import { ThirdsMainComponent } from './thirds/main/main.component';
import {CreateThirdTypeDialogComponent} from './types/dialogs/create/create.component';
import {EditThirdTypeDialogComponent} from './types/dialogs/edit/edit.component';
import {CreateThirdDialogComponent} from './thirds/dialogs/create/create.component';
import {EditThirdDialogComponent} from './thirds/dialogs/edit/edit.component';
import {AcountThirdDialogComponent} from './thirds/dialogs/accounts/accounts.component';

const COMPONENTS = [ThirdTypesMainComponent, ThirdsMainComponent ];
const COMPONENTS_DYNAMIC = [CreateThirdTypeDialogComponent, CreateThirdDialogComponent, EditThirdDialogComponent, EditThirdTypeDialogComponent, AcountThirdDialogComponent];

@NgModule({
  imports: [
  SharedModule,
  ThirdPartyRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_DYNAMIC
  ],
  entryComponents: COMPONENTS_DYNAMIC
})
export class ThirdPartyModule { }

