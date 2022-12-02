import { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-complete-dialog',
  templateUrl: './complete-dialog.component.html',
  styleUrls: ['./complete-dialog.component.css']
})
export class CompleteDialogComponent implements OnInit {

  constructor(public dialogRef:DialogRef, @Inject(DIALOG_DATA) public data:any, private router:Router) { }

  ngOnInit(): void {
  }

  continue(){
    this.dialogRef.close();
    this.router.navigate(["./course/"+this.data.courseId]);
  }
}
