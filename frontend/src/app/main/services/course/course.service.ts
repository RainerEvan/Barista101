import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Courses } from '../../models/courses';

const API_URL = environment.apiUrl + "/course";

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private http: HttpClient, private apollo: Apollo) { }

  public getAllCourses(): Observable<Courses[]>{
    return this.apollo.watchQuery<any>({
      query:gql`
        query getAllCourses{
          getAllCourses{
            id
            title
            description
            modules{
              id
            }
          }
        }
      `,
    })
      .valueChanges.pipe(map((result)=>result.data.getAllCourses));
  }

  public getCourse(courseId: string): Observable<Courses>{
    return this.apollo.watchQuery<any>({
      query: gql`
        query getCourse($courseId:ID!){
          getCourse(courseId: $courseId){
            id
            title
            description
            modules{
              id
            }
          }
        }
      `, 
      variables: {
        courseId: courseId,
      },
    })
      .valueChanges.pipe(map((result)=>result.data.getCourse));
  }
}