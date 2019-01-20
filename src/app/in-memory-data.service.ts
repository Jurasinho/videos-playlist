import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService{

  createDb(){
    const videos = [
      {
        id: "1", 
        name: "Test", 
        url: "http://yt.com", 
        description: "test",
        youtubeId:"bmjS5uGZoo0",
        thumbnail: "https://img.youtube.com/vi/bmjS5uGZoo0/mqdefault.jpg"
      }
    ]
    const comments = [
      {
        id: 1,
        author: "test",
        message: "lel",
        videoId: 1
      }
    ]
    return {videos, comments}
  }

  genId(item){
    console.log(item);
    return Math.round(Math.random()*1231241231231);
  }

  constructor() { }
}
