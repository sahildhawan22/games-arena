import { Component, OnInit, ViewChild, OnDestroy, AfterViewInit } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

export interface GameCard {
  title: string,
  platform: string,
  score: number,
  genre: string,
  editors_choice: string
}

@Component({
  selector: 'app-game-card',
  templateUrl: './game-card.component.html',
  styleUrls: ['./game-card.component.css']
})
export class GameCardComponent implements OnInit, OnDestroy {

  //gamesObj: GameCard;
  requestObj: any;
  gamesObj: Observable<any>;

  obs: Observable<any>;
  pageLength: number;
  pageSize: 6;
  dataSource: MatTableDataSource<GameCard>;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private data: DataService) { }

  ngOnInit(): void {
    this.data.getGames().subscribe(
      games =>{
        this.requestObj = games;
        this.pageLength = games.length;
        this.dataSource = new MatTableDataSource<GameCard>(this.requestObj);
        this.dataSource.paginator = this.paginator;
        this.gamesObj = this.dataSource.connect();
      } 
    );   
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase match
    this.dataSource.filter = filterValue;
  }

  ngOnDestroy() {
    if (this.dataSource) { 
      this.dataSource.disconnect(); 
    }
  }

}
