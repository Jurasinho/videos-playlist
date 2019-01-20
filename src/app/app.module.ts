import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


//import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VideosModule } from './videos/videos.module';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { WelcomeComponent } from './welcome/welcome.component';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    VideosModule,
  
    RouterModule.forRoot(
      [
        {path: "welcome", component: WelcomeComponent},
        { path: '', redirectTo: 'welcome', pathMatch: 'full' },
      ],
    ),
    HttpClientModule,
    // HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
