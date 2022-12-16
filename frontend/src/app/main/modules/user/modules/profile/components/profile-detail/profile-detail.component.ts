import { Component, OnInit } from '@angular/core';
import { Accounts } from 'src/app/main/models/accounts';
import { AccountService } from 'src/app/main/services/account/account.service';
import { AuthService } from 'src/app/main/services/auth/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-profile-detail',
  templateUrl: './profile-detail.component.html',
  styleUrls: ['./profile-detail.component.css']
})
export class ProfileDetailComponent implements OnInit {

  account:Accounts;
  loading:boolean = false;
  profileImgUrl=environment.apiUrl+"/account/profileImg/";

  constructor(private authService:AuthService, private accountService:AccountService) { }

  ngOnInit(): void {
    this.getAccount();
  }

  public getAccount(){
    const accountId = "ba1c2d28-6ea5-4dba-a8ae-bf7d4dc5bfe8";

    this.loading = true;
    
    if(accountId){
      this.accountService.getAccount(accountId).subscribe({
        next:(response:Accounts)=>{
          this.account = response;
          this.loading = false;
        },
        error:(error:any)=>{
          console.log(error);
        }
      });
    }
  }

}
