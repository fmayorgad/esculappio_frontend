import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SchoolsModuleMainComponent } from './components/main/main.component';
import { AuthGuard } from '../../helpers';

const routes: Routes = [
  {
    path: '', component: SchoolsModuleMainComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SchoolsRoutingModule { }
