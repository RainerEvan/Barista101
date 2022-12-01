import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CourseRoutingModule } from './course-routing.module';
import { CourseListComponent } from './components/course-list/course-list.component';
import { CourseDetailComponent } from './components/course-detail/course-detail.component';
import { bookOpen, star, HeroIconModule, informationCircle, play, x } from 'ng-heroicon';
import { ModuleListComponent } from './components/module-list/module-list.component';
import { ModuleContentComponent } from './components/module-content/module-content.component';
import { ModuleCompletedComponent } from './components/module-completed/module-completed.component';


@NgModule({
  declarations: [
    CourseListComponent,
    CourseDetailComponent,
    ModuleListComponent,
    ModuleContentComponent,
    ModuleCompletedComponent,
  ],
  imports: [
    CommonModule,
    CourseRoutingModule,
    HeroIconModule.withIcons(
      {
        bookOpen,
        informationCircle,
        play,
        star,
        x
      }
    )
  ]
})
export class CourseModule { }
