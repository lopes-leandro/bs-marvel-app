import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Hero } from 'src/app/shared/models/hero-class';
import { HeroService } from 'src/app/shared/services/hero.service';

@Component({
  selector: 'app-hero-list',
  templateUrl: './hero-list.component.html',
  styleUrls: ['./hero-list.component.scss']
})
export class HeroListComponent implements OnInit {

  heroes$ = new Observable<Hero[]>();

  constructor(private heroService: HeroService) { 
    this.heroes$ = this.heroService.getCharacters();
  }

  ngOnInit(): void {
  }

}
