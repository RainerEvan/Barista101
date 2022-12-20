import { Component, OnInit } from '@angular/core';
import { Courses } from 'src/app/main/models/courses';
import { Enrollments } from 'src/app/main/models/enrollments';
import { AuthService } from 'src/app/main/services/auth/auth.service';
import { CourseService } from 'src/app/main/services/course/course.service';
import { EnrollmentService } from 'src/app/main/services/enrollment/enrollment.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit {

  courses:Courses[] = [];
  enrollments:Enrollments[] = [];
  loading:boolean = false;
  thumbnailUrl=environment.apiUrl+"/course/thumbnail/";

  constructor(private authService:AuthService, private courseService:CourseService, private enrollmentService:EnrollmentService) { }

  ngOnInit(): void {
    console.log(this.thumbnailUrl);
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

  public getAllEnrollmentsForAccount(){
    const accountId = this.authService.accountValue.accountId;

    this.loading = true;
    
    this.enrollmentService.getAllEnrollmentsForAccount(accountId).subscribe({
      next:(response:Enrollments[])=>{
        this.enrollments = response;
        this.loading = false;
      },
      error:(error:any)=>{
          console.log(error);
      }
    });
  }

}
