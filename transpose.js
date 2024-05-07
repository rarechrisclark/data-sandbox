// run `node transpose.js {filename}` in the console to run this script

const csv = require('fast-csv');
const { createReadStream, createWriteStream } = require('fs');

// Get the filename from the command-line arguments
const filename = process.argv[2];

if (!filename) {
  console.error('Please provide a filename as a command-line argument.');
  process.exit(1);
}

// Read the input file and write the output file
const inputFilePath = `./data/input/${filename}.csv`;
const outputFilePath = `./data/output/${filename}.csv`;

const writeStream = createWriteStream(outputFilePath);

createReadStream(inputFilePath)
.pipe(csv.parse())
.on('error', (error) => console.error(error))
.on('data', (row) => {
  // Write the transposed data to the output file
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
