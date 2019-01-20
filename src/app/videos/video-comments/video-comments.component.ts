import { Component, OnInit, Input } from '@angular/core';
import { CommentsService } from '../comments.service';
import { Video } from '../video';
import { Comment } from '../comment';
import { FormControl, NgModel, NgForm } from '@angular/forms';

@Component({
  selector: 'app-video-comments',
  templateUrl: './video-comments.component.html',
  styleUrls: ['./video-comments.component.scss']
})
export class VideoCommentsComponent implements OnInit {
  @Input("video") video:Video;
  comments:Comment[];

  comment:string;
  test:string;

  constructor(public commentsService:CommentsService) { }

  ngOnInit() {
    this.commentsService.getComments(this.video)
    .subscribe(comments => this.comments = comments)
  }

  sendComment(message){
    let comment:Comment = new Comment();
    comment.message = message;
    comment.videoId = this.video.id;
    this.commentsService.sendComment(comment)
      .subscribe(comment => {
        this.comments.push(comment);
      });
  }

}
