import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { ConsultationsMainComponent } from '../consultations/main/main.component';
import { ConsultationsRoutingModule } from './consultations-routing.module';



const COMPONENTS =
  [
    ConsultationsMainComponent,
  ];
const COMPONENTS_DYNAMIC = [];

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

