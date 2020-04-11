import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuestionsMainComponent } from './questions/main/main.component';
import { AuthGuard } from '../../helpers';

const routes: Routes = [
  // {
  //   path: 'usuarios_administrativos',
  //   component: ProfileMainComponent,
  //  // canActivate: [AuthGuard],
  //  // canActivateChild: [AuthGuard],
  //   children: []
  // },
  {
    path: 'organos',
    component: QuestionsMainComponent,
    canActivateChild: [AuthGuard],
    children: []
  },
  {
    path: 'organos/preguntas/:id',
    component: QuestionsMainComponent,
    canActivateChild: [AuthGuard],
    children: []
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsPlatformRoutingModule { }
