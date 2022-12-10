import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ForumRoutingModule } from './forum-routing.module';
import { ForumListComponent } from './components/forum-list/forum-list.component';
import { CommentListComponent } from './components/comment-list/comment-list.component';
import { ForumDetailComponent } from './components/forum-detail/forum-detail.component';
import { HeroIconModule, plus } from 'ng-heroicon';
import { AddForumComponent } from './components/add-forum/add-forum.component';


@NgModule({
  declarations: [
    ForumListComponent,
    CommentListComponent,
    ForumDetailComponent,
    AddForumComponent,
  ],
  imports: [
    CommonModule,
    ForumRoutingModule,
    HeroIconModule.withIcons(
      {
        plus,
      }
    )
  ]
})
export class ForumModule { }
