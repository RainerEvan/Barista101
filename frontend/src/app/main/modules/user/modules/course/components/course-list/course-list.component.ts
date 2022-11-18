import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit {

  image:any;

  constructor(private domSanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.image = 'https://www.pexels.com/photo/coffee-beans-1695052/';
  }

}
