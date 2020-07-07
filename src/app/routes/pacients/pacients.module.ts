import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { PacientsMainComponent } from '../pacients/main/main.component';
import { PacientsRoutingModule } from './pacients-routing.module';

import { UserPacientCreateComponent } from './dialogs/create/create.component';
import { ProcedureCreateComponent } from './dialogs/procedure/procedure.component';
import { DocumentCreateComponent } from './dialogs/documents/documents.component';

// diagnosis
import { MamaDiagnosisComponent } from './dialogs/diagnosis/mama/mama.component';
import { EstomagoDiagnosisComponent } from './dialogs/diagnosis/estomago/estomago.component';
import { ColonDiagnosisComponent } from './dialogs/diagnosis/colon/colon.component';
import { PielDiagnosisComponent } from './dialogs/diagnosis/piel/piel.component';
import { TiroidesDiagnosisComponent } from './dialogs/diagnosis/tiroides/tiroides.component';
import { SarcomaDiagnosisComponent } from './dialogs/diagnosis/sarcoma/sarcoma.component';
import { EsofagoDiagnosisComponent } from './dialogs/diagnosis/esofago/esofago.component';
import { MelanomaDiagnosisComponent } from './dialogs/diagnosis/melanoma/melanoma.component';
import { IDXCreateComponent } from './dialogs/idx/idx.component';
import { TreatmentsMainComponent } from './treatments/main.component';
import { OvarioDiagnosisComponent } from './dialogs/diagnosis/ovario/main.component';
import { ProstataDiagnosisComponent } from './dialogs/diagnosis/prostata/main.component';
import {PulmonDiagnosisComponent} from './dialogs/diagnosis/pulmon/main.component';
import {CervixDiagnosisComponent} from './dialogs/diagnosis/cervix/main.component';
import {UteroDiagnosisComponent} from './dialogs/diagnosis/utero/main.component';

// treatment
import { MamaTreatmentComponent } from './treatments/dialogs/mama/mama.component';
import { EstomagoTreatmentComponent } from './treatments/dialogs/estomago/estomago.component';
import { ColonTreatmentComponent } from './treatments/dialogs/colon/colon.component';
import { PielTreatmentComponent } from './treatments/dialogs/piel/piel.component';
import { TiroideTreatmentComponent } from './treatments/dialogs/tiroides/tiroide.component';
import { SarcomaTreatmentComponent } from './treatments/dialogs/sarcoma/sarcoma.component';
import { EsofagoTreatmentComponent } from './treatments/dialogs/esofago/esofago.component';
import { MelanomaTreatmentComponent } from './treatments/dialogs/melanoma/melanoma.component';
import { OvarioTreatmentComponent } from './treatments/dialogs/ovario/main.component';
import {ProstataTreatmentComponent} from './treatments/dialogs/prostata/main.component';
import {PulmonTreatmentComponent} from './treatments/dialogs/pulmon/main.component';
import {CervixTreatmentComponent} from './treatments/dialogs/cervix/main.component';
import {UteroTreatmentComponent} from './treatments/dialogs/utero/main.component';

// paleativos
import { PaleativesTreatmentComponent } from './treatments/dialogs/paleatives/paleative.component';
import { AnotationCreateComponent } from './dialogs/diagnosis/anotation/idx.component';
import {PaleativesSegmentationTreatmentComponent} from './treatments/dialogs/peliativesSegmentation/paleative.component';

const COMPONENTS =
  [
    PacientsMainComponent,
    TreatmentsMainComponent
  ];
const COMPONENTS_DYNAMIC = [PaleativesSegmentationTreatmentComponent, UteroTreatmentComponent, UteroDiagnosisComponent, CervixTreatmentComponent, PulmonTreatmentComponent, CervixDiagnosisComponent, PulmonDiagnosisComponent, ProstataTreatmentComponent, ProstataDiagnosisComponent, OvarioTreatmentComponent, OvarioDiagnosisComponent, AnotationCreateComponent, PaleativesTreatmentComponent, MelanomaTreatmentComponent, EsofagoTreatmentComponent, SarcomaTreatmentComponent, TiroideTreatmentComponent, PielTreatmentComponent, ColonTreatmentComponent, EstomagoTreatmentComponent, MamaTreatmentComponent, IDXCreateComponent, MelanomaDiagnosisComponent, EsofagoDiagnosisComponent, SarcomaDiagnosisComponent, PielDiagnosisComponent, ColonDiagnosisComponent, UserPacientCreateComponent, ProcedureCreateComponent, DocumentCreateComponent, MamaDiagnosisComponent, EstomagoDiagnosisComponent, TiroidesDiagnosisComponent];

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

