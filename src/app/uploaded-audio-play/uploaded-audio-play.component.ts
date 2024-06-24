import { Component } from '@angular/core';
import {AudioService} from "../audio.service";

@Component({
  selector: 'app-uploaded-audio-play',
  templateUrl: './uploaded-audio-play.component.html',
  styleUrls: ['./uploaded-audio-play.component.scss']
})
export class UploadedAudioPlayComponent {
  audioLoaded = false;

  constructor(private audioService: AudioService) {}

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const fileURL = URL.createObjectURL(file);
      console.log('Selected file:', fileURL)
      this.audioService.loadAudio(fileURL);
      this.audioLoaded = true;
    }
  }

  playAudio(): void {
    if (this.audioLoaded) {
      this.audioService.playAudio().catch(error => console.error('Audio play failed:', error));
    }
  }

  stopAudio(): void {
    this.audioService.stopAudio();
  }














  // New code review
  private fileBase64: string | null = null;

  onFileSelected2(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.convertToBase64(file).then(base64 => {
        this.fileBase64 = base64;
        const fileBlob = this.base64ToBlob(this.fileBase64);
        const fileURL = URL.createObjectURL(fileBlob);
        this.audioService.loadAudio(fileURL)
          .then(() => {
            this.audioLoaded = true;
          })
          .catch(error => console.error('Audio load failed:', error));
      });
    }
  }

  loadSavedAudio(): void {
    if (this.fileBase64) {
      const fileBlob = this.base64ToBlob(this.fileBase64);
      const fileURL = URL.createObjectURL(fileBlob);
      this.audioService.loadAudio(fileURL)
        .then(() => {
          this.audioLoaded = true;
        })
        .catch(error => console.error('Audio load failed:', error));
    }
  }

  playAudio2(): void {
    if (this.audioLoaded) {
      this.audioService.playAudio().catch(error => console.error('Audio play failed:', error));

    }
  }


  getFileBase64(): string | null {
    return this.fileBase64;
  }

  setFileBase64(base64: string): void {
    this.fileBase64 = base64;
    this.loadSavedAudio();
  }


  private convertToBase64(file: File): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  }

  private base64ToBlob(base64: string): Blob {
    const byteString = atob(base64.split(',')[1]);
    const mimeString = base64.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
  }

}
