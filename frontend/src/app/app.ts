import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Title } from './title/title';
import { Upload } from './upload/upload';
import { FileInfo } from './types';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Title, Upload],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  selectedImages = signal<FileInfo[]>([]);
}
