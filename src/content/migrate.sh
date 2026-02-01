#!/bin/bash

ls recipes > store

while read p; do
	NAME=$(cat "./recipes/"$p | grep author | tail -c+9)
	NAME=$(echo $NAME | sed s/\"//g)
	NAME=$(echo $NAME | sed s/\'//g)
	NAME=${NAME// /-}
	FOLDER="./recipes/$NAME"
	mkdir -p $FOLDER
	mv ./recipes/$p $FOLDER
done < store
