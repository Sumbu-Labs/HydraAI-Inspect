#!/bin/bash

ASSET_NAME=$1
METADATA_FILE=$2

if [ -z "$ASSET_NAME" ]; then
  echo "Usage: ./mint-vct.sh <asset_name> <metadata_json_file>"
  exit 1
fi

echo "Minting VCT Token: $ASSET_NAME"
echo "Reading metadata from: $METADATA_FILE"

# Simulate minting delay
sleep 2

TX_HASH="829a$(openssl rand -hex 30)"
echo "Minting successful!"
echo "Tx Hash: $TX_HASH"
echo $TX_HASH > last_mint_hash.txt
