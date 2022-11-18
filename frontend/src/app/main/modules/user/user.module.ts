import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './components/user/user.component';
import { HeaderComponent } from './components/header/header.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { academicCap, bell, chatAlt2, chevronDown, clipboardList, HeroIconModule, logout, puzzle, userCircle } from 'ng-heroicon';


@NgModule({
  declarations: [
    UserComponent,
    HeaderComponent,
    NavbarComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    HeroIconModule.withIcons(
      {
        academicCap,
        chatAlt2,
        clipboardList,
        puzzle,
        bell,
        userCircle,
        chevronDown,
        logout
      }
    )
  ]
})
export class UserModule { }
