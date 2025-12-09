import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameModel } from '../../models/gamemodels';

@Component({
  selector: 'app-gametable',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gametable.html',
  styleUrl: './gametable.scss',
})
export class Gametable {

  takeCardAnimation = false;
  game: GameModel;
  currentCard: string | undefined = '';

  constructor() {
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
    setTimeout(() => {
      this.takeCardAnimation = false;     
    }, 1000);
  }
}


}
