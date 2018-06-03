import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class FalloutService {
  public words = {};

  constructor(private http: Http) {
    http.get('assets/words.txt').subscribe(data => {
      const wordsArray = data.text().split(/\r?\n/);
      this.splitByLetters(wordsArray);
    });
  }

  private splitByLetters(words) {
    words.forEach(word => {
      if (this.words[word.length]) {
        this.words[word.length].push(word);
      } else {
        this.words[word.length] = [word];
      }
    });
  }
}
