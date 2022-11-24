import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CourseRoutingModule } from './course-routing.module';
import { CourseListComponent } from './components/course-list/course-list.component';
import { CourseDetailComponent } from './components/course-detail/course-detail.component';
import { bookOpen, chevronLeft, chevronRight, HeroIconModule, informationCircle, play } from 'ng-heroicon';
import { ModuleListComponent } from './components/module-list/module-list.component';
import { ModuleContentComponent } from './components/module-content/module-content.component';


@NgModule({
  declarations: [
    CourseListComponent,
    CourseDetailComponent,
    ModuleListComponent,
    ModuleContentComponent,
  ],
  imports: [
    CommonModule,
    CourseRoutingModule,
    HeroIconModule.withIcons(
      {
        bookOpen,
        informationCircle,
        play,
        chevronLeft,
        chevronRight
      }
    )
  ]
})
export class CourseModule { }
