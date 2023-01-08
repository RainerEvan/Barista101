import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecipeRoutingModule } from './recipe-routing.module';
import { CategoryListComponent } from './components/category-list/category-list.component';
import { RecipeListComponent } from './components/recipe-list/recipe-list.component';
import { RecipeDetailComponent } from './components/recipe-detail/recipe-detail.component';
import { SharedModule } from '../../../shared/shared.module';
import { dotsHorizontal, HeroIconModule, star, trash } from 'ng-heroicon';


@NgModule({
  declarations: [
    CategoryListComponent,
    RecipeListComponent,
    RecipeDetailComponent
  ],
  imports: [
    CommonModule,
    RecipeRoutingModule,
    SharedModule,
    HeroIconModule.withIcons(
      {
        dotsHorizontal,
        star,
        trash
      }
    )
  ]
})
export class RecipeModule { }
