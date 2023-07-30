import { Injectable } from '@angular/core';
import { InMemoryDbService } from "angular-in-memory-web-api";

import { Hero } from "./hero";

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService{

  createDb() {
    const heroes = [
      { id: 12, name: 'Dr. Nice' },
      { id: 13, name: 'Bombasto' },
      { id: 14, name: 'Celeritas' },
      { id: 15, name: 'Magneta' },
      { id: 16, name: 'RubberMan' },
      { id: 17, name: 'Dynama' },
      { id: 18, name: 'Dr. IQ' },
      { id: 19, name: 'Magma' },
      { id: 20, name: 'Tornado' }
    ];
    return {heroes};
  }
  genId(heroes: Hero[]): number {

    // determine next-available id
    if (heroes.length > 0) {
      // we already have some heroes, so:

      // get array of just the ids:
      let existingIds = heroes.map(hero => hero.id); // [11,12,...,20] (assuming 20 is the highest id used so far)

      // and find the highest number in that array:
      // "..." spread notation turns this statement into Math.max(11,12,13,...,20)
      let max = Math.max(...existingIds); // 20

      return max + 1; // 21

    } else {
      // we have no heroes, so:
      return 11; // start at 11
    }
  }
}
