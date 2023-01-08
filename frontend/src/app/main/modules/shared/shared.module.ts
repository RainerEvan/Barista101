import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { academicCap, checkCircle, chevronLeft, HeroIconModule, logout, userCircle, x, xCircle } from 'ng-heroicon';
import { DialogModule } from '@angular/cdk/dialog';
import { DescriptionDialogComponent } from './components/description-dialog/description-dialog.component';
import { CompleteDialogComponent } from './components/complete-dialog/complete-dialog.component';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { ResultDialogComponent } from './components/result-dialog/result-dialog.component';
import { BackNavigationComponent } from './components/back-navigation/back-navigation.component';
import { LoadingDialogComponent } from './components/loading-dialog/loading-dialog.component';

@NgModule({
  declarations: [
    DescriptionDialogComponent,
    CompleteDialogComponent,
    ConfirmationDialogComponent,
    ResultDialogComponent,
    BackNavigationComponent,
    LoadingDialogComponent,
  ],
  imports: [
    CommonModule,
    DialogModule,
    HeroIconModule.withIcons(
      {
        userCircle,
        checkCircle,
        logout,
        x,
        xCircle,
        academicCap,
        chevronLeft
      }
    )
  ],
  exports: [
    DescriptionDialogComponent,
    CompleteDialogComponent,
    ConfirmationDialogComponent,
    ResultDialogComponent,
    BackNavigationComponent,
    LoadingDialogComponent,
  ]
})
export class SharedModule { }
