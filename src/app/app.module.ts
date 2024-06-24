import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AudioPlayerComponent } from './audio-player/audio-player.component';
import { UploadedAudioPlayComponent } from './uploaded-audio-play/uploaded-audio-play.component';

@NgModule({
  declarations: [
    AppComponent,
    AudioPlayerComponent,
    UploadedAudioPlayComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
