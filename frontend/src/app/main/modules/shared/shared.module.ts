import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileDropdownComponent } from './components/profile-dropdown/profile-dropdown.component';
import { HeroIconModule, logout, star, userCircle, x } from 'ng-heroicon';
import { DialogModule } from '@angular/cdk/dialog';
import { DescriptionDialogComponent } from './components/description-dialog/description-dialog.component';
import { CompleteDialogComponent } from './components/complete-dialog/complete-dialog.component';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';

@NgModule({
  declarations: [
    ProfileDropdownComponent,
    DescriptionDialogComponent,
    CompleteDialogComponent,
    ConfirmationDialogComponent,
  ],
  imports: [
    CommonModule,
    DialogModule,
    HeroIconModule.withIcons(
      {
        userCircle,
        logout,
        x,
        star
      }
    )
  ],
  exports: [
    ProfileDropdownComponent,
    DescriptionDialogComponent,
    CompleteDialogComponent
  ]
})
export class SharedModule { }
