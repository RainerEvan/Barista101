import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Courses } from 'src/app/main/models/courses';
import { CourseService } from 'src/app/main/services/course/course.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.css']
})
export class CourseDetailComponent implements OnInit {

  course?:Courses;
  loading:boolean = false;
  showDescription:boolean = false;
  thumbnailUrl=environment.apiUrl+"/course/thumbnail/";

  constructor(private route:ActivatedRoute,private courseService:CourseService) { }

  ngOnInit(): void {
    this.getCourse();
  }

  public getCourse(){
    const courseId = this.route.snapshot.paramMap.get('id');

    this.loading = true;
    
    if(courseId){
      this.courseService.getCourse(courseId).subscribe({
        next:(response:Courses)=>{
          this.course = response;
          this.loading = false;
        },
        error:(error:any)=>{
            console.log(error);
        }
      });
    }
  }

}
