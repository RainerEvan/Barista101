import { Component, OnInit } from '@angular/core';
import { Brews } from 'src/app/main/models/brews';
import { BrewService } from 'src/app/main/services/brew/brew.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-brew-list',
  templateUrl: './brew-list.component.html',
  styleUrls: ['./brew-list.component.css']
})
export class BrewListComponent implements OnInit {

  brews:Brews[] = [];
  loading:boolean = false;
  thumbnailUrl=environment.apiUrl+"/brew/thumbnail/";

  constructor(private brewService:BrewService) { }

  ngOnInit(): void {
    this.getAllBrews();
  }

  public getAllBrews(){
    this.loading = true;
    
    // this.brewService.getAllBrews().subscribe({
    //   next:(response:brews[])=>{
    //     this.brews = response;
    //     this.loading = false;
    //   },
    //   error:(error:any)=>{
    //       console.log(error);
    //   }
    // });
  }

}
