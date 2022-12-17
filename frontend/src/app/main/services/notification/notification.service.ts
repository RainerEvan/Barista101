import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Notifications } from '../../models/notifications';

const API_URL = environment.apiUrl + "/notification";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private http: HttpClient, private apollo: Apollo) { }

  public getAllNotificationsForAccount(accountId: string): Observable<Notifications[]>{
    return this.apollo.watchQuery<any>({
      query: gql`
        query getAllNotificationsForAccount($accountId:ID!){
          getAllNotificationsForAccount(accountId: $accountId){
            id
            receiver{
              id
              username
            }
            body
            data
            createdAt
            isRead
          }
        }
      `, 
      variables: {
        accountId: accountId,
      },
    })
      .valueChanges.pipe(map((result)=>result.data.getAllNotificationsForAccount));
  }

  public addNotification(formData: FormData): Observable<any>{
    return this.http.post(API_URL+'/add',formData);
  }
}
