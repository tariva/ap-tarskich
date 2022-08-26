import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RequestService {
  getBaseURL() {
    return this.baseUrl;
  }
  constructor(@Inject('BASE_URL') private baseUrl: string) {}
}
