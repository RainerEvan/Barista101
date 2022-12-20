import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CourseRoutingModule } from './course-routing.module';
import { CourseListComponent } from './components/course-list/course-list.component';
import { CourseDetailComponent } from './components/course-detail/course-detail.component';
import { bookOpen, HeroIconModule, informationCircle, play } from 'ng-heroicon';
import { ModuleListComponent } from './components/module-list/module-list.component';
import { ModuleContentComponent } from './components/module-content/module-content.component';
import { SharedModule } from '../../../shared/shared.module';
import { CourseProgressComponent } from './components/course-progress/course-progress.component';


@NgModule({
  declarations: [
    CourseListComponent,
    CourseDetailComponent,
    ModuleListComponent,
    ModuleContentComponent,
    CourseProgressComponent,
  ],
  imports: [
    CommonModule,
    CourseRoutingModule,
    SharedModule,
    HeroIconModule.withIcons(
      {
        bookOpen,
        informationCircle,
        play,
      }
    )
  ]
})
export class CourseModule { }
