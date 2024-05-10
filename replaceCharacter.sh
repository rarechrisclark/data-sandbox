#!/bin/bash

# Replace all commas with pipe characters in a file
sed 's/,/|/g' data/input/galleries-16k.csv > data/output/galleries-16k.csv
