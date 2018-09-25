import { Injectable, Inject } from '@angular/core';
import { GitSearch } from './git-search';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/publishReplay';

@Injectable()
export class GitSearchService {
    cachedValue: string;
    search: Observable<GitSearch>;
  cachedValues: Array<{
      [query: string]: GitSearch
  }> = [];
  constructor(@Inject(Http) private http: Http) {
  }

  gitSearch : Function = (query: string) : Observable<GitSearch> => {
    if (!this.search) {
        this.search = this.http.get<GitSearch>('https://api.github.com/search/repositories?q=' + query)
        .publishReplay(1)
        .refCount();
        this.cachedValue = query;
    }
    else if (this.cachedValue !== query) {
        this.search = null;
        this.gitSearch(query);
    }
    return this.search;
  }
}