
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { YoutubePlayerModule } from 'ngx-youtube-player';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { VideoComponent } from './video/video.component';
import { VideoGalleryComponent } from './video-gallery/video-gallery.component';
import { VideoPlayerComponent } from './video-player/video-player.component';
import { VideoCommentsComponent } from './video-comments/video-comments.component';
import { VideoEditComponent } from './video-edit/video-edit.component';




@NgModule({
  declarations: [
    VideoComponent,
    VideoGalleryComponent,
    VideoPlayerComponent,
    VideoCommentsComponent,
    VideoEditComponent,
  ],
  imports: [
    FormsModule,
    CommonModule,
    HttpClientModule,
    YoutubePlayerModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: "videos", component: VideoGalleryComponent},
      { path: "videos/:slug", component: VideoComponent},
      { path: "videos/:slug/edit", component: VideoEditComponent},
    ])
  ]
})
export class VideosModule { }

