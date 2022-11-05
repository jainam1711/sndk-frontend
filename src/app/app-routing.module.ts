import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Guards
import { AuthGuard } from 'src/app/shared/guards/auth-guard.service';

const routes: Routes = [{
  path: '',
  loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule),
}, {
  path: '',
  loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
  canActivate: [AuthGuard],
}, {
  path: '**',
  redirectTo: '',
}];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'top', initialNavigation: 'enabled'
  })],
  exports: [RouterModule],
})
export class AppRoutingModule { }
