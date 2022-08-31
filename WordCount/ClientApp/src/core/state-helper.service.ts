import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StateHelperService {

  private UploaderOpen: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public UploaderOpen$: Observable<boolean> = this.UploaderOpen.asObservable();
  private FilesList: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
  public FilesList$: Observable<string[]> = this.FilesList.asObservable();
  private WordCount: BehaviorSubject<object> = new BehaviorSubject<object>({});
  public WordCount$: Observable<object> = this.WordCount.asObservable();
  constructor() { }
  public setUploaderState(uploaderState: boolean) {
    this.UploaderOpen.next(uploaderState);
  }
  public setFileListState(fileList: string[]) {
    this.FilesList.next(fileList);
  }
  public setWordCount(wordcount: object) {
    this.WordCount.next(wordcount);
  }
}
