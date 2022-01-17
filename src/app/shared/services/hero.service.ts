import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Md5 } from "ts-md5";
import { BehaviorSubject, Observable } from 'rxjs';
import { map, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Comics, ComicsDto, Hero, HeroDto, SeriesDto, Series } from '../models/hero-class';

export interface IHeroService {
  readonly heroes$: BehaviorSubject<any>
}

@Injectable({
  providedIn: 'root'
})
export class HeroService implements IHeroService {

  heroes$ = new BehaviorSubject<any>(0);
  hash: string;
  params: HttpParams;
  url = {
    characters: '/v1/public/characters',
  }

  constructor(private http: HttpClient) {
    this.hash = Md5.hashStr(`${environment.SAFE_WORD}${environment.PRIVATE_KEY}${environment.PUBLIC_KEY}`);
    this.params = new HttpParams({
      fromObject: {
        ts: environment.SAFE_WORD,
        apikey: environment.PUBLIC_KEY,
        hash: this.hash
      }
    });
  }

  public getCharacters(): Observable<Hero[]> {
    return this.http.get<{ data: { results: HeroDto[] } }>(
      `${environment.URL_API}${this.url.characters}`,
      { params: this.params }
    ).pipe(
      retry(2),
      map(res => this.transformByCharacters(res.data.results))
    )
  }

  public getCharactersByIdComics(charactereId: string): Observable<Comics[]> {
    return this.http.get<{ data: { results: ComicsDto[] } }>(
      `${environment.URL_API}${this.url.characters}/${charactereId}/comics`,
      { params: this.params }
    ).pipe(
      retry(2),
      map(res => this.transformByComics(res.data.results))
    )
  }

  public getSeriesByCharacters(charactereId: string): Observable<Series[]> {
    return this.http.get<{ data: { results: SeriesDto[] } }>(
      `${environment.URL_API}${this.url.characters}/${charactereId}/comics`,
      { params: this.params }
    ).pipe(
      retry(2),
      map(res => this.transformBySeries(res.data.results))
    )
  }

  getCharacteresById(charactereId: string): Observable<Hero> {
    return this.http.get<{ data: { results: HeroDto[] } }>(
      `${environment.URL_API}${this.url.characters}/${charactereId}`,
      {
        params: this.params
      })
      .pipe(
        map((res) => this.transformaByCharacter(res.data.results))
      );
  }

  public searchCharacters(characterName: string): Observable<Hero[]> {
    return this.getCharacters().pipe(map(characters => {
      if (!characterName) {
        return characters;
      }
      return characters.filter(character => {
        const query = characterName.toLowerCase();
        return (character.name.toLowerCase().includes(query))
      })
    }))
  }

  private transformBySeries(res: SeriesDto[]): Series[] {
    let series = new Array<Series>();
    res.forEach(item => {
      series.push({
        id: item.id,
        title: item.title,
        description: item.description,
        startYear: item.startYear,
        endYear: item.endYear,
        imgUrl: `${item.thumbnail.path}.${item.thumbnail.extension}`
      })
    })
    return series;
  }

  private transformByComics(res: ComicsDto[]): Comics[] {
    let comics = new Array<Comics>();
    res.forEach(item => {
      comics.push({
        id: item.id,
        description: item.description,
        title: item.title,
        ean: item.ean,
        format: item.format,
        isbn: item.isbn,
        pageCount: item.pageCount,
        imgUrl: `${item.thumbnail.path}.${item.thumbnail.extension}`
      })
    })

    return comics
  }

  private transformaByCharacter(res: HeroDto[]): Hero {
    let hero = new Hero();

    res.forEach(item => {

      hero = {
        id: item.id,
        name: item.name,
        description: item.description,
        thumbnail: `${item.thumbnail.path}.${item.thumbnail.extension}`
      }
    });

    return hero;
  }

  private transformByCharacters(res: HeroDto[]): Hero[] {
    let heroes: Hero[] = [];

    res.forEach(item => heroes.push(
      {
        id: item.id,
        name: item.name,
        description: item.description,
        thumbnail: `${item.thumbnail.path}.${item.thumbnail.extension}`
      }
    ));

    return heroes;
  }
}
