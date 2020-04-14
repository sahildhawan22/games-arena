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

  requestObj: GameCard[];
  gamesObj: Observable<any>;

  obs: Observable<any>;
  pageLength: number;
  pageSize: 6;
  dataSource: MatTableDataSource<GameCard>;

  isDescending = false;  //Initially show Ascending icon

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private data: DataService) { }

  ngOnInit(): void {
    this.data.getGames().subscribe(
      games =>{
        this.requestObj = games;
        console.log("this.requestObj before filter: ", this.requestObj);
        this.requestObj = this.requestObj.filter(o => o != undefined);
        console.log("this.requestObj: ", this.requestObj);
        this.pageLength = this.requestObj.length;
        this.makePaginator();
      } 
    );   
  }

  makePaginator(){
    this.dataSource = new MatTableDataSource<GameCard>(this.requestObj);
    this.dataSource.paginator = this.paginator;
    this.gamesObj = this.dataSource.connect();
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase match
    this.dataSource.filter = filterValue;
  }

  sortAscending (){
    this.requestObj.sort((a, b) => {
      const scoreA = a.score;
      const scoreB = b.score;
      return scoreA - scoreB;
    });
    this.isDescending = true; //now that sorted in ascending order, show descending order icon
    this.makePaginator();
  }

  sortDescending() {
    this.requestObj.sort((a, b) => {
      const scoreA = a.score;
      const scoreB = b.score;
      return scoreB - scoreA;
    });
    
    this.isDescending = false; //sorted in descending order, show ascending order icon again
    this.makePaginator();
  }

  ngOnDestroy() {
    if (this.dataSource) { 
      this.dataSource.disconnect(); 
    }
  }

}
