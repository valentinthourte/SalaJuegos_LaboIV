import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ahorcado',
  imports: [CommonModule],
  templateUrl: './ahorcado.component.html',
  styleUrl: './ahorcado.component.scss'
})
export class AhorcadoComponent implements OnInit {
  word: string = '';
  displayedWord: string[] = [];
  guessedLetters: string[] = [];
  errors: number = 0;
  maxErrors: number = 6;
  gameOver: boolean = false;
  isWinner: boolean = false;

  alphabet: string[] = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  private wordPool: string[] = ['ANGULAR', 'COMPONENTE', 'AHORCADO', 'DESARROLLO', 'FRONTEND'];

  ngOnInit() {
    this.resetGame();
  }

  guessLetter(letter: string) {
    this.guessedLetters.push(letter);

    if (this.word.includes(letter)) {
      this.updateDisplayedWord();
    } else {
      this.errors++;
    }

    this.checkGameStatus();
  }

  updateDisplayedWord() {
    this.displayedWord = this.word.split('').map(letter =>
      this.guessedLetters.includes(letter) ? letter : '_'
    );
  }

  checkGameStatus() {
    if (!this.displayedWord.includes('_')) {
      this.gameOver = true;
      this.isWinner = true;
    } else if (this.errors >= this.maxErrors) {
      this.gameOver = true;
    }
  }

  resetGame() {
    this.word = this.wordPool[Math.floor(Math.random() * this.wordPool.length)];
    this.guessedLetters = [];
    this.errors = 0;
    this.gameOver = false;
    this.isWinner = false;
    this.displayedWord = Array(this.word.length).fill('_');
  }
}
