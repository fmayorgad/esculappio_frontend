import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { SettingsPlatformRoutingModule } from './settingsplatform-routing.module';
import { QuestionsMainComponent } from './questions/main/main.component';
import {QuestionCreateComponent} from '../settings/questions/dialogs/create/create.component';
import {EditPermissionsDialogsEditComponent} from '../settings/questions/dialogs/editPermission/edit.component';


const COMPONENTS = [QuestionsMainComponent ];
const COMPONENTS_DYNAMIC = [ QuestionCreateComponent, EditPermissionsDialogsEditComponent];

@NgModule({
  imports: [
    SharedModule,
    SettingsPlatformRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_DYNAMIC
  ],
  entryComponents: COMPONENTS_DYNAMIC
})
export class SettingsModule { }
