import { Injectable } from '@angular/core';
import { GitSearch } from './git-search';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GitSearchService {

  cachedValues: Array<{[query: string]: GitSearch}> = [];
  search: Observable<GitSearch>;

  constructor(private http: HttpClient) { }

  gitSearch = (query: string): Observable<GitSearch> => {
    this.search = this.http.get<GitSearch>('https://api.github.com/search/repositories?q=' + query)
    return this.search;
  }

}
