import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.css']
})
export class CourseDetailComponent implements OnInit {

  thumbnail:any;

  constructor(private domSanitizer:DomSanitizer) { }

  ngOnInit(): void {
    this.thumbnail = this.domSanitizer.bypassSecurityTrustResourceUrl('https://images.pexels.com/photos/1695052/pexels-photo-1695052.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1');
  }

}
