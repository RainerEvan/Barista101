import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Accounts } from 'src/app/main/models/accounts';
import { AccountService } from 'src/app/main/services/account/account.service';
import { AuthService } from 'src/app/main/services/auth/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  account:Accounts;
  accountForm:FormGroup;
  isaccountFormSubmitted:boolean = false;
  thumbnail:any;
  imageUrl:any;

  constructor(private router:Router, private authService:AuthService, private accountService:AccountService, private formBuilder:FormBuilder) {
    this.account = this.router.getCurrentNavigation().extras.state;
  }

  ngOnInit(): void {
    console.log(this.account);
    this.generateAccountForm();
    this.imageUrl = environment.apiUrl+"/account/profileImg/"+this.account.id;
  }

  generateAccountForm(){
    this.accountForm = this.formBuilder.group({
      accountId: ['01c9dc23-c888-4607-8aa4-15f19efc18f1'],
      fullname: [null],
      username: [null],
      email: [null]
    });
  }

  public editAccount(): void{
    if(this.accountForm.valid){
      const formData = this.accountForm.value;

      this.accountService.editAccount(formData).subscribe({
        next: (result: any) => {
          console.log(result);
          this.isaccountFormSubmitted = true;
          this.router.navigate(["./account"]);
        },
        error: (error: any) => {
          console.log(error);
          this.isaccountFormSubmitted = false;
        }
      });
    } 
  }

  onSelectFile(event:any){
    if(event.target.files.length > 0){
      this.thumbnail = event.target.files[0];
      this.previewImage(this.thumbnail);
    }
  }

  previewImage(image:any){
    var reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onload = (_event) => {
      this.imageUrl = reader.result;
    }
  }

}
