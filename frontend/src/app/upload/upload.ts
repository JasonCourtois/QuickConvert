import { Component, signal, input, WritableSignal } from '@angular/core';
import { FileInfo } from '../types';

@Component({
  selector: 'upload',
  templateUrl: './upload.html',
})
export class Upload {
  selectedFileData = '';
  currentFileName = '';

  // Reference to signal in parent storing all uploaded images.
  selectedImages = input<WritableSignal<FileInfo[]>>();

  onFileChange = (event: Event) => {
    const input = event.target as HTMLInputElement;

    if (!input.files?.length) {
      // If nothing was selected, clear filename and preview status.
      this.selectedFileData = '';
      this.currentFileName = '';
      return;
    }

    this.currentFileName = input.files[0].name;

    // initialize reader to read image.
    const reader = new FileReader();

    reader.onload = () => {
      this.selectedFileData = reader.result as string;
    };

    reader.readAsDataURL(input.files[0]);
  };

  onConfirm = (fileInput: HTMLInputElement) => {
    if (this.selectedFileData.length === 0 || this.currentFileName.length === 0) return;

    this.selectedImages()?.update((value) => [
      ...value,
      {
        filename: this.currentFileName,
        data: this.selectedFileData,
      },
    ]);

    // Clear the selected file
    this.selectedFileData = '';
    this.currentFileName = '';
    fileInput.value = '';
  };
}
