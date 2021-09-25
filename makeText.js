/** Command-line tool to generate Markov text. */

const fs = require('fs');
const axios = require('axios');
const { MarkovMachine } = require('./markov');
const process = require('process');

let type = process.argv[2];
let path = process.argv[3];

async function genText() {
  if (type.toLowerCase() !== 'file' && type.toLowerCase() !== 'url') {
    console.error('Please select a valid type: "file" or "url".');
    process.exit(1);
  } else if (type.toLowerCase() === 'file') {
    fs.readFile(path, 'utf8', (err, data) => {
      if (err) {
        console.error(err.message);
        process.exit(1);
      } else {
        const mm = new MarkovMachine(data);
        console.log(mm.makeText());
      }
    });
  } else if (type.toLowerCase() === 'url') {
    try {
      const res = await axios.get(path);
      const mm = new MarkovMachine(res.data);
      console.log(mm.makeText());
    } catch (e) {
      console.error(e);
      process.exit(1);
    }
  }
}

async function getURLData(URL) {
  try {
    const res = await axios.get(URL);
    return res.data;
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

genText();
