/** Textual markov chain generator */

class MarkovMachine {
  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter((c) => c !== '');
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    let chains = new Map();
    for (let i = 0; i < this.words.length; i++) {
      let word = this.words[i];
      let nextWord;
      nextWord = this.words[i + 1] || null;
      if (word.slice(-1).match(/^[.,:!?]/)) {
        nextWord = null;
      }
      if (chains.has(word)) {
        chains.get(word).push(nextWord);
      } else {
        chains.set(word, [nextWord]);
      }
    }
    this.chains = chains;
  }

  static getChoice(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  /** return random text from chains */

  makeText(numWords = 100) {
    let newText = [];
    const startingWords = [];
    for (let i = 0; i < this.words.length; i++) {
      if (i === 0 || this.words[i].slice(0).match(/^[A-Z]*$/)) {
        startingWords.push(this.words[i]);
      }
    }
    let key = MarkovMachine.getChoice(startingWords);
    let nextWords = [];
    while (newText.length < numWords && key !== null) {
      newText.push(key);
      nextWords = Array.from(this.chains.get(key));
      key = MarkovMachine.getChoice(nextWords);
    }
    return newText
      .join(' ')
      .replace(/[.,\/#!$%?\^&\*;:{}=\_`~()"“”]/g, '')
      .replace(/\s{2,}/g, ' ');
  }
}
module.exports = { MarkovMachine };
