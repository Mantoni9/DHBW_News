import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'ergebnis',
    loadChildren: () => import('./ergebnis/ergebnis.module').then( m => m.ErgebnisPageModule)
  },
  {
    path: 'historie',
    loadChildren: () => import('./historie/historie.module').then( m => m.HistoriePageModule)
  },
  {
    path: 'hilfe',
    loadChildren: () => import('./hilfe/hilfe.module').then( m => m.HilfePageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
