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
import { Firestore, collection, collectionData, addDoc, doc, docData, updateDoc, setDoc } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';



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
  gameId: string | undefined = '';

  constructor(private route: ActivatedRoute, private firestore: Firestore, public dialog: MatDialog) {
    this.game = new GameModel();
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
     this.gameId = params['id'];
      console.log('Route parameter id:', this.gameId);
      if (!this.gameId) {
        console.warn('No game id in route; skip Firestore load.');
        return;
      }
      const gameDocRef = doc(this.firestore, 'games', this.gameId);
      docData(gameDocRef).subscribe((game: any) => {
        console.log('Game data from Firestore:', game);
        if (game) {
          this.game.players = Array.isArray(game.players) ? game.players : [];
          this.game.stack = Array.isArray(game.stack) ? game.stack : [];
          this.game.playedCards = Array.isArray(game.playedCards) ? game.playedCards : [];
          this.game.currentPlayer = Number.isInteger(game.currentPlayer) ? game.currentPlayer : 0;
          this.game.takeCardAnimation = !!game.takeCardAnimation;
          this.game.currentCard = game.currentCard || '';
          console.log('Game state initialized:', this.game);
        }
      });
    });
  }

  async newGame() {
    this.game = new GameModel();
    // const gamesRef = collection(this.firestore, 'games');
    // let gameInfo = await addDoc(gamesRef, this.game.toJson());
    // console.log('New game started', this.game);
    // console.log(gameInfo);
  }

  takeCard() {
    if (this.game.takeCardAnimation) return;
    if (!this.game.stack.length) return;
    
    this.game.currentCard = this.game.stack.pop()!;
    console.log('Card taken:', this.game.currentCard);
    this.game.takeCardAnimation = true;
    this.game.playedCards.push(this.game.currentCard);
    this.game.currentPlayer = (this.game.currentPlayer + 1) % this.game.players.length;
    
    // Speichere SOFORT mit Animation = true
    this.saveGame();
    
    // Setze Animation erst nach 2-3 Sekunden zurück
    setTimeout(() => {
      this.game.takeCardAnimation = false;
      this.saveGame();
    }, 2500);
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
      this.saveGame()
    });
  }

async saveGame() {
  if (!this.gameId) {
    console.warn('No game id; skip save.');
    return;
  }
  const gameDocRef = doc(this.firestore, 'games', this.gameId);
  await setDoc(gameDocRef, this.game.toJson(), { merge: true });
}


}
