import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RevenueDialogsCreateComponent } from './dialogs/create/create.component';
import { RevenueMainComponent } from './main/main.component';

const routes: Routes = [
  {
    path: '',
    component: RevenueMainComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RevenueRoutingModule {
}
