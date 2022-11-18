import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SimulationRoutingModule } from './simulation-routing.module';
import { PatternListComponent } from './components/pattern-list/pattern-list.component';


@NgModule({
  declarations: [
    PatternListComponent
  ],
  imports: [
    CommonModule,
    SimulationRoutingModule
  ]
})
export class SimulationModule { }
