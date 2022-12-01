import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Courses } from 'src/app/main/models/courses';
import { CourseService } from 'src/app/main/services/course/course.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit {

  courses:Courses[] = [];
  loading:boolean = false;
  thumbnailUrl=environment.apiUrl+"/course/thumbnail/";

  constructor(private courseService:CourseService) { }

  ngOnInit(): void {
    this.getAllCourses();
  }

  public getAllCourses(){
    this.loading = true;
    
    this.courseService.getAllCourses().subscribe({
      next:(response:Courses[])=>{
        this.courses = response;
        this.loading = false;
      },
      error:(error:any)=>{
          console.log(error);
      }
    });
  }

  delete(){
    console.log('delete');
  }
}
