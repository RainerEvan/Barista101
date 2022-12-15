import { Component, HostListener, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  thumbnail:any;
  imageUrl:any;

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
      equipments: this.formBuilder.array([this.createEquipment()]),
      ingredients: this.formBuilder.array([this.createIngredient()]),
      instructions: this.formBuilder.array([this.createInstruction()]),
      notes: [null, [Validators.required]],
    });
  }

  get equipments(){
    return this.recipeForm.controls['equipments'] as FormArray;
  }
  createEquipment(){
    return this.formBuilder.group({
      item: ['', [Validators.required]]
    });
  }
  addEquipment(){
    this.equipments.push(this.createEquipment());
  }
  deleteEquipment(index:number){
    this.equipments.removeAt(index);
  }

  get ingredients(){
    return this.recipeForm.controls['ingredients'] as FormArray;
  }
  createIngredient(){
    return this.formBuilder.group({
      item: ['', [Validators.required]]
    });
  }
  addIngredient(){
    this.ingredients.push(this.createIngredient());
  }
  deleteIngredient(index:number){
    this.ingredients.removeAt(index);
  }

  get instructions(){
    return this.recipeForm.controls['instructions'] as FormArray;
  }
  createInstruction(){
    return this.formBuilder.group({
      item: ['', [Validators.required]]
    });
  }
  addInstruction(){
    this.instructions.push(this.createInstruction());
  }
  deleteInstruction(index:number){
    this.instructions.removeAt(index);
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

  @HostListener("dragover", ["$event"]) onDragOver(event: any) {
    event.preventDefault();
  }
  @HostListener("dragleave", ["$event"]) onDragLeave(event: any) {
    event.preventDefault();
  }
  @HostListener("drop", ["$event"]) onDrop(event: any) {
    event.preventDefault();
    event.stopPropagation();
    if (event.dataTransfer.files) {
      this.thumbnail = event.dataTransfer.files[0];
      this.previewImage(this.thumbnail);
    }
  }

  onSelectFile(event:any){
    if(event.target.files.length > 0){
      this.thumbnail = event.target.files[0];
      this.previewImage(this.thumbnail);
    }
  }

  previewImage(image:any){
    var reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onload = (_event) => {
      this.imageUrl = reader.result;
    }
  }

  public addRecipe(): void{
    // if(this.recipeForm.valid){
      const formData = this.recipeForm.value;

      console.log(formData);

    //   this.recipeService.addRecipe(formData).subscribe({
    //     next: (result: any) => {
    //       console.log(result);
    //       this.isRecipeFormSubmitted = true;
    //       this.router.navigate(["./recipe"]);
    //     },
    //     error: (error: any) => {
    //       console.log(error);
    //       this.isRecipeFormSubmitted = false;
    //     }
    //   });
    // } 
  }

  resetForm(form: FormGroup){
    form.reset();
  }

}
