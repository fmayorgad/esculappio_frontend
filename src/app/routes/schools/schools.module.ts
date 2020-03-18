import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { SchoolsRoutingModule } from './schools-routing.module';
import { SchoolsModuleMainComponent } from './components/main/main.component';
import {createSchoolDialogComponent} from './components/dialogs/createSchool/create.component';
import {EditSchoolDialogComponent} from './components/dialogs/edit/edit.component';

const COMPONENTS = [SchoolsModuleMainComponent];
const COMPONENTS_DYNAMIC = [createSchoolDialogComponent, EditSchoolDialogComponent];

@NgModule({
  imports: [
    SharedModule,
    SchoolsRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_DYNAMIC
  ],
  entryComponents: COMPONENTS_DYNAMIC
})
export class SchoolsModule { }
