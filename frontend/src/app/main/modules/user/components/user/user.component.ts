import { Component, OnInit } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/compat/messaging';
import { AuthDetails } from 'src/app/main/models/authdetails';
import { FcmSubscriptions } from 'src/app/main/models/fcmsubscriptions';
import { AuthService } from 'src/app/main/services/auth/auth.service';
import { FcmsubscriptionService } from 'src/app/main/services/fcmsubscription/fcmsubscription.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  account: AuthDetails;

  constructor(private angularFireMessaging: AngularFireMessaging,private authService:AuthService, private fcmSubscriptionService: FcmsubscriptionService){}

  
  ngOnInit(): void {
    this.account = this.authService.accountValue;
    
    if (this.account){
      this.getAccountFcmToken(this.account.accountId);
      this.receiveMessage();
    }
  }
  
  getAccountFcmToken(accountId:string){
    this.fcmSubscriptionService.getAllFcmSubscriptionsForAccount(accountId).subscribe({
      next: (fcm:FcmSubscriptions[]) => {
        this.requestPermission(fcm);
        console.log("Fcm Token Retrieved!");
      },
      error: (error:any) => {
        console.log(error);
      }
    });
  }
  
  requestPermission(fcmSubscriptions:FcmSubscriptions[]) {
    this.angularFireMessaging.requestToken.subscribe({
      next: (token:any) => {
        console.log("Notification permission granted!", token);

        if(this.checkToken(fcmSubscriptions,token)){
          this.saveToken(token);
        }
      },
      error: (error:any) => {
        console.error('Unable to get permission',error);
      }
    });
  }

  receiveMessage(){
    this.angularFireMessaging.messages.subscribe({
      next:(message:any) => {
        console.log("New message received ", message);
      }
    })
  }

  saveToken(token:any){
    const fcmsubscription = {
      accountId:this.account.accountId,
      token:token
    }

    this.fcmSubscriptionService.addFcmSubscriptions(fcmsubscription).subscribe({
      next:(response:any) => {
        console.log("Fcm token saved successfully", response);
      },
      error: (error:any) => {
        console.log(error);
      }
    })
  }

  checkToken(fcmSubscriptions:any[], token:any):boolean{
    console.log(fcmSubscriptions);
    if(token){
      if(fcmSubscriptions.some(fcmToken => token.match(fcmToken.token))){
        return false;
      } else{
        return true;
      }
    }

    return false;
  }

}
