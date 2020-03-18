import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { RequestsRoutingModule } from './requests-routing.module';
import { RequestsMainComponent } from './main/main.component';
import { AcceptDialogComponent } from './dialogs/accept/accept.component';
import { RejectDialogComponent } from './dialogs/reject/reject.component';

const COMPONENTS = [RequestsMainComponent ];
const COMPONENTS_DYNAMIC = [AcceptDialogComponent, RejectDialogComponent];


@NgModule({
  imports: [
    SharedModule,
    RequestsRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_DYNAMIC
  ],
  entryComponents: COMPONENTS_DYNAMIC
})
export class RequestsModule { }
