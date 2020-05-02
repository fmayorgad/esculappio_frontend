import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { PacientsMainComponent } from '../pacients/main/main.component';
import { PacientsRoutingModule } from './pacients-routing.module';

import { UserPacientCreateComponent } from './dialogs/create/create.component';
import { ProcedureCreateComponent } from './dialogs/procedure/procedure.component';
import { DocumentCreateComponent } from './dialogs/documents/documents.component';

const COMPONENTS =
  [
    PacientsMainComponent,
  ];
const COMPONENTS_DYNAMIC = [UserPacientCreateComponent, ProcedureCreateComponent, DocumentCreateComponent];

@NgModule({
  imports: [
    SharedModule,
    PacientsRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_DYNAMIC
  ],
  entryComponents: COMPONENTS_DYNAMIC
})
export class PacientsdModule { }

