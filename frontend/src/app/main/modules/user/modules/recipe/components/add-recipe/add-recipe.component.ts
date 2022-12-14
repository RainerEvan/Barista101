import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RecipeCategories } from 'src/app/main/models/recipecategories';
import { RecipeCategoryService } from 'src/app/main/services/recipe-category/recipe-category.service';
import { RecipeService } from 'src/app/main/services/recipe/recipe.service';

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.css']
})
export class AddRecipeComponent implements OnInit {

  recipeForm:FormGroup;
  categories:RecipeCategories[]=[];
  loading:boolean = false;
  isRecipeFormSubmitted:boolean = false;

  constructor(private router:Router, private recipeService:RecipeService, private recipeCategoryService:RecipeCategoryService, private formBuilder:FormBuilder) {}

  ngOnInit(): void {
    this.generateRecipeForm();
    this.getAllRecipeCategories();
  }

  generateRecipeForm(){
    this.recipeForm = this.formBuilder.group({
      recipeCategoryId: [null, [Validators.required]],
      accountId: ['01c9dc23-c888-4607-8aa4-15f19efc18f1'],
      title: [null, [Validators.required]],
      description: [null, [Validators.required]],
      equipments: [null, [Validators.required]],
      ingredients: [null, [Validators.required]],
      instructions: [null, [Validators.required]],
      notes: [null, [Validators.required]],
    });
  }

  public getAllRecipeCategories(){
    this.loading = true;
    
    this.recipeCategoryService.getAllRecipeCategories().subscribe({
      next:(response:RecipeCategories[])=>{
        this.categories = response;
        this.loading = false;
      },
      error:(error:any)=>{
        console.log(error);
      }
    });
  }

  public addRecipe(): void{
    if(this.recipeForm.valid){
      const formData = this.recipeForm.value;

      this.recipeService.addRecipe(formData).subscribe({
        next: (result: any) => {
          console.log(result);
          this.isRecipeFormSubmitted = true;
          this.router.navigate(["./recipe"]);
        },
        error: (error: any) => {
          console.log(error);
          this.isRecipeFormSubmitted = false;
        }
      });
    } 
  }

  resetForm(form: FormGroup){
    form.reset();
  }

}
