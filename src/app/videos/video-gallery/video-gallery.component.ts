import { Component, OnInit } from '@angular/core';
import { VideosService } from '../videos.service';
import { Video } from '../video';
import { ActivatedRoute, Router, ParamMap} from '@angular/router';

@Component({
  selector: 'app-video-gallery',
  templateUrl: './video-gallery.component.html',
  styleUrls: ['./video-gallery.component.scss'],
})
export class VideoGalleryComponent implements OnInit {
  videos:Video[];
  constructor(
    public videosService:VideosService, 
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    this.videosService.getVideos()
      .subscribe(videos => this.videos = videos);

  }
  go(link:string){
    this.router.navigate([link, 1])
  }
  delete(video:Video){
    this.videosService.deleteVideo(video)
  }

}
