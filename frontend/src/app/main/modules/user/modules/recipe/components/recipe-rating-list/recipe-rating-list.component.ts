import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RecipeRatings } from 'src/app/main/models/reciperatings';
import { AuthService } from 'src/app/main/services/auth/auth.service';
import { RecipeRatingService } from 'src/app/main/services/recipe-rating/recipe-rating.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-recipe-rating-list',
  templateUrl: './recipe-rating-list.component.html',
  styleUrls: ['./recipe-rating-list.component.css']
})
export class RecipeRatingListComponent implements OnInit {

  recipeRatingForm:FormGroup;
  isRecipeRatingFormSubmitted:boolean = false;
  recipeRatings:RecipeRatings[] = [];
  loading:boolean = false;
  profileImgUrl=environment.apiUrl+"/account/profile-img/";
  accountId = this.authService.accountValue.accountId;

  constructor(private route:ActivatedRoute, private authService:AuthService, private recipeRatingService:RecipeRatingService, private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.getAllRatingsForRecipe();
    this.generaterecipeRatingForm();
  }

  generaterecipeRatingForm(){
    const recipeId = this.route.snapshot.paramMap.get('id');

    this.recipeRatingForm = this.formBuilder.group({
      recipeId: [recipeId],
      accountId: [this.accountId],
      body: [null, [Validators.required]],
    });
  }

  public getAllRatingsForRecipe(){
    const recipeId = this.route.snapshot.paramMap.get('id');

    this.loading = true;
    
    if(recipeId){
      this.recipeRatingService.getAllRatingsForRecipe(recipeId).subscribe({
        next:(response:RecipeRatings[])=>{
          this.recipeRatings = response;
          this.loading = false;
        },
        error:(error:any)=>{
            console.log(error);
        }
      });
    }
  }

  public addRecipeRating(): void{
    if(this.recipeRatingForm.valid){
      const formData = this.recipeRatingForm.value;

      console.log(formData);

      this.recipeRatingService.addRecipeRating(formData).subscribe({
        next: (result: any) => {
          console.log(result);
          this.isRecipeRatingFormSubmitted = true;
          this.getAllRatingsForRecipe();
        },
        error: (error: any) => {
          console.log(error);
          this.isRecipeRatingFormSubmitted = false;
        }
      });
    } 
  }

}
