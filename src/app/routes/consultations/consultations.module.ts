import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { ConsultationsMainComponent } from '../consultations/main/main.component';
import { ConsultationsRoutingModule } from './consultations-routing.module';

// dialogs
import {ResponseComponent} from './dialogs/response/response.component';
import {ViewConsultationComponent} from './dialogs/view/view.component';


const COMPONENTS =
  [
    ConsultationsMainComponent,
  ];
const COMPONENTS_DYNAMIC = [ResponseComponent, ViewConsultationComponent];

@NgModule({
  imports: [
    SharedModule,
    ConsultationsRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_DYNAMIC
  ],
  entryComponents: COMPONENTS_DYNAMIC
})
export class ConsultationsModule { }

