import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GameCard } from './game-card/game-card.component';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  /* getGames() : Observable<GameCard> {
    return this.http.get<GameCard>("http://starlord.hackerearth.com/gamesarena");
  } */
  getGames() : any {
    return this.http.get("http://starlord.hackerearth.com/gamesarena");
  }
}
