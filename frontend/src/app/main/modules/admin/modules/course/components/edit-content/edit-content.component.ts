import { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContentService } from 'src/app/main/services/content/content.service';

@Component({
  selector: 'app-edit-content',
  templateUrl: './edit-content.component.html',
  styleUrls: ['./edit-content.component.css']
})
export class EditContentComponent implements OnInit {

  contentForm:FormGroup;
  isContentFormSubmitted:boolean = false;

  constructor(public dialogRef:DialogRef, @Inject(DIALOG_DATA) public data:any, private contentService:ContentService, private formBuilder:FormBuilder) {}

  ngOnInit(): void {
    this.generateContentForm();
  }

  generateContentForm(){
    this.contentForm = this.formBuilder.group({
      title: [this.data.content.title, [Validators.required]],
      body: [this.data.content.body, [Validators.required]],
    });
  }

  public editContent(): void{
    if(this.contentForm.valid){
      const formData = new FormData();
      const content = this.contentForm.value;

      formData.append('contentId', new Blob([JSON.stringify(this.data.content.id)], {type:"application/json"}));
      formData.append('content', new Blob([JSON.stringify(content)], {type:"application/json"}));

      this.contentService.editContent(formData).subscribe({
        next: (result: any) => {
          console.log(result);
          this.isContentFormSubmitted = true;
          this.dialogRef.close(this.isContentFormSubmitted);
        },
        error: (error: any) => {
          console.log(error);
          this.isContentFormSubmitted = false;
          this.dialogRef.close(this.isContentFormSubmitted);
        }
      });
    } 
  }

  closeDialog(){
    this.dialogRef.close();
  }

}
