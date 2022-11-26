import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileDropdownComponent } from './components/profile-dropdown/profile-dropdown.component';
import { HeroIconModule, logout, userCircle } from 'ng-heroicon';



@NgModule({
  declarations: [
    ProfileDropdownComponent
  ],
  imports: [
    CommonModule,
    HeroIconModule.withIcons(
      {
        userCircle,
        logout
      }
    )
  ],
  exports: [
    ProfileDropdownComponent,
    
  ]
})
export class SharedModule { }
