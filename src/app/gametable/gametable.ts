import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameModel } from '../../models/gamemodels';
import { Player } from '../player/player';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Header } from "../header/header";
import { MatDialog } from '@angular/material/dialog';
import { AddPlayerDialog } from '../add-player-dialog/add-player-dialog';


@Component({
  selector: 'app-gametable',
  standalone: true,
  imports: [CommonModule, Player, MatButtonModule, MatIconModule, Header],
  templateUrl: './gametable.html',
  styleUrl: './gametable.scss',
})
export class Gametable {

  takeCardAnimation = false;
  game: GameModel;
  currentCard: string | undefined = '';

  constructor(public dialog: MatDialog) {
    this.game = new GameModel();
  }

  ngOnInit(): void {
    this.newGame();
  }

  newGame() {
    this.game = new GameModel();
    console.log('New game started', this.game);
  }

  takeCard() {
    if(!this.takeCardAnimation){
      this.currentCard = this.game.stack.pop();
      console.log('Card taken:', this.currentCard);
      this.takeCardAnimation = true;
      this.game.playedCards.push(this.currentCard!);
      setTimeout(() => {
        this.takeCardAnimation = false;     
      }, 1000);
    }
  }

  
  openDialog(): void {
   const dialogRef = this.dialog.open(AddPlayerDialog);
console.log('Dialog opened');
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    
    });
  }

  

}
