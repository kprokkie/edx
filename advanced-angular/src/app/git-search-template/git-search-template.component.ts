import { Component, OnInit } from '@angular/core';
import { GitSearchService } from '../git-search.service';
import { GitSearch } from '../git-search';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { AdvancedSearchModel } from '../advanced-search-model';

@Component({
  selector: 'app-git-search',
  templateUrl: './git-search.component.html',
  styleUrls: ['./git-search.component.css']
})
export class GitSearchComponent implements OnInit {
  title: string;
  searchResults: GitSearch;
  searchQuery: string;
  displayQuery: string;
  constructor(private gitSearchService: GitSearchService, private route: ActivatedRoute, private router: Router) { }
  // create an instance of our model, and bind it to the this.model property of our component
  model = new AdvancedSearchModel('', '', '', null, null, '');
  // create an array of its keys with the Object.keys() method
  modelKeys = Object.keys(this.model);
  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.searchQuery = params.get('query');
      this.displayQuery = params.get('query');
      this.gitSearch();
    })
    this.gitSearchService.gitSearch('angular').then((response) => {
      this.searchResults = response;
    }, (error) => {
      alert("Error: " + error.statusText)
    })
    this.route.data.subscribe((result) => {
      this.title = result.title
    });
  }

  gitSearch = () => {
    this.gitSearchService.gitSearch(this.searchQuery).then((response) => {
      this.searchResults = response;
    }, (error) => {
      alert("Error: " + error.statusText)
    })
  }

  // sendQuery = () => {
  //   this.searchResults = null;
  //   this.router.navigate(['/search/' + this.searchQuery]);
  // }

  sendQuery = () => {
    this.searchResults = null;
    let search: string = this.model.q;
    let params: string = "";
    this.modelKeys.forEach((elem) => {
      if (elem === 'q') {
        return false;
      }
      if (this.model[elem]) {
        params += '+' + elem + ':' + this.model[elem];
      }
    })
    this.searchQuery = search;
    if (params !== '') {
      this.searchQuery = search + '+' + params;
    }
    this.displayQuery = this.searchQuery;
    this.gitSearch();
  }

}
