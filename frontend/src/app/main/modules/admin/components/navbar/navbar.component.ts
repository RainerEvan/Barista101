import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  host:{
    "(window:click)":"onClick()"
  }
})
export class NavbarComponent implements OnInit {

  menus:any

  showDropdown:boolean = false;

  constructor() {
    this.menus = [
      {
        label: 'Course',
        link: './course',
      },
      {
        label: 'Forum',
        link: './forum',
      },
      {
        label: 'Recipe',
        link: './recipe',
      },
      {
        label: 'Brew',
        link: './brew',
      },
      {
        label: 'Account',
        link: './account',
      },
    ]
  }

  ngOnInit(): void {
  }

  toggleDropdown(event:any){
    event.stopPropagation();
    this.showDropdown = !this.showDropdown;
  }

  onClick(){
    this.showDropdown = false;
  }

}
