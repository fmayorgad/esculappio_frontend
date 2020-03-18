import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProyectsMainComponent } from './proyects/main/main.component';
import { SubsidiariesMainComponent } from './subsidiaries/main/main.component';
import { AuthGuard } from 'app/helpers';

const routes: Routes = [
  {
    path: 'proyectos_proyectos',
    component: ProyectsMainComponent,
    canActivateChild: [AuthGuard],
    children: []
  },
  {
    path: 'proyectos_sedes',
    component: SubsidiariesMainComponent,
    canActivateChild: [AuthGuard],
    children: []
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProyectsSubsidiariesRoutingModule { }
