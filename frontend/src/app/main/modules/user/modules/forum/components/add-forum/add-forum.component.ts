import { Dialog } from '@angular/cdk/dialog';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ResultDialogComponent } from 'src/app/main/modules/shared/components/result-dialog/result-dialog.component';
import { ForumService } from 'src/app/main/services/forum/forum.service';

@Component({
  selector: 'app-add-forum',
  templateUrl: './add-forum.component.html',
  styleUrls: ['./add-forum.component.css']
})
export class AddForumComponent implements OnInit {

  forumForm:FormGroup;
  isForumFormSubmitted:boolean = false;

  constructor(public dialog:Dialog, private forumService:ForumService, private formBuilder:FormBuilder) {}

  ngOnInit(): void {
    this.generateForumForm();
  }

  generateForumForm(){
    this.forumForm = this.formBuilder.group({
      accountId: ['998f68ee-df07-4280-8f36-08ab0e645d87'],
      title: [null, [Validators.required]],
      body: [null, [Validators.required]],
    });
  }

  public addForum(): void{
    if(this.forumForm.valid){
      const formData = this.forumForm.value;

      this.forumService.addForum(formData).subscribe({
        next: (result: any) => {
          console.log(result);
          this.isForumFormSubmitted = true;
          this.openResultDialog(this.isForumFormSubmitted,"Thread has been created","./forum");
        },
        error: (error: any) => {
          console.log(error);
          this.isForumFormSubmitted = false;
          this.openResultDialog(this.isForumFormSubmitted,"There was a problem",null);
        }
      });
    } 
  }

  resetForm(form: FormGroup){
    form.reset();
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
