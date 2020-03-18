import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { ProyectsSubsidiariesRoutingModule } from './proyects-routing.module';
import { ProyectsMainComponent } from './proyects/main/main.component';
import {SubsidiariesMainComponent} from './subsidiaries/main/main.component';
import {ProyectsDialogsCreateComponent} from './proyects/dialogs/create/create.component';
import {ProyectsDialogsEditComponent} from './proyects/dialogs/edit/edit.component';
import {SubsidiariesDialogsEditComponent} from './subsidiaries/dialogs/edit/edit.component';
import {SubsidiariesDialogsCreateComponent} from './subsidiaries/dialogs/create/create.component';


const COMPONENTS = [ProyectsMainComponent, SubsidiariesMainComponent];
const COMPONENTS_DYNAMIC = [
  ProyectsDialogsCreateComponent,
  SubsidiariesDialogsCreateComponent,
  SubsidiariesDialogsEditComponent,
  ProyectsDialogsEditComponent
];

@NgModule({
  imports: [
  SharedModule,
  ProyectsSubsidiariesRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_DYNAMIC
  ],
  entryComponents: COMPONENTS_DYNAMIC
})
export class ProyectsSubsidiariesModule { }
