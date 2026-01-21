import { take } from "rxjs";

export class GameModel {
    public players:string[] = [];
    public stack:string[] = [];
    public playedCards:string[] = [];
    public currentPlayer:number = 0;
    public takeCardAnimation = false;
    currentCard: string | undefined = '';


constructor() {
    for (let i = 1; i < 14; i++) {
    this.stack.push(`ace_${i}`);
    this.stack.push(`hearts_${i}`);
    this.stack.push(`diamonds_${i}`);
    this.stack.push(`clubs_${i}`);
}
shuffleArray(this.stack);
}

public toJson(){
return {
players: this.players,
stack: this.stack,
playedCards: this.playedCards,
currentPlayer: this.currentPlayer,
takeCardAnimation: this.takeCardAnimation,
currentCard: this.currentCard

};
}
  


}

  function shuffleArray(stack: any[]) {
    for (let i = stack.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [stack[i], stack[j]] = [stack[j], stack[i]];
    }
}
