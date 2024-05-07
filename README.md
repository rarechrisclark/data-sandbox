# Data Sandbox

A collection of scripts to manipulate data. The scripts are written in JavaScript and run on Node.js.

## TODO:
- [ ] Add additional config for the transpose script, so that it can be used for any number of 'static' columns.
- [ ] Add a script to merge two CSV files based on a common column.

## Requirements

- Node.js
- npm

## Installation

1. Clone the repository
2. Run `npm install`

## Usage

### Transpose

The transpose script reads a CSV file and transposes it. The script will only work with CSV files. The input file should be saved in the `./data/input` directory and the output will be saved in the `./data/output` directory.

1. Run `node transpose.js <fileName>` (e.g. `node transpose.js placesFinal`) to transpose a CSV file.
