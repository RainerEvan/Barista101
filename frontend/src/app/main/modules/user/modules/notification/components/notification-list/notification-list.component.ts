import { Component, OnInit } from '@angular/core';
import { Notifications } from 'src/app/main/models/notifications';
import { NotificationService } from 'src/app/main/services/notification/notification.service';

@Component({
  selector: 'app-notification-list',
  templateUrl: './notification-list.component.html',
  styleUrls: ['./notification-list.component.css']
})
export class NotificationListComponent implements OnInit {

  notifications:Notifications[] = [];
  loading:boolean = false;

  constructor(private notificationService:NotificationService) { }

  ngOnInit(): void {
    this.getAllNotificationsForAccount();
  }

  public getAllNotificationsForAccount(){
    const accountId = "d7ef7ba4-c508-4bd3-ac8b-6bf787b6ca89";

    this.loading = true;
    
    this.notificationService.getAllNotificationsForAccount(accountId).subscribe({
      next:(response:Notifications[])=>{
        this.notifications = response;
        this.loading = false;
      },
      error:(error:any)=>{
        console.log(error);
      }
    });
  }

}
