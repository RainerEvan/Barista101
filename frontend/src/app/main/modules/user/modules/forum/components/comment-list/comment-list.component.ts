import { Dialog } from '@angular/cdk/dialog';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ForumComments } from 'src/app/main/models/forumcomments';
import { ConfirmationDialogComponent } from 'src/app/main/modules/shared/components/confirmation-dialog/confirmation-dialog.component';
import { ForumCommentService } from 'src/app/main/services/forum-comment/forum-comment.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.css']
})
export class CommentListComponent implements OnInit {

  forumCommentForm:FormGroup;
  isForumCommentFormSubmitted:boolean = false;
  comments:ForumComments[] = [];
  loading:boolean = false;
  profileImgUrl=environment.apiUrl+"/account/profileImg/";
  showDropdown:boolean = false;

  constructor(public dialog:Dialog, private route:ActivatedRoute, private forumCommentService:ForumCommentService, private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.getAllCommentsForForum();
    this.generateForumCommentForm();
  }

  generateForumCommentForm(){
    const forumId = this.route.snapshot.paramMap.get('id');

    this.forumCommentForm = this.formBuilder.group({
      forumId: [forumId],
      accountId: ['01c9dc23-c888-4607-8aa4-15f19efc18f1'],
      body: [null, [Validators.required]],
    });
  }

  public getAllCommentsForForum(){
    const forumId = this.route.snapshot.paramMap.get('id');

    this.loading = true;
    
    if(forumId){
      this.forumCommentService.getAllCommentsForForum(forumId).subscribe({
        next:(response:ForumComments[])=>{
          this.comments = response;
          this.loading = false;
        },
        error:(error:any)=>{
            console.log(error);
        }
      });
    }
  }

  public addForumComment(): void{
    if(this.forumCommentForm.valid){
      const formData = this.forumCommentForm.value;

      console.log(formData);

      this.forumCommentService.addForumComment(formData).subscribe({
        next: (result: any) => {
          console.log(result);
          this.isForumCommentFormSubmitted = true;
          this.getAllCommentsForForum();
        },
        error: (error: any) => {
          console.log(error);
          this.isForumCommentFormSubmitted = false;
        }
      });
    } 
  }

  deleteForumComment(forumCommentId:string){
    this.forumCommentService.deleteForumComment(forumCommentId).subscribe({
      next:(response:any)=>{
        console.log(response);
        this.getAllCommentsForForum();
      },
      error:(error:any)=>{
        console.log(error);
      }
    });
  }

  openDeleteDialog(forumCommentId:string){
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data:{
        title:"Delete Comment",
        description:"Are you sure you want to delete this comment?"
      }
    });

    dialogRef.closed.subscribe((confirm) => {
      if(confirm){
        this.deleteForumComment(forumCommentId);
      }
    });
  }

  toggleDropdown(event:any){
    event.stopPropagation();
    this.showDropdown = !this.showDropdown;
  }

  onClick(){
    this.showDropdown = false;
  }

}
