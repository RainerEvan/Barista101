import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryListComponent } from './components/category-list/category-list.component';
import { RecipeDetailComponent } from './components/recipe-detail/recipe-detail.component';
import { RecipeListComponent } from './components/recipe-list/recipe-list.component';

const routes: Routes = [
  {
    path: '',
    component: CategoryListComponent,
  },
  {
    path: 'detail/:id',
    component: RecipeDetailComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecipeRoutingModule { }
