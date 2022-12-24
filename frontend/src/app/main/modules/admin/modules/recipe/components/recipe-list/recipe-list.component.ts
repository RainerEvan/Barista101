import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Recipes } from 'src/app/main/models/recipes';
import { RecipeService } from 'src/app/main/services/recipe/recipe.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  @Input("category") category:string = "";
  recipes:Recipes[] = [];
  loading:boolean = false;
  thumbnailUrl=environment.apiUrl+"/recipe/thumbnail/";

  constructor(private route:ActivatedRoute, private recipeService:RecipeService) { }

  ngOnInit(): void {
    if(this.category){
      this.getAllRecipesForCategory();
    }
  }

  public getAllRecipesForCategory(){
    this.loading = true;
    
    this.recipeService.getAllRecipesForCategory(this.category).subscribe({
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
