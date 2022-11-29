import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { map, Observable } from 'rxjs';
import { Contents } from '../../models/contents';

@Injectable({
  providedIn: 'root'
})
export class ContentService {

  constructor(private apollo:Apollo) { }

  public getAllContentsForModule(moduleId: string): Observable<Contents[]>{
    return this.apollo.watchQuery<any>({
      query: gql`
        query getAllContentsForModule($moduleId:ID!){
          getAllContentsForModule(moduleId: $moduleId){
            id
            title
            body
            module{
              course{
                id
              }
            }
          }
        }
      `, 
      variables: {
        moduleId: moduleId,
      },
    })
      .valueChanges.pipe(map((result)=>result.data.getAllContentsForModule));
  }
}
