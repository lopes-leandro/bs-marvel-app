import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Md5 } from "ts-md5";
import { BehaviorSubject, Observable } from 'rxjs';
import { map, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Comics, ComicsDto, Hero, HeroDto } from '../models/hero-class';

export interface IHeroService {
  readonly heroes$: BehaviorSubject<any>
}

@Injectable({
  providedIn: 'root'
})
export class HeroService implements IHeroService{
  
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
    return this.http.get<{data: { results: HeroDto[]}}>(
      `${environment.URL_API}${this.url.characters}`, 
      {params: this.params}
    ).pipe(
      retry(2),
      map(res => this.transformationMarvelData(res.data.results))
    )
  }

  public getCharactersByIdComics(charactereId: string): Observable<Comics[]> {
    return this.http.get<{data: { results: ComicsDto[]}}>(
      `${environment.URL_API}${this.url.characters}/${charactereId}/comics`, 
      {params: this.params}
    ).pipe(
      retry(2),
      map(res => this.transformationCharactersByComics(res.data.results))
    )
  }


  getCharacteresById(charactereId: string): Observable<Hero> {
    return this.http.get<{ data: { results: HeroDto[] } }>(
      `${environment.URL_API}${this.url.characters}/${charactereId}`,
      {
        params: this.params
      })
      .pipe(
        map((res) => this.transformationMarvelSimpleData(res.data.results))
      );
  }

  transformationCharactersByComics(res: ComicsDto[]): Comics[]{
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

  transformationMarvelSimpleData(res: HeroDto[]): Hero {
    let hero = new Hero();

    res.forEach(item => {

      hero = {
        id: item.id,
        name: item.name,
        description: item.description,
        thumbnail: `${item.thumbnail.path}.${item.thumbnail.extension}`
      }
    });

    return hero
  }

  transformationMarvelData(res: HeroDto[]): Hero[] {
    let heroes: Hero[] = [];

    res.forEach(item => heroes.push(
      {
        id: item.id,
        name: item.name,
        description: item.description,
        thumbnail: `${item.thumbnail.path}.${item.thumbnail.extension}`
      }
    ));

    return heroes
  }
}
