import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './common/auth/auth.guard';

import { HomeComponent } from './home/home.component';
import { PrivateComponent } from './private/private.component';
import { NotFoundComponent } from './common/not-found/not-found.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'secret', canActivate: [AuthGuard], component: PrivateComponent },
  { path: '404', component: NotFoundComponent },
  // Must be the last route!
  { path: '**', redirectTo: '/404', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
