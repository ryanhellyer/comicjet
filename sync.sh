#!/bin/bash

# Define source and remote destination
SRC="./"
DEST="ryan@hellyer.kiwi:/var/www/comicjet.com"

# Execute rsync
# -a: archive mode
# -v: verbose
# -z: compress data
# --delete: sync deletions
# --exclude: skip the .git directory
rsync -avz --delete --exclude '.git/' "$SRC" "$DEST"


