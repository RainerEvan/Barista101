import { Dialog } from '@angular/cdk/dialog';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ResultDialogComponent } from 'src/app/main/modules/shared/components/result-dialog/result-dialog.component';
import { AccountService } from 'src/app/main/services/account/account.service';
import { AuthService } from 'src/app/main/services/auth/auth.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  accountForm:FormGroup;
  loading:boolean = false;
  isAccountFormSubmitted:boolean = false;

  constructor(public dialog:Dialog, private authService:AuthService, private accountService:AccountService, private formBuilder:FormBuilder) {}

  ngOnInit(): void {
    this.generateAccountForm();
  }

  generateAccountForm(){
    this.accountForm = this.formBuilder.group({
      accountId: [this.authService.accountValue.accountId],
      currPassword: [null,[Validators.required]],
      newPassword: [null,[Validators.required]],
    });
  }

  public editAccount(): void{
    if(this.accountForm.valid){
      const formData = this.accountForm.value;

      this.loading = true;

      this.accountService.editAccount(formData).subscribe({
        next: (response: any) => {
          console.log(response);
          this.loading = false;
          this.isAccountFormSubmitted = true;
          this.openResultDialog(this.isAccountFormSubmitted,"Profile has been updated","./profile");
        },
        error: (error: any) => {
          console.log(error);
          this.loading = false;
          this.isAccountFormSubmitted = false;
          this.openResultDialog(this.isAccountFormSubmitted,"There was a problem",null);
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
