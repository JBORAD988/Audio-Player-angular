import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AudioPlayerComponent} from "./audio-player/audio-player.component";
import {UploadedAudioPlayComponent} from "./uploaded-audio-play/uploaded-audio-play.component";

const routes: Routes = [{
  path: 'audio', component : AudioPlayerComponent
},
  {path: 'file', component: UploadedAudioPlayComponent},
  {path:'', redirectTo: 'file', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
