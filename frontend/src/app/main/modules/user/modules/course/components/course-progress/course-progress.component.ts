import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Courses } from 'src/app/main/models/courses';
import { Enrollments } from 'src/app/main/models/enrollments';
import { AuthService } from 'src/app/main/services/auth/auth.service';
import { EnrollmentService } from 'src/app/main/services/enrollment/enrollment.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-course-progress',
  templateUrl: './course-progress.component.html',
  styleUrls: ['./course-progress.component.css']
})
export class CourseProgressComponent implements OnInit {

  @Input("course") course:Courses;
  thumbnailUrl=environment.apiUrl+"/course/thumbnail/";
  enrollment:Enrollments;
  loading:boolean = false;

  constructor(private router:Router, private route:ActivatedRoute, private authService:AuthService, private enrollmentService:EnrollmentService) { }

  ngOnInit(): void {
    this.getEnrollmentForCourseAndAccount();
  }

  public getEnrollmentForCourseAndAccount(){
    const courseId = this.course.id;
    const accountId = this.authService.accountValue.accountId;

    this.loading = true;
    
    if(courseId){
      this.enrollmentService.getEnrollmentForCourseAndAccount(courseId, accountId).subscribe({
        next:(response:Enrollments)=>{
          this.enrollment = response;
          this.loading = false;
        },
        error:(error:any)=>{
          console.log(error);
        }
      });
    }
  }

  public addEnrollment(){
    const courseId = this.course.id;
    const accountId = this.authService.accountValue.accountId;

    this.enrollmentService.addEnrollment({courseId,accountId}).subscribe({
      next:(response:any)=>{
        console.log(response);
        this.getEnrollmentForCourseAndAccount();
      },
      error:(error:any)=>{
        console.log(error);
      }
    });
  }

  startCourse()  {
    if(!this.enrollment){
      this.addEnrollment();
    }
    this.router.navigate(['./',this.course.id],{relativeTo:this.route});
  }
}