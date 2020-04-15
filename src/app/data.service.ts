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

  //api = "http://starlord.hackerearth.com/gamesarena";
  api = "../../assets/mydata.json";
  
  hasProp(obj: Object, prop) {
    return Object.prototype.hasOwnProperty.call(obj, prop);
  }

  getGames() : Observable<GameCard[]> {
    return this.http.get<GameCard[]>(this.api).pipe(
      map(o => o.map((res): GameCard => {
        if(this.hasProp(res, 'title') && this.hasProp(res, 'platform')
        && this.hasProp(res, 'score') && this.hasProp(res, 'genre') && this.hasProp(res, 'editors_choice'))
            return {
              title: res.title,
              platform: res.platform,
              score: res.score,
              genre: res.genre,
              editors_choice: res.editors_choice
            }           
          })
      ));
  }
}


