# Cardano Testnet Setup

1. Export `CARDANO_NODE_SOCKET_PATH` to your local testnet node socket.
2. Sync the node using the config files in `hydra/config/cardano-node-config.json`.
3. Generate a new key pair via `cardano-cli address key-gen` and store it securely.
4. Mint CIP-68 sample metadata with `backend/scripts/mint-demo.sh` (placeholder) to validate the workflow.
5. Update the backend `.env` with the policy ID, asset name prefix, and Blockfrost endpoint if used.
