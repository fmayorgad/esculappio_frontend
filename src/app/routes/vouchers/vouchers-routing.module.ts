import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VouchersMainComponent } from './main/main.component';


const routes: Routes = [
  { path: '', component: VouchersMainComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VouchersRoutingModule {
}
