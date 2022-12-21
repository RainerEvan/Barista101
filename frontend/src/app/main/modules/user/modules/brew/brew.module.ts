import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BrewRoutingModule } from './brew-routing.module';
import { BrewListComponent } from './components/brew-list/brew-list.component';
import { BrewDetailComponent } from './components/brew-detail/brew-detail.component';
import { SharedModule } from '../../../shared/shared.module';
import { chevronDoubleUp, HeroIconModule } from 'ng-heroicon';


@NgModule({
  declarations: [
    BrewListComponent,
    BrewDetailComponent
  ],
  imports: [
    CommonModule,
    BrewRoutingModule,
    SharedModule,
    HeroIconModule.withIcons(
      {
        chevronDoubleUp
      }
    )
  ]
})
export class BrewModule { }
