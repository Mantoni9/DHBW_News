import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface ApiResult {
  totalResults: number;
  articles: any[];
  }

@Injectable({
  providedIn: 'root'
})

export class NewsService {

  constructor(private httpClient: HttpClient) { }

  getTopHeadlines():Observable<ApiResult> {
    return this.httpClient.get<ApiResult>(
      `${environment.baseUrl}topHeadlines?country=de&apiKey=${environment.apiKey}`
    )
  }

  getArticleByCategory(category):Observable<ApiResult> {
    return this.httpClient.get<ApiResult>(
      `${environment.baseUrl}everything?q=${category}&language=de&apiKey=${environment.apiKey}`
    )
  }
}
