import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { RemovingEventArgs, SelectedEventArgs } from '@syncfusion/ej2-angular-inputs';
import { EmitType } from '@syncfusion/ej2-base';
import { Subject } from 'rxjs';
import { RequestService } from 'src/core/request.service';

@Component({
  selector: 'app-uploader',
  templateUrl: './uploader.component.html',
  styleUrls: ['./uploader.component.scss'],
})
export class UploaderComponent implements OnInit, OnDestroy {
  public onFileUpload: EmitType<SelectedEventArgs> = (args: any) => {
    // add addition data as key-value pair.
    args.customFormData = [{ name: (Math.random() * 1000).toFixed(0) }];
  };
  public FilesList: string[] = [];
  constructor(
    private http: HttpClient,
    private _requestService: RequestService
  ) { }
  public path: Object = {
    saveUrl: this._requestService.getBaseURL() + 'wordcount/uploadFile',
    removeUrl: this._requestService.getBaseURL() + 'wordcount/deleteFile',
    // set chunk size for enable the chunk upload
    chunkSize: 102400,
  };

  public onFileRemove(args: RemovingEventArgs): void {
    args.postRawFile = false;
  }
  ngOnInit() {
    this._requestService.getFiles().subscribe(filesList => {
      this.FilesList = filesList;
    })
  }
  ngOnDestroy(): void {

  }
}
