import { Component, OnInit } from '@angular/core';
import { Recipes } from 'src/app/main/models/recipes';
import { RecipeService } from 'src/app/main/services/recipe/recipe.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  recipes:Recipes[] = [];
  loading:boolean = false;

  constructor(private recipeService:RecipeService) { }

  ngOnInit(): void {
    this.getAllRecipesForCategory();
  }

  public getAllRecipesForCategory(){
    this.loading = true;
    
    this.recipeService.getAllRecipesForCategory().subscribe({
      next:(response:Recipes[])=>{
        this.recipes = response;
        this.loading = false;
      },
      error:(error:any)=>{
          console.log(error);
      }
    });
  }


}
