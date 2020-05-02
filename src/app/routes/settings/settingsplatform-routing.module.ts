import { NgModule, Injectable } from '@angular/core';
import { Routes, RouterModule, Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { OrgansMainComponent } from './questions/main/main.component';
import { UsersAdminMainComponent } from './users/main.component';
import { QuestionsMainComponent } from './questions/questions/main.component';
import { AuthGuard } from '../../helpers';
import { APIResolver } from '../../services/configuration/questions/questionsService';
import { QuestionResolverService } from './questions/questions/question-resolver.service';

const routes: Routes = [
  {
    path: 'organos',
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    children: [
      {
        path: '',
        component: OrgansMainComponent
      },
      {
        path: ':id/preguntas',
        resolve: { item: QuestionResolverService },
        component: QuestionsMainComponent,
      },
    ]
  },

  {
    path: 'usuarios_administrativos',
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    component: UsersAdminMainComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsPlatformRoutingModule { }

