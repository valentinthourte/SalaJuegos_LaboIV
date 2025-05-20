import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RankingService } from '../../../services/ranking/ranking.service';
const firstImage: string = "./assets/ahorcado2-0.png";
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
  maxErrors: number = 7;
  gameOver: boolean = false;
  isWinner: boolean = false;
  currentImage: string = firstImage;
  score: number = 0;

  alphabet: string[] = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  private wordPool: string[] =
  ['ANGULAR', 'COMPONENTE', 'AHORCADO', 'DESARROLLO', 'FRONTEND', 'TECNOLOGIA', 'APLICACION', 'JUEGO' ];
  
  constructor(private rankingService: RankingService) {}

  ngOnInit() {
    this.resetGame();
  }

  guessLetter(letter: string) {
    this.guessedLetters.push(letter);

    if (this.word.includes(letter)) {
      this.updateDisplayedWord();
    } else {
      this.errors++;
      this.currentImage = "./assets/ahorcado2-" + this.errors + ".png";
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
      this.score += 10;
    } else if (this.errors >= this.maxErrors) {
      this.gameOver = true;
    }
  }

  resetGame() {
    this.word = this.wordPool[Math.floor(Math.random() * this.wordPool.length)];
    this.guessedLetters = [];
    if (this.isWinner == false && this.score != 0) {
      this.rankingService.saveScore('ahorcado', this.score);
      this.score = 0;
    }
    this.errors = 0;
    this.gameOver = false;
    this.isWinner = false;
    this.displayedWord = Array(this.word.length).fill('_');
    this.currentImage = firstImage;
  }
}
