import { Component, OnInit } from '@angular/core';
import { RequestService } from 'src/core/request.service';
import { StateHelperService } from 'src/core/state-helper.service';

@Component({
  selector: 'app-files-view',
  templateUrl: './files-view.component.html',
  styleUrls: ['./files-view.component.scss']
})
export class FilesViewComponent implements OnInit {
  FilesList?: string[];

  constructor( private stateHelperService: StateHelperService, private requestService: RequestService) { }

  ngOnInit(): void {
    this.stateHelperService.FilesList$.subscribe(files => {
      this.FilesList = files;
    })
  }
  public proccessFile(fileName: string) {
    this.requestService.postWordCount(fileName).subscribe(wordcount => {
      this.stateHelperService.setWordCount(wordcount);
    })
  }

}
