import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RequestsMainComponent } from './main/main.component';


const routes: Routes = [
  { path: '', component: RequestsMainComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RequestsRoutingModule { }
