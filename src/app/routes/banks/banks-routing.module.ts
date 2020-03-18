import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BanksMainComponent } from './main/main.component';


const routes: Routes = [
  { path: 'bancos',},
  { path: '', component: BanksMainComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BanksRoutingModule { }
