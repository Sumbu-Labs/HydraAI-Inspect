# Hydra Environment

Use this folder to run a local Hydra Head environment.

## Quickstart
1. Ensure `cardano-node` and `hydra-node` are available in your PATH.
2. Edit the configs in `config/` to match your target network.
3. Execute `./scripts/fund-parties.sh` to fund the addresses.
4. Start the head with `./scripts/start-hydra.sh`.
5. Point `HYDRA_URL` in the backend to your local node.
6. Stop the node using `./scripts/stop-hydra.sh`.
