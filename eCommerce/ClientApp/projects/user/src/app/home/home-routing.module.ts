import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FashionOneComponent } from './fashion/fashion-one/fashion-one.component';

const routes: Routes = [
  {
    path: '',
    component: FashionOneComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
