import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ForumRoutingModule } from './forum-routing.module';
import { ForumListComponent } from './components/forum-list/forum-list.component';
import { CommentListComponent } from './components/comment-list/comment-list.component';
import { ForumDetailComponent } from './components/forum-detail/forum-detail.component';
import { dotsHorizontal, HeroIconModule, plus, trash } from 'ng-heroicon';
import { AddForumComponent } from './components/add-forum/add-forum.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../../shared/shared.module';


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
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    HeroIconModule.withIcons(
      {
        plus,
        dotsHorizontal,
        trash
      }
    )
  ]
})
export class ForumModule { }
