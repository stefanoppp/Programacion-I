import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class PostService {
  url = ''

  constructor(
    private httpClient: HttpClient,
  ) { }


  getUsers() {
    this.httpClient.get(this.url);
  }

}

