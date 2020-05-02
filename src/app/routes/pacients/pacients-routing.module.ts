import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PacientsMainComponent } from '../pacients/main/main.component';
import { getProfile } from '../../../assets/data/globals';

const profile = getProfile();

const routes: Routes = [
  { path: '', component: PacientsMainComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PacientsRoutingModule {

}

