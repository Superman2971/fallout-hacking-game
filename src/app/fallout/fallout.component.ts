import { Component } from '@angular/core';
import { FalloutService } from './fallout.service';

@Component({
  selector: 'app-fallout',
  templateUrl: './fallout.component.html',
  styleUrls: ['./fallout.component.scss']
})
export class FalloutComponent {
  newGame = true;
  gameOptions: Array<string>;
  winningAnswer: string;
  message: string;
  attempts: number = 0;

  constructor(private falloutService: FalloutService) {}

  public getWords(length) {
    const newPuzzleWords = [];
    const lengthOfPuzzle = this.minMaxRandom(5, 15);
    for (let i = 0; i < lengthOfPuzzle; i++) {
      const randomWordPosition = this.minMaxRandom(0, (this.falloutService.words[length].length - 1));
      const wordPicked = this.falloutService.words[length][randomWordPosition];
      if (newPuzzleWords.indexOf(wordPicked) === -1) {
        newPuzzleWords.push(wordPicked);
      }
    }
    this.selectCorrectAnswer(newPuzzleWords);
    this.gameOptions = newPuzzleWords;
    this.newGame = false;
    console.log(newPuzzleWords);
  }

  private minMaxRandom(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  private selectCorrectAnswer(words) {
    const winWordPosition = this.minMaxRandom(0, (words.length - 1));
    this.winningAnswer = words[winWordPosition];
  }

  public checkIfCorrect(word) {
    // check it against correct answer, send amount right but if all right you win!
    const test1 = word.split('');
    const test2 = this.winningAnswer.split('');
    let correctLetters = 0;
    for (let i = 0; i < word.length; i++) {
      if (test1[i] === test2[i]) {
        correctLetters++;
      }
    }
    if (correctLetters === word.length) {
      this.message = 'You WIN!';
    } else {
      this.attempts++;
      if (this.attempts > 2) { // check if 3 (or somehow more) attempts, if so you lose
        this.message = 'You LOSE!';
      } else {
        this.message = `${correctLetters} letter${correctLetters === 1 ? '' : 's'} match${correctLetters === 1 ? 'es' : ''} "${word}"`;
      }
    }
  }

  public goToNewGame() {
    this.gameOptions = null;
    this.newGame = true;
    this.message = null;
    this.attempts = 0;
  }
}
