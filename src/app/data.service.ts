import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GameCard } from './game-card/game-card.component';
import { map, filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }
  
  /* getGames() : any {
    return this.http.get("http://starlord.hackerearth.com/gamesarena");
  } */

  
  hasProp(obj: Object, prop) {
    return Object.prototype.hasOwnProperty.call(obj, prop);
  }

  getGames() : Observable<GameCard[]> {
    return this.http.get<GameCard[]>("http://starlord.hackerearth.com/gamesarena").pipe(
      filter((o) =>(this.hasProp(o, 'title') && this.hasProp(o, 'platform')
      && this.hasProp(o, 'score') && this.hasProp(o, 'genre') && this.hasProp(o, 'editors_choice')).
      map(o => o.map((res): GameCard => {
            return {
              title: res.title,
              platform: res.platform,
              score: res.score,
              genre: res.genre,
              editors_choice: res.editors_choice
            }           
          })
      )));
  }
}


