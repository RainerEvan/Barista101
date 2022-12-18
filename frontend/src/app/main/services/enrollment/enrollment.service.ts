import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Enrollments } from '../../models/enrollments';

const API_URL = environment.apiUrl + "/enrollment";

@Injectable({
  providedIn: 'root'
})
export class EnrollmentService {

  constructor(private http: HttpClient, private apollo: Apollo) { }

  public getAllEnrollmentsForAccount(accountId: string): Observable<Enrollments[]>{
    return this.apollo.watchQuery<any>({
      query: gql`
        query getAllEnrollmentsForAccount($accountId:ID!){
          getAllEnrollmentsForAccount(accountId: $accountId){
            id
            account{
              id
            }
            course{
              id
            }
            progress
          }
        }
      `, 
      variables: {
        accountId: accountId,
      },
    })
      .valueChanges.pipe(map((result)=>result.data.getAllEnrollmentsForAccount));
  }

  public getEnrollment(enrollmentId: string): Observable<Enrollments>{
    return this.apollo.watchQuery<any>({
      query: gql`
        query getEnrollment($enrollmentId:ID!){
          getEnrollment(enrollmentId: $enrollmentId){
            id
            account{
              id
            }
            course{
              id
            }
            startDate
            endDate
            moduleStatus
            progress
          }
        }
      `, 
      variables: {
        enrollmentId: enrollmentId,
      },
    })
      .valueChanges.pipe(map((result)=>result.data.getEnrollment));
  }

  public addErollment(formData: FormData): Observable<any>{
    return this.http.post(API_URL+'/add',formData);
  }

  public finishModule(formData: FormData): Observable<any>{
    return this.http.post(API_URL+'/finish-module',formData);
  }
}
