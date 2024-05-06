// run `node transpose.js` in the console to run this script

const fs = require('fs');
const csv = require('fast-csv');

const inputFilePath = 'placesFinal.csv';
const outputFilePath = 'output.csv';

const writeStream = fs.createWriteStream(outputFilePath);

fs.createReadStream(inputFilePath)
.pipe(csv.parse())
.on('error', (error) => console.error(error))
.on('data', (row) => {
  const uuid = row[0];
  const number = row[1];
  for (let i = 2; i < row.length; i++) {
    if (row[i]) {
      writeStream.write(`${uuid},${number},${row[i]}\n`);
    }
  }
})
.on('end', () => {
  writeStream.end();
  console.log('CSV processing finished.');
});
