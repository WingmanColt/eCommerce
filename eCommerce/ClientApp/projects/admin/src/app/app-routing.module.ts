import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { content } from './shared/routes/content-routes';
import { ContentLayoutComponent } from './shared/layout/content-layout/content-layout.component';
import { LoginComponent } from './components/auth/login/login.component';
import { AuthGuard } from './guards/AuthGuard';
import { DashboardComponent } from './components/dashboard/dashboard.component';

const routes: Routes = [
  {
    path: 'dashboard/default',
    // redirectTo: 'dashboard/default',
    //pathMatch: 'full',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '',
    component: ContentLayoutComponent,
    children: content,
    //canActivate: [AuthGuard]
  },
  {
    path: 'auth/login',
    component: LoginComponent
  },
  /* {
     "path": "home/fashion",
     loadChildren: () => import('../../../user/src/app/app.module').then(mod => mod.AppModule),
   },
   { "path": "", redirectTo: "home/fashion", pathMatch: 'full' },*/
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled',
    relativeLinkResolution: 'legacy'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
