import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PoemaService {

  url = 'api/poemas';
  url2 ='api/poema/'
  
  constructor(
  private httpClient: HttpClient,
  private activatedRoute: ActivatedRoute
  ) { } 
  getPoemas() {
    return this.httpClient.get(this.url);
  }

  getPoema(id: string){
    return this.httpClient.get(this.url2+id);
  } 
}
