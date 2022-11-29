import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CourseRoutingModule } from './course-routing.module';
import { CourseListComponent } from './components/course-list/course-list.component';
import { CourseDetailComponent } from './components/course-detail/course-detail.component';
import { ModuleListComponent } from './components/module-list/module-list.component';
import { HeroIconModule, plus } from 'ng-heroicon';
import { ModuleContentComponent } from './components/module-content/module-content.component';


@NgModule({
  declarations: [
    CourseListComponent,
    CourseDetailComponent,
    ModuleListComponent,
    ModuleContentComponent
  ],
  imports: [
    CommonModule,
    CourseRoutingModule,
    HeroIconModule.withIcons(
      {
        plus
      }
    )
  ]
})
export class CourseModule { }
