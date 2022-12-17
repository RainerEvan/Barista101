import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotificationRoutingModule } from './notification-routing.module';
import { NotificationListComponent } from './components/notification-list/notification-list.component';
import { HeroIconModule, star } from 'ng-heroicon';


@NgModule({
  declarations: [
    NotificationListComponent
  ],
  imports: [
    CommonModule,
    NotificationRoutingModule,
    HeroIconModule.withIcons(
      {
        star,
      }
    )
  ]
})
export class NotificationModule { }
