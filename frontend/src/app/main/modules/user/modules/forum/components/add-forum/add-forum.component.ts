import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ForumService } from 'src/app/main/services/forum/forum.service';

@Component({
  selector: 'app-add-forum',
  templateUrl: './add-forum.component.html',
  styleUrls: ['./add-forum.component.css']
})
export class AddForumComponent implements OnInit {

  forumForm:FormGroup;
  isForumFormSubmitted:boolean = false;

  constructor(private router:Router, private forumService:ForumService, private formBuilder:FormBuilder) {}

  ngOnInit(): void {
    this.generateForumForm();
  }

  generateForumForm(){
    this.forumForm = this.formBuilder.group({
      accountId: ['01c9dc23-c888-4607-8aa4-15f19efc18f1'],
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
          this.router.navigate(["./forum"]);
        },
        error: (error: any) => {
          console.log(error);
          this.isForumFormSubmitted = false;
        }
      });
    } 
  }

  resetForm(form: FormGroup){
    form.reset();
  }

}
