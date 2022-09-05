import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HistoriePage } from './historie.page';

const routes: Routes = [
  {
    path: '',
    component: HistoriePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HistoriePageRoutingModule {}
