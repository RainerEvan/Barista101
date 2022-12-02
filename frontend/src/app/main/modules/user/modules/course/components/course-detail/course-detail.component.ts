import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Courses } from 'src/app/main/models/courses';
import { CourseService } from 'src/app/main/services/course/course.service';
import { environment } from 'src/environments/environment';
import { Dialog } from '@angular/cdk/dialog';
import { DescriptionDialogComponent } from 'src/app/main/modules/shared/components/description-dialog/description-dialog.component';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.css']
})
export class CourseDetailComponent implements OnInit {

  course?:Courses;
  loading:boolean = false;
  thumbnailUrl=environment.apiUrl+"/course/thumbnail/";

  constructor(public dialog:Dialog, private route:ActivatedRoute,private courseService:CourseService) { }

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

  openDescriptionDialog(){
    this.dialog.open(DescriptionDialogComponent, {
      data:{
        title:this.course?.title,
        description:this.course?.description
      }
    });
  }
}
