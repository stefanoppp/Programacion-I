import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PoemaService {

  url = 'api/poemas';
  url2 ='api/poema'
  
  constructor(
  private httpClient: HttpClient
  ) { } 
  getPoemas() {
    return this.httpClient.get(this.url);
  }

  getPoema(){
    return this.httpClient.get(this.url2);
  } 
}
