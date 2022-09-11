import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContentLayoutComponent } from '../../shared/layout/content-layout/content-layout.component';
import { DashboardComponent } from './dashboard.component';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'dashboard/default',
        component: DashboardComponent,
        data: {
          title: "Dashboard",
          breadcrumb: "Dashboard"
        }
      }
    ],
    //  component: ContentLayoutComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
