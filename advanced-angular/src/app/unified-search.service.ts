import { Injectable } from '@angular/core';
import { UnifiedSearch } from './unified-search';
import { Observable } from 'rxjs';
import { GitSearchService } from './git-search.service'
import { GitCodeSearchService } from './git-code-search.service'
import { GitSearch } from './git-search';
import { GitCodeSearch } from './git-code-search';
import 'rxjs/add/operator/combineLatest';

@Injectable({
  providedIn: 'root'
})
export class UnifiedSearchService {

  constructor(private searchService : GitSearchService, private codeSearchService : GitCodeSearchService) { }

  // transform the values returned by the forkJoin response to match those parameters. 
  // To do this, we are going to apply the map operator at the Observable level, rather than applying the transformation upon subscribe()
  unifiedSearch : Function = (query: string) : Observable<UnifiedSearch> => {
    return Observable.combineLatest(this.searchService.gitSearch(query), this.codeSearchService.codeSearch(query))
    // You'll notice that Visual Studio Code has highlighted a large section of code with an error at this point, 
    // telling us that Type 'Observable<{ 'repositories': {}; 'code': {}; }>' is not assignable to type 'Observable<UnifiedSearch>'.. 
    // We need to assert the two subtypes onto our response to tell TypeScript that those responses will in fact be the objects we are assigning.
    .map( (response : [GitSearch, GitCodeSearch]) => {
      return {
        'repositories' : response[0],
        'code': response[1]
      }
    })
  }
}
