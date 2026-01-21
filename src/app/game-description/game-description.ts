import { Component, Input, SimpleChanges, OnChanges } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-game-description',
  standalone: true,
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './game-description.html',
  styleUrl: './game-description.scss',
})
export class GameDescription implements OnChanges {
  cardAction = [
    {
      title: 'Waterfall',
      description:
        'Everyone starts doing jumping jacks at the same time. Player 1 may stop at any time. Player 2 may stop once player 1 stops, player 3 after player 2, and so on.',
    },
    {
      title: 'You',
      description: 'Choose one player who has to do 10 squats.',
    },
    {
      title: 'Me',
      description: 'Congrats! Do 10 push-ups.',
    },
    {
      title: 'Category',
      description:
        'Pick a fitness category (e.g. Leg exercises). Each player must name one exercise. The first to fail does 10 squats.',
    },
    {
      title: 'Bust a jive',
      description:
        'Player 1 starts with one exercise (e.g. 5 squats). Player 2 repeats it and adds another exercise. This continues until someone forgets an exercise.',
    },
    {
      title: 'Chicks',
      description: 'All female players do 10 squats.',
    },
    {
      title: 'Heaven',
      description: 'Raise your hands! The last player to do so performs 10 jumping jacks.',
    },
    {
      title: 'Mate',
      description:
        'Pick a mate. Whenever you have to do an exercise, your mate must do it as well, and vice versa.',
    },
    {
      title: 'Thumbmaster',
      description:
        'You are the Thumbmaster. At any time, place your thumb on the table. The last player to copy you does 5 push-ups.',
    },
    {
      title: 'Men',
      description: 'All male players do 10 push-ups.',
    },
    {
      title: 'Quizmaster',
      description:
        'You are the Quizmaster. If someone answers a question you ask, they must do 5 squats.',
    },
    {
      title: 'Never have I ever...',
      description:
        'Say something you have never done. Everyone who has done it must do 10 jumping jacks.',
    },
    {
      title: 'Rule',
      description:
        'Make a rule. Anyone who breaks it must do 5 push-ups.',
    },
  ];

  title: string = '';
  description: string = '';
  @Input() card: string | undefined;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['card'] && this.card) {
      console.log('GameDescription detected card change:', this.card);
      const cardNumber = +this.card.split('_')[1];
      this.title = this.cardAction[cardNumber - 1].title;
      this.description = this.cardAction[cardNumber - 1].description;
    }
  }
}
