import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpResponse} from '@angular/common/http';
import { Video } from './video';
import { Comment } from './comment';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  private commentsUrl = "app/comments";

  constructor(private http: HttpClient) {

  }

  getComments(video:Video):Observable<Comment[]>{
    return this.http.get<Comment[]>(`${this.commentsUrl}?videoId=${video.id}`);
  }

  sendComment(comment:Comment):Observable<Comment>{
    return this.http.post<Comment>(this.commentsUrl,comment)
  }
}
