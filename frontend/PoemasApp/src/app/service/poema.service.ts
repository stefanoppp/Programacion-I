import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Paginado } from '../models/paginado.model';

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
  getPoemasPaginado(paginado:Paginado): Observable<any> {

    let params = new HttpParams();
    
    if(paginado.page)
      params = params.append('page', paginado.page);
    if(paginado.per_page)
      params = params.append('per_page', paginado.per_page);
    if(paginado.order_by)
      params = params.append('order_by', paginado.order_by);
    return this.httpClient.get(this.url, { params: params });
  }
  getPoema(id: string){
    return this.httpClient.get(this.url2+id);
  } 
}
