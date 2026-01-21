import { Component } from '@angular/core';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { GameModel } from '../../models/gamemodels';

@Component({
  selector: 'app-start-screen',
  imports: [],
  templateUrl: './start-screen.html',
  styleUrl: './start-screen.css',
})
export class StartScreen {
  constructor(private firestore: Firestore, private router: Router) {}

  async onPlayClick() {
    const game = new GameModel();
    const gamesRef = collection(this.firestore, 'games');
    const docRef = await addDoc(gamesRef, game.toJson());
    this.router.navigate(['gametableX', docRef.id]);
  }
}