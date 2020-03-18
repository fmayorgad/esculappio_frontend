import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BankAccountsModuleMainComponent } from './components/main/main.component';

const routes: Routes = [
  { path: '', component: BankAccountsModuleMainComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BankAccountsRoutingModule { }
