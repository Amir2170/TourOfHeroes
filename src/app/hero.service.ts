import { Injectable } from '@angular/core';
import { Hero } from "./hero";
import { HEROES } from "./mock-heroes";
import { of, Observable } from "rxjs";
import { MessageService } from "./message.service";

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor(private messageService: MessageService) { }

  getHeroes(): Observable<Hero[]> {
    this.messageService.add("HeroComponent: heroes fetched");
    return of(HEROES);
  }

  getHero(id: number): Observable<Hero | undefined>{
    const hero = HEROES.find(hero => hero.id === id);
    this.messageService.add(`HeroService: fetched hero id=${id}`);
    return of(hero);
  }
}
