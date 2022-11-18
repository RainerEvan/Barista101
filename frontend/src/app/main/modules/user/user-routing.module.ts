import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './components/user/user.component';

const routes: Routes = [
  {
    path: '',
    component: UserComponent,
    children: [
      {
        path: '',
        redirectTo: 'course',
        pathMatch: 'full'
      },
      {
        path: 'course',
        loadChildren: () => import('./modules/course/course.module').then((m) => m.CourseModule),
      },
      {
        path: 'forum',
        loadChildren: () => import('./modules/forum/forum.module').then((m) => m.ForumModule),
      },
      {
        path: 'recipe',
        loadChildren: () => import('./modules/recipe/recipe.module').then((m) => m.RecipeModule),
      },
      {
        path: 'simulation',
        loadChildren: () => import('./modules/simulation/simulation.module').then((m) => m.SimulationModule),
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
