import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RecipeCategories } from '../../models/recipecategories';

const API_URL = environment.apiUrl + "/recipe-category";

@Injectable({
  providedIn: 'root'
})
export class RecipeCategorieservice {

  constructor(private http: HttpClient, private apollo: Apollo) { }

  public getAllRecipeCategories(): Observable<RecipeCategories[]>{
    return this.apollo.watchQuery<any>({
      query:gql`
        query getAllRecipeCategories{
          getAllRecipeCategories{
            id
            name
          }
        }
      `,
    })
      .valueChanges.pipe(map((result)=>result.data.getAllRecipeCategories));
  }

  public addRecipeCategory(formData: FormData): Observable<any>{
    return this.http.post(API_URL+'/add',formData);
  }
  
  public deleteRecipeCategory(recipeCategoryId: string): Observable<any>{
    const params = new HttpParams().set('recipeCategoryId',recipeCategoryId);
    return this.http.delete(API_URL+'/delete',{params:params});
  }
}
