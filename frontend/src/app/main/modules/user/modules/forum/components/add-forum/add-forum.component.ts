import { Dialog } from '@angular/cdk/dialog';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ResultDialogComponent } from 'src/app/main/modules/shared/components/result-dialog/result-dialog.component';
import { AuthService } from 'src/app/main/services/auth/auth.service';
import { ForumService } from 'src/app/main/services/forum/forum.service';

@Component({
  selector: 'app-add-forum',
  templateUrl: './add-forum.component.html',
  styleUrls: ['./add-forum.component.css']
})
export class AddForumComponent implements OnInit {

  forumForm:FormGroup;
  loading:boolean = false;
  isForumFormSubmitted:boolean = false;

  constructor(public dialog:Dialog, private authService:AuthService, private forumService:ForumService, private formBuilder:FormBuilder) {}

  ngOnInit(): void {
    this.generateForumForm();
  }

  generateForumForm(){
    this.forumForm = this.formBuilder.group({
      accountId: [this.authService.accountValue.accountId],
      body: [null, [Validators.required]],
    });
  }

  public addForum(): void{
    if(this.forumForm.valid){
      const formData = this.forumForm.value;

      this.loading = true;

      this.forumService.addForum(formData).subscribe({
        next: (response: any) => {
          console.log(response);
          this.loading = false;
          this.isForumFormSubmitted = true;
          this.openResultDialog(this.isForumFormSubmitted,"Thread has been created","./forum");
        },
        error: (error: any) => {
          console.log(error);
          this.loading = false;
          this.isForumFormSubmitted = false;
          this.openResultDialog(this.isForumFormSubmitted,"There was a problem",null);
        }
      });
    } 
  }

  openResultDialog(success:boolean,description:string,link:string){
    const dialogRef = this.dialog.open(ResultDialogComponent,{
      data:{
        success:success,
        description:description,
        link:link
      }
    });
  }
}
