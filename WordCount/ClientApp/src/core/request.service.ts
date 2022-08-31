import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RequestService {
  private readonly FileController = "files";
  private readonly WordCountController = "wordcount";
  constructor(@Inject('BASE_URL') private readonly baseUrl: string, private httpClient: HttpClient) {}

  getBaseURL() {
    return this.baseUrl;
  }
  getFiles() {
    return this.httpClient.get<string[]>(this.baseUrl + this.FileController )
  }
  deleteFile(fileName:string) {
    return this.httpClient.delete<string[]>(this.baseUrl + this.FileController + "/" +fileName
      , )
  }
  postWordCount(fileName:string) {
    var formData: any = new FormData();
    formData.append("name", fileName);
    return this.httpClient.post<object>(this.baseUrl + this.WordCountController , formData)
  }

}
