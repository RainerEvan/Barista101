import { Dialog } from '@angular/cdk/dialog';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/main/services/auth/auth.service';
import { ConfirmationDialogComponent } from '../../../shared/components/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  host:{
    "(window:click)":"onClick()"
  }
})
export class HeaderComponent implements OnInit {

  showDropdown:boolean = false;

  constructor(public dialog:Dialog, private authService:AuthService) {}

  ngOnInit(): void {
  }

  toggleDropdown(event:any){
    event.stopPropagation();
    this.showDropdown = !this.showDropdown;
  }

  onClick(){
    this.showDropdown = false;
  }

  openSignoutDialog(){
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data:{
        title:"Signout",
        description:"Are you sure you want to signout?"
      }
    });

    dialogRef.closed.subscribe((confirm) => {
      if(confirm){
        this.authService.signout();
      }
    });
  }

}
