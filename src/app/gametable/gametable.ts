import { Component } from '@angular/core';
import { NgStyle, NgFor } from '@angular/common';

@Component({
  selector: 'app-gametable',
  imports: [NgStyle, NgFor],
  templateUrl: './gametable.html',
  styleUrl: './gametable.scss',
})
export class Gametable {

  takeCardAnimation = false;

  takeCard() {
    this.takeCardAnimation = true;
  }

}
