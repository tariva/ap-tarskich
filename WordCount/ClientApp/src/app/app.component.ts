import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs';
import { RequestService } from 'src/core/request.service';
import { StateHelperService } from 'src/core/state-helper.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private _requestService: RequestService, public stateHelperService: StateHelperService) {

  }
  ngOnInit(): void {
    this._requestService.getFiles().subscribe(filesList => {
      this.stateHelperService.setFileListState(filesList);
    })
    
    this.stateHelperService.UploaderOpen$.pipe(switchMap(x=> this._requestService.getFiles())).subscribe(filesList => {
      this.stateHelperService.setFileListState(filesList);
    })
  }

  openUpload() {
    this.stateHelperService.setUploaderState(true)
  }
}
