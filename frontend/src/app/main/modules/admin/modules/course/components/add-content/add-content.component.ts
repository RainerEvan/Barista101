import { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContentService } from 'src/app/main/services/content/content.service';

@Component({
  selector: 'app-add-content',
  templateUrl: './add-content.component.html',
  styleUrls: ['./add-content.component.css']
})
export class AddContentComponent implements OnInit {

  contentForm:FormGroup;
  isContentFormSubmitted:boolean = false;

  constructor(public dialogRef:DialogRef, @Inject(DIALOG_DATA) public data:any, private contentService:ContentService, private formBuilder:FormBuilder) {}

  ngOnInit(): void {
    this.generateContentForm();
  }

  generateContentForm(){
    this.contentForm = this.formBuilder.group({
      moduleId: [this.data.moduleId],
      title: [null, [Validators.required]],
      body: [null, [Validators.required]],
    });
  }

  public addContent(): void{
    if(this.contentForm.valid){
      const formData = this.contentForm.value;

      this.contentService.addContent(formData).subscribe({
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

  resetForm(form: FormGroup){
    form.reset();
  }

  closeDialog(){
    this.dialogRef.close();
  }

}
