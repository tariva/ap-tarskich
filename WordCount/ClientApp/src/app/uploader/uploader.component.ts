import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { SelectedEventArgs } from '@syncfusion/ej2-angular-inputs';
import { EmitType } from '@syncfusion/ej2-base';
import { RequestService } from 'src/core/request.service';

@Component({
  selector: 'app-uploader',
  templateUrl: './uploader.component.html',
  styleUrls: ['./uploader.component.scss'],
})
export class UploaderComponent implements OnInit {
  public onFileUpload: EmitType<SelectedEventArgs> = (args: any) => {
    // add addition data as key-value pair.
    console.log('info :D');
    args.customFormData = [{ name: 'Syncfusion INC' }];
  };
  constructor(
    private http: HttpClient,
    private _requestService: RequestService
  ) {}
  public path: Object = {
    saveUrl: this._requestService.getBaseURL() + 'wordcount',
    // set chunk size for enable the chunk upload
    chunkSize: 102400,
  };

  ngOnInit() {}
}
