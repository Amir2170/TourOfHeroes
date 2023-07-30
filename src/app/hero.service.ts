import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { catchError, map, tap } from "rxjs";

import { Hero } from "./hero";
import { HEROES } from "./mock-heroes";
import { of, Observable } from "rxjs";
import { MessageService } from "./message.service";
import {error} from "@angular/compiler-cli/src/transformers/util";

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  private heroesUrl = 'api/heroes';  // URL to web api
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };


  constructor(
    private messageService: MessageService,
    private http: HttpClient,
  ) { }

  getHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return  this.http.get<Hero>(url).pipe(
      tap(_ => this.messageService.add(`hero added Id: ${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`)),
    );
  }

  private handleError<T>(operation= 'operation', result?: T){
    // return an error handler function
    return (error: any): Observable<T> => {
      console.error(error);

      this.messageService.add(`${operation} failed: ${error.message}`);

      // safe return value so application can keep working
      return of(result as T);
    }
  }

  getHeroes(): Observable<Hero[]> {
    this.messageService.add("HeroComponent: heroes fetched");
    return this.http.get<Hero[]>(this.heroesUrl)
      .pipe(
        tap(_ => this.messageService.add("Fetched heroes")),
        catchError(this.handleError<Hero[]>('getHeroes', []))
  );
  }

  updateHero(hero: Hero): Observable<any>{
    return this.http.put(this.heroesUrl, hero, this.httpOptions).pipe(
      tap(_ => this.messageService.add(`hero updated Id: ${hero.id}`)),
      catchError(this.handleError<any>('updateHero')),
    )
  }

  addHero(hero: Hero): Observable<Hero>{
    return this.http.post<Hero>(this.heroesUrl, hero, this.httpOptions)
      .pipe(
        tap((newHero: Hero) => this.messageService.add(`hero created Id: ${newHero.id}`)),
        catchError(this.handleError<Hero>(`added Hero Id = ${hero.id}`)),
      )
  }

  deleteHero(id: number): Observable<Hero>{
    const url = `${this.heroesUrl}/${id}`;

    return this.http.delete<Hero>(url, this.httpOptions)
      .pipe(
        tap((hero: Hero) => this.messageService.add(`remove hero Id: ${hero.id}`)),
        catchError(this.handleError<Hero>(`deleted hero with id: ${id}`)),
      )
  }

  searchHeroes(term: string): Observable<Hero[]> {
    if (!term.trim()) {
      return of([]);
    }

    return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`)
      .pipe(
        tap(x => x.length ?
        this.messageService.add(`found heroes matching ${term}`) :
        this.messageService.add("no heroes found")),
        catchError(this.handleError<Hero[]>('searchHeroes', []))
      );
  }
}
