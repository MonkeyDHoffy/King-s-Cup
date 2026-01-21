import { Component, EventEmitter, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { GameModel } from '../../models/gamemodels';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, MatToolbarModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  @Output() addPlayerClick = new EventEmitter<void>();

  constructor(
    private firestore: Firestore, 
    private router: Router
  ) {}

  async onNewGameClick() {
    const game = new GameModel();
    const gamesRef = collection(this.firestore, 'games');
    const docRef = await addDoc(gamesRef, game.toJson());
    this.router.navigate(['gametableX', docRef.id]);
  }

  onAddPlayerClick(): void {
    this.addPlayerClick.emit();
  }
}