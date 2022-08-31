import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RequestService {
  private readonly WordCountController = "wordcount";
  constructor(@Inject('BASE_URL') private readonly baseUrl: string, private httpClient: HttpClient) {}

  getBaseURL() {
    return this.baseUrl;
  }
  getFiles() {
    return this.httpClient.get<string[]>(this.baseUrl + this.WordCountController + '/getExistingFiles')
  }
  deleteFile(fileName:string) {
    return this.httpClient.post<string[]>(this.baseUrl + this.WordCountController
      + '/deleteFile', fileName)
  }
}
