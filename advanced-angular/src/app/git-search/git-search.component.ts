import { Component, OnInit } from '@angular/core';
//import { GitSearchService } from '../git-search.service';
import { UnifiedSearchService } from '../unified-search.service'
import { GitSearch } from '../git-search';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { AdvancedSearchModel } from '../advanced-search-model';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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
  form: FormGroup;
  formControls = {};

  constructor(private UnifiedSearchService: UnifiedSearchService, private route: ActivatedRoute, private router: Router) {
    // we are going to iterate through our this.modelKeys and create FormControl elements for each of them wrapped in a larger object.
    // This will create a formControls object with all of the fields needed from our model.
    this.modelKeys.forEach((key) => {
      let validators = [];
      if (key === 'q') {
        validators.push(Validators.required);
      }
      if (key === 'stars') {
        validators.push(Validators.maxLength(4))
      }
      validators.push(this.noSpecialChars);
      this.formControls[key] = new FormControl(this.model[key], validators);
    })
    this.form = new FormGroup(this.formControls);
  }

  // create an instance of our model, and bind it to the this.model property of our component
  model = new AdvancedSearchModel('', '', '', null, null, '');
  // create an array of its keys with the Object.keys() method
  modelKeys = Object.keys(this.model);

  noSpecialChars(c: FormControl) {
    let REGEXP = new RegExp(/[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/);

    return REGEXP.test(c.value) ? {
      validateEmail: {
        valid: false
      }
    } : null;
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.searchQuery = params.get('query');
      this.displayQuery = params.get('query');
      this.gitSearch();
    })
    this.gitSearchService.gitSearch('angular').subscribe((response) => {
      this.searchResults = response;
    }, (error) => {
      alert("Error: " + error.statusText)
    })
    this.route.data.subscribe((result) => {
      this.title = result.title
    });
  }

  // gitSearch = () => {
  //   this.gitSearchService.gitSearch(this.searchQuery).subscribe((response) => {
  //     this.searchResults = response;
  //   }, (error) => {
  //     alert("Error: " + error.statusText)
  //   })
  // }

  gitSearch = () => {
    this.UnifiedSearchService.unifiedSearch(this.searchQuery).subscribe( (response) => {
      console.log(response);
      this.searchResults = response.repositories;
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
    let search: string = this.form.value['q'];
    let params: string = "";
    this.modelKeys.forEach((elem) => {
      if (elem === 'q') {
        return false;
      }
      if (this.form.value[elem]) {
        params += '+' + elem + ':' + this.form.value[elem];
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
