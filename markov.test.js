const { MarkovMachine } = require('./markov');

describe('Markov Tests', () => {
  let text;
  beforeAll(() => {
    text = new MarkovMachine('The cat in the hat');
  });
  test('Get words from Markov', () => {
    const words = ['the', 'cat', 'in', 'the', 'hat'];
    expect(words).toEqual(text.words);
  });
  test('Get map from Markov', () => {
    const wordMap = new Map();
    wordMap.set('the', ['cat', 'hat']);
    wordMap.set('cat', ['in']);
    wordMap.set('in', ['the']);
    expect(wordMap.get('the')).toEqual(text.chains.get('the'));
    expect(wordMap.get('cat')).toEqual(text.chains.get('cat'));
    expect(wordMap.get('in')).toEqual(text.chains.get('in'));
    expect(text.chains.get('hat')).toEqual([null]);
  });
  test('Get string back from Markov', () => {
    expect(text.makeText()).toEqual(expect.any(String));
  });
});
