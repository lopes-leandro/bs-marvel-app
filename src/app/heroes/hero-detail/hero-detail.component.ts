import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, mergeMap, takeWhile } from 'rxjs/operators';
import { Comics, Hero } from 'src/app/shared/models/hero-class';
import { HeroService } from 'src/app/shared/services/hero.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.scss']
})
export class HeroDetailComponent implements OnInit, OnDestroy {

  hero = new Hero();
  comics = new Array<Comics>();
  isStreamActive: boolean;


  constructor(
    private marvelService: HeroService,
    private route: ActivatedRoute
  ) { 
    this.isStreamActive = false;
  }
  ngOnDestroy(): void {
    this.isStreamActive = false;
  }

  ngOnInit(): void {
    this.isStreamActive = true;    
    this.route.paramMap.pipe(
      takeWhile(() => !!this.isStreamActive),
      mergeMap(params => {
        const characteresId = params.get('charactereId') ?? '';       
        return this.marvelService.getCharacteresById(characteresId)
          .pipe(
            takeWhile(() => !!this.isStreamActive),
            mergeMap((hero: Hero) => {
              this.hero = hero;
              return this.marvelService.getCharactersByIdComics(characteresId)
            })
          )
      })
    ).subscribe((comics: Array<Comics>) => {
      this.comics = comics;      
    });
  }

}
