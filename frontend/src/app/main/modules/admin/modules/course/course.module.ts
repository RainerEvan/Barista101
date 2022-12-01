import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CourseRoutingModule } from './course-routing.module';
import { CourseListComponent } from './components/course-list/course-list.component';
import { CourseDetailComponent } from './components/course-detail/course-detail.component';
import { ModuleListComponent } from './components/module-list/module-list.component';
import { HeroIconModule, pencil, plus } from 'ng-heroicon';
import { ModuleDetailComponent } from './components/module-detail/module-detail.component';
import { ContentListComponent } from './components/content-list/content-list.component';
import { ContentDetailComponent } from './components/content-detail/content-detail.component';
import { AddCourseComponent } from './components/add-course/add-course.component';
import { AddModuleComponent } from './components/add-module/add-module.component';
import { AddContentComponent } from './components/add-content/add-content.component';


@NgModule({
  declarations: [
    CourseListComponent,
    CourseDetailComponent,
    ModuleListComponent,
    ModuleDetailComponent,
    ContentListComponent,
    ContentDetailComponent,
    AddCourseComponent,
    AddModuleComponent,
    AddContentComponent
  ],
  imports: [
    CommonModule,
    CourseRoutingModule,
    HeroIconModule.withIcons(
      {
        plus,
        pencil
      }
    )
  ]
})
export class CourseModule { }
