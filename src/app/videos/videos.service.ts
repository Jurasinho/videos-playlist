import { Injectable } from '@angular/core';

import { Observable, throwError, of } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpResponse} from '@angular/common/http';
import { Video } from './video';
@Injectable({
  providedIn: 'root'
})
export class VideosService {
  private videosUrl = "http://localhost:3000/api/videos";

  constructor(private http: HttpClient) {

  }

  initializeVideo():Video{
    return new Video();
  }

  getVideo(slug:string):Observable<Video>{
    if(slug==="0"){
      return of(this.initializeVideo());
    }
    return this.http.get<Video>(`${this.videosUrl}/${slug}`)
    .pipe(
      tap(data => console.log('All: ' + JSON.stringify(data))),
      catchError(this.handleError)
    );
  }
  getVideos():Observable<Video[]>{
    return this.http.get<Video[]>(`${this.videosUrl}`)
    .pipe(
      tap(data => console.log('All: ' + JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  createVideo(video:Video):Observable<Video>{
    const headers = new HttpHeaders({'Content-Type' : 'application/json'})
    return this.http.post(this.videosUrl, video, {headers:headers})
    .pipe(
      tap(data => console.log('All: ' + JSON.stringify(data))),
      map(()=>video),
      catchError(this.handleError)
    )
  }
  saveVideo(video:Video):Observable<Video>{
    const headers = new HttpHeaders({'Content-Type' : 'application/json'})
    return this.http.put(`${this.videosUrl}/${video.slug}`, video, {headers:headers})
    .pipe(
      tap(data => console.log('All: ' + JSON.stringify(data))),
      map(()=>video),
      catchError(this.handleError)
    )
  }

  deleteVideo(video:Video):Observable<any>{
    const headers = new HttpHeaders({'Content-Type' : 'application/json'})
    return this.http.delete(`${this.videosUrl}/${video.slug}`)
    .pipe(
      tap(data => console.log('All: ' + JSON.stringify(data))),
      catchError(this.handleError)
    )
  }

  getYoutubeId(url:string):string{
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
    var match = url.match(regExp);

    if(match&&match[7].length==11){
      return match[7];
    }
    return "";
  }

  private handleError(err: HttpErrorResponse) {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
