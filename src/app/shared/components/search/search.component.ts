import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { debounceTime, takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: [
  ]
})
export class SearchComponent implements OnInit, OnDestroy {

  searchForm: FormGroup;
  isStreamActive: boolean;
  @Output() searchChange = new EventEmitter<string>();


  constructor() { 
    this.isStreamActive =  false;
    this.searchForm = new FormGroup({
      character: new FormControl('', [])
    });
  }
  ngOnDestroy(): void {
    this.isStreamActive =  false;
  }

  ngOnInit(): void {
    this.isStreamActive =  true;
    this.searchForm.get('character')?.valueChanges
    .pipe(
      takeWhile(() => !!this.isStreamActive),
      debounceTime(600)
    ).subscribe(() => this.search())
  }

  public search(): void {
    const query = this.searchForm.get('character')?.value;
    console.log(query);    
    this.searchChange.emit(query);
  }

}
