import { Component, OnInit } from '@angular/core';
import { AvatarUpdateService } from "../../../services/avatar-update.service";
import { TranslateService } from "../../../services/translate.service";

@Component({
  selector: 'app-avatar-update',
  templateUrl: './avatar-update.component.html',
  styleUrls: ['./avatar-update.component.css']
})
export class AvatarUpdateComponent implements OnInit {
  progress: number;
  infoMessage: any;
  isUploading: boolean = false;
  isError: boolean = false;
  file: File;

  imageUrl: string | ArrayBuffer =
    "https://bulma.io/images/placeholders/480x480.png";
  fileName: string = 'No file selected';

  constructor(
    private uploader: AvatarUpdateService,
    public translate: TranslateService
    ) {
    }

  ngOnInit() {
    this.uploader.progressSource.subscribe(progress => {
      this.progress = progress;
    });
    this.fileName = this.translate.data["Nofileselected"];

  }

  onChange(file: File) {
    this.isError = false;
    this.infoMessage = null;
    if (file ) {
      let type = file['type'].toLowerCase() ;
      if(!(type == 'image/jpg' || type == 'image/png' || type == 'image/jpeg' )){
        this.infoMessage = this.translate.data["Onlyjpgpng"];
        this.isError = true;
        return;
      }
      this.fileName = file.name;
      this.file = file;

      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = event => {
        this.imageUrl = reader.result;
      };
    }
  }

  onUpload() {
    this.infoMessage = null;
    this.progress = 0;
    this.isUploading = true;

    this.uploader.upload(this.file).subscribe(message => {
      this.isUploading = false;
      this.isError = false;
      this.infoMessage = message;
    }, err =>{
      this.isUploading = false;
      this.isError = true;
      this.infoMessage = "Error while uploading the file...";
      this.imageUrl = "https://bulma.io/images/placeholders/480x480.png";
    });
  }
}