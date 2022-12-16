import { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-result-dialog',
  templateUrl: './result-dialog.component.html',
  styleUrls: ['./result-dialog.component.css']
})
export class ResultDialogComponent implements OnInit {

  constructor(public dialogRef:DialogRef, @Inject(DIALOG_DATA) public data:any, private router:Router) { }

  ngOnInit(): void {
  }

  okay(){
    this.dialogRef.close();
    this.router.navigate([this.data.link]);
  }

  close(){
    this.dialogRef.close();
  }
}
