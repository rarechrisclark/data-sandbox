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
const outputFilePath = `./data/output/filtered-${filename}.csv`;

const writeStream = createWriteStream(outputFilePath);

const valuesInB = new Set();

createReadStream(inputFilePath)
.pipe(csv.parse())
.on('error', (error) => console.error(error))
.on('data', (row) => {
  // Store values from column B in a Set
  const valueB = row[1]; // Assuming column B is at index 1
  if (valueB) {
    valuesInB.add(valueB);
  }
})
.on('end', () => {
  // Re-read the input file to filter values from column A based on column B
  createReadStream(inputFilePath)
  .pipe(csv.parse())
  .on('error', (error) => console.error(error))
  .on('data', (row) => {
    // Filter values from column A based on column B
    const valueA = row[0]; // Assuming column A is at index 0
    const valueB = row[1]; // Assuming column B is at index 1
    if (valueA && valuesInB.has(valueB)) {
      writeStream.write(`${valueA},${valueB}\n`);
    }
  })
  .on('end', () => {
    writeStream.end();
    console.log('CSV processing finished.');
  });
});
