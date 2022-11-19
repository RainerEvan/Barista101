import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CourseRoutingModule } from './course-routing.module';
import { CourseListComponent } from './components/course-list/course-list.component';
import { CourseDetailComponent } from './components/course-detail/course-detail.component';
import { arrowCircleRight, arrowNarrowRight, bookOpen, HeroIconModule, informationCircle, play } from 'ng-heroicon';


@NgModule({
  declarations: [
    CourseListComponent,
    CourseDetailComponent,
  ],
  imports: [
    CommonModule,
    CourseRoutingModule,
    HeroIconModule.withIcons(
      {
        bookOpen,
        arrowCircleRight,
        informationCircle,
        play
      }
    )
  ]
})
export class CourseModule { }
