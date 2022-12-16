import { Component, OnInit } from '@angular/core';
import { Forums } from 'src/app/main/models/forums';
import { AuthService } from 'src/app/main/services/auth/auth.service';
import { ForumService } from 'src/app/main/services/forum/forum.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-my-forum',
  templateUrl: './my-forum.component.html',
  styleUrls: ['./my-forum.component.css']
})
export class MyForumComponent implements OnInit {

  forums:Forums[] = [];
  loading:boolean = false;
  profileImgUrl=environment.apiUrl+"/account/profileImg/";

  constructor(private authService:AuthService, private forumService:ForumService) { }

  ngOnInit(): void {
    this.getAllforums();
  }

  public getAllforums(){
    const accountId = "998f68ee-df07-4280-8f36-08ab0e645d87";

    this.loading = true;
    
    this.forumService.getAllForumsForAccount(accountId).subscribe({
      next:(response:Forums[])=>{
        this.forums = response;
        this.loading = false;
      },
      error:(error:any)=>{
        console.log(error);
      }
    });
  }

}
