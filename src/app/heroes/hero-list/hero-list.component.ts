import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { debounceTime, takeWhile } from 'rxjs/operators';
import { Hero } from 'src/app/shared/models/hero-class';
import { HeroService } from 'src/app/shared/services/hero.service';

@Component({
  selector: 'app-hero-list',
  templateUrl: './hero-list.component.html',
  styleUrls: ['./hero-list.component.scss']
})
export class HeroListComponent implements OnInit, OnDestroy {

  searchForm: FormGroup;
  heroes = new Array<Hero>();
  isStreamActive: boolean;

  constructor(private heroService: HeroService) {
    this.isStreamActive = false;
    this.searchForm = new FormGroup({
      character: new FormControl('', []),
    });


  }
  ngOnDestroy(): void {
    this.isStreamActive = false;
  }

  ngOnInit(): void {
    this.searchHeroes('');
  }

  searchHeroes(query: string) {
    this.isStreamActive = true;
    this.heroService.searchCharacters(query)
      .pipe(
        takeWhile(() => !!this.isStreamActive)
      ).subscribe((heroes) => {
        this.heroes = heroes;
      })
  }

}
