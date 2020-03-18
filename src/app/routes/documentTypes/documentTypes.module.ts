import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { DocumentTypesRoutingModule } from './documentTypes-routing.module';
import { ClientDocumentTypesMainComponent } from './client/main/main.component';
import { AdminDocumentTypesMainComponent } from './admin/main/main.component';

import {CreateAdminDocumentTypeDialogComponent} from './admin/dialogs/create/create.component';
import {EditAdminDocumentTypeDialogComponent} from './admin/dialogs/edit/edit.component';

import {CreateClientDocumentTypeDialogComponent} from './client/dialogs/create/create.component';
import { EditClientDocumentTypeDialogComponent } from './client/dialogs/edit/edit.component';

const COMPONENTS = [AdminDocumentTypesMainComponent, ClientDocumentTypesMainComponent ];
const COMPONENTS_DYNAMIC = [
  CreateAdminDocumentTypeDialogComponent,
  EditAdminDocumentTypeDialogComponent,
  CreateClientDocumentTypeDialogComponent,
  EditClientDocumentTypeDialogComponent
];

@NgModule({
  imports: [
  SharedModule,
  DocumentTypesRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_DYNAMIC
  ],
  entryComponents: COMPONENTS_DYNAMIC
})
export class DocumentTypesModule { }

