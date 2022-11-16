import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { CourseComponent } from './components/course/course.component';
import { AdminComponent } from './components/admin/admin.component';


@NgModule({
  declarations: [
    AdminComponent,
    CourseComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
