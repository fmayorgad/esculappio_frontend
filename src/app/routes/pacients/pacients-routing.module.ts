import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PacientsMainComponent } from '../pacients/main/main.component';
import { getProfile } from '../../../assets/data/globals';
import { AuthGuard } from '../../helpers';
import { PacientResolverService } from './treatments/resolver';
import { TreatmentsMainComponent } from './treatments/main.component';
import { PaymentsMainComponent } from './payments/main.component';


const routes: Routes = [
  {
    path: '',
    component: PacientsMainComponent,
  },
  {
    path: ':id/tratamientos',
    resolve: { item: PacientResolverService },
    component: TreatmentsMainComponent,
  },
  {
    path: ':id/pagos',
    resolve: { item: PacientResolverService },
    component: PaymentsMainComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PacientsRoutingModule {

}

