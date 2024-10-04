import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'create-view',
    loadChildren: () => import('./biller/biller.module').then(m => m.BillerModule)
  },
  {
    path: '**',
    redirectTo: 'create-view',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
