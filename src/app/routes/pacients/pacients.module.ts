import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { PacientsMainComponent } from '../pacients/main/main.component';
import { PacientsRoutingModule } from './pacients-routing.module';

import { UserPacientCreateComponent } from './dialogs/create/create.component';
import { ProcedureCreateComponent } from './dialogs/procedure/procedure.component';
import { DocumentCreateComponent } from './dialogs/documents/documents.component';
import { MamaDiagnosisComponent } from './dialogs/diagnosis/mama/mama.component';
import { EstomagoDiagnosisComponent } from './dialogs/diagnosis/estomago/estomago.component';
import { ColonDiagnosisComponent } from './dialogs/diagnosis/colon/colon.component';
import { PielDiagnosisComponent } from './dialogs/diagnosis/piel/piel.component';
import { TiroidesDiagnosisComponent } from './dialogs/diagnosis/tiroides/tiroides.component';
import { SarcomaDiagnosisComponent } from './dialogs/diagnosis/sarcoma/sarcoma.component';
import { EsofagoDiagnosisComponent } from './dialogs/diagnosis/esofago/esofago.component';
import { MelanomaDiagnosisComponent } from './dialogs/diagnosis/melanoma/melanoma.component';
import { IDXCreateComponent } from './dialogs/idx/idx.component';

const COMPONENTS =
  [
    PacientsMainComponent,
  ];
const COMPONENTS_DYNAMIC = [IDXCreateComponent, MelanomaDiagnosisComponent, EsofagoDiagnosisComponent, SarcomaDiagnosisComponent, PielDiagnosisComponent, ColonDiagnosisComponent, UserPacientCreateComponent, ProcedureCreateComponent, DocumentCreateComponent, MamaDiagnosisComponent, EstomagoDiagnosisComponent, TiroidesDiagnosisComponent];

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

