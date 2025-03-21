import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { UsersPageComponent } from './components/users-page/users-page.component';
import { AuthorizedGuard } from './guard/authorized.guard';
import { AnimationComponent } from './components/animation/animation.component';
import { firstResolver } from './first.resolver';

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginPageComponent},
  {path: 'users', component: UsersPageComponent, canActivate: [AuthorizedGuard]},
  {path: 'animation', component: AnimationComponent, resolve: {testResolver: firstResolver}},
  { path: '**', redirectTo: 'login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
