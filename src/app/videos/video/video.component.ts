import { Component,HostListener, AfterViewInit, OnInit, ViewChild, ElementRef, AfterContentInit } from '@angular/core';
import { VideosService } from '../videos.service';
import { Video } from '../video';
import { ActivatedRoute } from '@angular/router';
import { ResizeObserver } from 'resize-observer';
import { VideoPlayerComponent } from '../video-player/video-player.component';
@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class VideoComponent implements OnInit, AfterViewInit {
  pageTitle: string = "Video ";
  video:Video;
  player: YT.Player;

  resizeObserver:ResizeObserver;

  _videoPlayerWrapper:ElementRef;
  @ViewChild('videoPlayerWrapper') 
  set videoPlayerWrapper(value:ElementRef){
    this._videoPlayerWrapper = value;
    this.resizePlayer();
  };
  get videoPlayerWrapper():ElementRef{
    return this._videoPlayerWrapper;
  }

  constructor( 
    private videosService:VideosService, 
    private route:ActivatedRoute
  ) { 

  }

  
  @HostListener('window:resize')
  resizePlayer(){
    console.log("resized")
    if(!this.videoPlayerWrapper || !this.player) return;

    var wrapper:HTMLElement = this.videoPlayerWrapper.nativeElement;
    let width = wrapper.offsetWidth;
    
    let height = width * 9/16;

    wrapper.style.height = height.toString();
    this.player.setSize(width, height);
    
  }

  ngDoCheck(){
    
  }

  ngOnInit() {
    let slug = this.route.snapshot.paramMap.get('slug');
    this.videosService.getVideo(slug)
      .subscribe(video => {
        this.video = video;
      });
    
  }
  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
  }

  savePlayer(player) {
    this.player = player;
    console.log('player instance', player);
    this.resizePlayer()
  }
  onStateChange(event) {
    console.log('player state', event.data);
  }

}
