import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { SettingsPlatformRoutingModule } from './settingsplatform-routing.module';
import { OrgansMainComponent } from './questions/main/main.component';
import { QuestionsMainComponent } from './questions/questions/main.component';
import { UsersAdminMainComponent } from './users/main.component';
import { HttpClientModule } from '@angular/common/http';

//Dialogs
import { QuestionCreateComponent } from './questions/questions/dialogs/create/create.component';
import { QuestionEditComponent } from './questions/questions/dialogs/edit/edit.component';
import { UserAdminCreateComponent } from './users/dialogs/create/create.component';
import { UserAdminEditComponent } from './users/dialogs/edit/edit.component';

import {ProfileMainComponent} from './profile/main/main.component';

const COMPONENTS = [OrgansMainComponent, QuestionsMainComponent, UsersAdminMainComponent, ProfileMainComponent];
const COMPONENTS_DYNAMIC = [QuestionCreateComponent, QuestionEditComponent, UserAdminCreateComponent, UserAdminEditComponent];


@NgModule({
  imports: [
    SharedModule,
    SettingsPlatformRoutingModule,
    HttpClientModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_DYNAMIC
  ],
  entryComponents: COMPONENTS_DYNAMIC
})
export class SettingsModule { }
