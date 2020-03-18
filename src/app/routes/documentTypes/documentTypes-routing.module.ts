import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientDocumentTypesMainComponent } from './client/main/main.component';
import { AdminDocumentTypesMainComponent } from './admin/main/main.component';
import { AuthGuard } from 'app/helpers';

const routes: Routes = [
  {
    path: 'tipos_documento_disponibles',
    component: AdminDocumentTypesMainComponent,
    canActivateChild: [AuthGuard],
    children: []
  },
  {
    path: 'tipos_documento_listado',
    component: ClientDocumentTypesMainComponent,
    canActivateChild: [AuthGuard],
    children: []
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DocumentTypesRoutingModule { }

