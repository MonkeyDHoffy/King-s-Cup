import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameModel } from '../../models/gamemodels';
import { Player } from '../player/player';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Header } from "../header/header";
import { MatDialog } from '@angular/material/dialog';
import { AddPlayerDialog } from '../add-player-dialog/add-player-dialog';
import { GameDescription } from "../game-description/game-description";




@Component({
  selector: 'app-gametable',
  standalone: true,
  imports: [CommonModule, Player, MatButtonModule, MatIconModule, Header, GameDescription],
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
      // Nächsten Spieler aktivieren 
      this.game.currentPlayer = (this.game.currentPlayer + 1) % this.game.players.length;
      setTimeout(() => {
        this.takeCardAnimation = false;     
      }, 1000);
    }
  }


  openDialog(): void {
    const dialogRef = this.dialog.open(AddPlayerDialog);
    console.log('Dialog opened');
    dialogRef.afterClosed().subscribe((name: string) => {
      if (name && this.game.players.length < 8) {
        this.game.players.push(name);
        console.log('The dialog was closed with result:', name);
      } else if (name) {
        alert('Maximum number of players (8) reached!');
        console.log('Max players reached, ignoring additional player');
      }
    });
  }
}
