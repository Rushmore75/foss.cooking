#!/bin/bash

ls authors > store

while read p; do
	NAME=$(echo $p | head -c-6)
	FOLDER="./recipes/$NAME/"
	FROM="./authors/$p"
	# echo FROM $FROM TO $FOLDER
	mv ./authors/$p $FOLDER
done < store
