import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // {
  //   path:'',
  //   redirectTo: 'dashboard',
  //   pathMatch: 'full'
  // },
  // {
  //   path:'login', 
  //   component: ,
  // },
  // {
  //   path:'', 
  //   component: , 
  //   canActivate:,
  //   children:[
  //     {
  //       path:'dashboard', 
  //       component: ,
  //       canActivate:
  //     },
  //   ]
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
