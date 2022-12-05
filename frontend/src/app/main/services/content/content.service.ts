import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Contents } from '../../models/contents';

const API_URL = environment.apiUrl + "/content";

@Injectable({
  providedIn: 'root'
})
export class ContentService {

  constructor(private http: HttpClient, private apollo:Apollo) { }

  public getAllContentsForModule(moduleId: string): Observable<Contents[]>{
    return this.apollo.watchQuery<any>({
      query: gql`
        query getAllContentsForModule($moduleId:ID!){
          getAllContentsForModule(moduleId: $moduleId){
            id
            title
            body
          }
        }
      `, 
      variables: {
        moduleId: moduleId,
      },
    })
      .valueChanges.pipe(map((result)=>result.data.getAllContentsForModule));
  }
  
  public deleteContent(contentId: string): Observable<any>{
    const params = new HttpParams().set('contentId',contentId);
    return this.http.delete(API_URL+'/delete',{params:params});
  }
}
