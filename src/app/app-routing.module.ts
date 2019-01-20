import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';


@NgModule({
  imports: [RouterModule.forRoot([
    {path: "", component: WelcomeComponent},
    {
      path: 'videos', 
      loadChildren: './videos/videos.module#VideosModule'
    }
  ], { enableTracing: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
