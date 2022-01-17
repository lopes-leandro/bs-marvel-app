import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: [
  ]
})
export class SearchComponent implements OnInit {

  searchForm: FormGroup;

  constructor() { 
    this.searchForm = new FormGroup({
      character: new FormControl('', [])
    });
  }

  ngOnInit(): void {
  }

}
