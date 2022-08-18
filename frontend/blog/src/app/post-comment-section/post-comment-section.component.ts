import { Component, Input, OnInit } from '@angular/core';
import { TextComment } from '../models/TextComment';
import { ApiService } from '../rest-api/api.service';

@Component({
  selector: 'app-post-comment-section',
  templateUrl: './post-comment-section.component.html',
  styleUrls: ['./post-comment-section.component.scss']
})
export class PostCommentSectionComponent implements OnInit {

  @Input()
  postId?: number

  userId?: number

  comments?: TextComment[]

  commentContent?: string

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.updateComments()
    this.api.UserInfo().subscribe(response => this.userId = response.id)
  }

  updateComments() {
    if (this.postId)
      this.api.GetAllComments(this.postId)
        .subscribe(comments => this.comments = comments)
  }

  newComment() {
    if (this.commentContent && this.postId) {
      this.api.AddComment(this.postId, this.commentContent)
        .subscribe(response => {
          this.updateComments()
        })
    }
  }

  deleteComment(commentId: number) {
    this.api.DeleteComment(commentId)
      .subscribe(response => {
        this.updateComments()
      })
  }

}
