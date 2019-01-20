import { VideosService } from '../videos.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Video } from '../video';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { map, flatMap, switchMap } from 'rxjs/operators';



@Component({
  selector: 'app-video-edit',
  templateUrl: './video-edit.component.html',
  styleUrls: ['./video-edit.component.scss']
})
export class VideoEditComponent implements OnInit {
  videoForm:FormGroup;
  video:Video;
  pageTitle:string;


  constructor(
    private videosService:VideosService,
    private router:Router,
    private route:ActivatedRoute,
    private fb:FormBuilder
  ) { }

  ngOnInit() {
    this.videoForm = this.fb.group({
      name: ['', Validators.required],
      description: '',
      url: ['', Validators.required],
    })

    this.videoForm.controls.url.valueChanges
    .subscribe((url)=>{
      if(url){
        this.video.youtubeId = this.videosService.getYoutubeId(url);
          this.video.thumbnailUrl = `https://img.youtube.com/vi/${this.video.youtubeId }/0.jpg`;
      }
    });

    this.route.paramMap.subscribe(
      params => {
        const slug = params.get('slug');
        this.getVideo(slug);
      }
    )
  }

  getVideo(slug:string):void{
    this.videosService.getVideo(slug)
    .subscribe(video => {
      this.displayVideo(video)
    });
  }

  displayVideo(video:Video):void{
    if(this.videoForm){
      this.videoForm.reset();
    }
    this.video = video;
    
    if(this.video.id === 0){
      this.pageTitle = "Dodaj video";
    } else {
      this.pageTitle = "Edytuj video"
    }
    console.log(this.video);

    this.videoForm.patchValue(this.video);
    console.log(this.videoForm.value);
  }

  save(){
    if(this.videoForm.valid){
      if(this.videoForm.dirty){
        const p = { ...this.video, ...this.videoForm.value};
        if(p.id ===0 ){
          this.videosService.createVideo(p)
            .subscribe(
              () => this.onSaveComplete(),
              (error:any)=> console.warn(error)
            )
        } else {
          this.videosService.saveVideo(p)
            .subscribe(
              () => this.onSaveComplete(),
              (error:any)=> console.warn(error)
            )
        }
      } else {
        this.onSaveComplete();
      }
    }
  }

  onSaveComplete(){
    this.videoForm.reset();
    this.router.navigate(['/videos']);
  }

}
