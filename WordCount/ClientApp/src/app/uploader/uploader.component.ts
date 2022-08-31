import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActionCompleteEventArgs, RemovingEventArgs, SelectedEventArgs  } from '@syncfusion/ej2-angular-inputs';
import { EmitType } from '@syncfusion/ej2-base';
import { Subject } from 'rxjs';
import { RequestService } from 'src/core/request.service';
import { StateHelperService } from 'src/core/state-helper.service';

@Component({
  selector: 'app-uploader',
  templateUrl: './uploader.component.html',
  styleUrls: ['./uploader.component.scss'],
})
export class UploaderComponent implements OnInit, OnDestroy, AfterViewInit {
 
  public onFileUpload: EmitType<SelectedEventArgs> = (args: any) => {
    // add addition data as key-value pair.
    args.customFormData = [{ name: (Math.random() * 1000).toFixed(0) }];
  };
  public FilesList: string[] = [];
  constructor(
    private http: HttpClient,
    private _requestService: RequestService,
    private stateHelperService: StateHelperService,
    private _snackBar: MatSnackBar
  ) { }
  public path: Object = {
    saveUrl: this._requestService.getBaseURL() + 'files',
    // set chunk size for enable the chunk upload
    chunkSize: 102400,
  };

  public onFileRemove(args: RemovingEventArgs): void {
    args.postRawFile = false;
  }

  public onActionComplete(args: ActionCompleteEventArgs): void {
    if (args.fileData[0]?.status === "File uploaded successfully") {
      this._snackBar.open("upload Succesfull");
      this.stateHelperService.setUploaderState(false)
    }
  }
  ngOnInit() {
    
  }
  ngOnDestroy(): void {

  }
  ngAfterViewInit(): void {
  
}
}
