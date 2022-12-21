import { Component, EventEmitter, OnInit, Output } from '@angular/core';
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

  @Output() updateRating = new EventEmitter<boolean>();
  recipeRatingForm:FormGroup;
  stars:boolean[] = [];
  isRecipeRatingFormSubmitted:boolean = false;
  isRecipeRated:boolean = false;
  recipeRatings:RecipeRatings[] = [];
  loading:boolean = false;
  profileImgUrl=environment.apiUrl+"/account/profile-img/";
  accountId = this.authService.accountValue.accountId;

  constructor(private route:ActivatedRoute, private authService:AuthService, private recipeRatingService:RecipeRatingService, private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.getAllRatingsForRecipe();
    this.generateRecipeRatingForm();
  }

  generateRecipeRatingForm(){
    const recipeId = this.route.snapshot.paramMap.get('id');

    this.stars = Array(5).fill(false);

    this.recipeRatingForm = this.formBuilder.group({
      recipeId: [recipeId],
      accountId: [this.accountId],
      rating: [0, [Validators.required]],
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
          if(this.recipeRatings.some(rating => this.accountId.match(rating.account.id))){
            this.isRecipeRated = true;
          }
        },
        error:(error:any)=>{
            console.log(error);
        }
      });
    }
  }

  public addRecipeRating(){
    if(this.recipeRatingForm.valid){
      const formData = this.recipeRatingForm.value;

      this.recipeRatingService.addRecipeRating(formData).subscribe({
        next: (response: any) => {
          console.log(response);
          this.isRecipeRatingFormSubmitted = true;
          this.generateRecipeRatingForm();
          this.updateRating.emit(this.isRecipeRatingFormSubmitted);
          this.getAllRatingsForRecipe();
        },
        error: (error: any) => {
          console.log(error);
          this.isRecipeRatingFormSubmitted = false;
        }
      });
    } 
  }

  rate(rating:number){
    this.recipeRatingForm.controls["rating"].setValue(rating);
    this.stars = this.stars.map((_,i) => rating > i);
  }
}
