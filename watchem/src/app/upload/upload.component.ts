import { Component } from '@angular/core';

interface UploadForm {
  title: string;
  video: File;
  description: string;
}

@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [],
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.scss'
})
export class UploadComponent {

}
