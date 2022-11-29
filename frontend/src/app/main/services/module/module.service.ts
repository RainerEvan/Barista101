import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { map, Observable } from 'rxjs';
import { Modules } from '../../models/modules';

@Injectable({
  providedIn: 'root'
})
export class ModuleService {

  constructor(private apollo:Apollo) { }

  public getAllModulesForCourse(courseId: string): Observable<Modules[]>{
    return this.apollo.watchQuery<any>({
      query: gql`
        query getAllModulesForCourse($courseId:ID!){
          getAllModulesForCourse(courseId: $courseId){
            id
            title
          }
        }
      `, 
      variables: {
        courseId: courseId,
      },
    })
      .valueChanges.pipe(map((result)=>result.data.getAllModulesForCourse));
  }
}
