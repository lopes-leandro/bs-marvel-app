import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Md5 } from "ts-md5";
import { BehaviorSubject, Observable } from 'rxjs';
import { map, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Hero, HeroDto } from '../models/hero-class';

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
    this.hash = Md5.hashStr(`${environment.safeWord}${environment.privateKey}${environment.publicKey}`);
    this.params = new HttpParams({
      fromObject: {
        ts: environment.safeWord,
        apikey: environment.publicKey,
        hash: this.hash
      }
    }); 
  }

  public getCharacters(): Observable<Hero[]> {
    return this.http.get<{data: { results: HeroDto[]}}>(
      `${environment.urlApi}${this.url.characters}`, 
      {params: this.params}
    ).pipe(
      retry(2),
      map(res => this.transformationMarvelData(res.data.results))
    )
  }

  public getCharactersByIdComics(): Observable<any> {
    return this.http.get<{data: { results: HeroDto[]}}>(
      `${environment.urlApi}${this.url.characters}/${'id'}/comics`, 
      {params: this.params}
    ).pipe(
      retry(2),
      map(res => console.log(res))
    )
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
