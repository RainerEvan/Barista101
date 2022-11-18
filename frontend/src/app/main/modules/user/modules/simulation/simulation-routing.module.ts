import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PatternListComponent } from './components/pattern-list/pattern-list.component';

const routes: Routes = [
  {
    path: '',
    component: PatternListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SimulationRoutingModule { }
