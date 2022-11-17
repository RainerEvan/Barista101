import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './main/components/not-found/not-found.component';
import { SigninComponent } from './main/components/signin/signin.component';
import { SignupComponent } from './main/components/signup/signup.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./main/modules/user/user.module').then((m) => m.UserModule),
  },
  {
    path: 'admin',
    loadChildren: () => import('./main/modules/admin/admin.module').then((m) => m.AdminModule),
  },
  {
    path: 'signin',
    component: SigninComponent,
  },
  {
    path: 'signup',
    component: SignupComponent,
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
