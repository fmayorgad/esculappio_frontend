import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConsultationsMainComponent } from '../consultations/main/main.component';
import { AuthGuard } from '../../helpers';


const routes: Routes = [
  {
    path: '',
    canActivateChild: [AuthGuard],
    component: ConsultationsMainComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConsultationsRoutingModule {

}

