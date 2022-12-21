import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BrewRoutingModule } from './brew-routing.module';
import { BrewListComponent } from './components/brew-list/brew-list.component';
import { BrewDetailComponent } from './components/brew-detail/brew-detail.component';


@NgModule({
  declarations: [
    BrewListComponent,
    BrewDetailComponent
  ],
  imports: [
    CommonModule,
    BrewRoutingModule
  ]
})
export class BrewModule { }
