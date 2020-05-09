import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConsultationsMainComponent } from '../consultations/main/main.component';

const routes: Routes = [
  { path: '', component: ConsultationsMainComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConsultationsRoutingModule {

}

