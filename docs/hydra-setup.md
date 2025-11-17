# Hydra Head Setup

1. Install prerequisites: `cabal`, `hydra-node`, and the latest `cardano-cli`.
2. Copy configs from `hydra/config/` if you need to override your local environment.
3. Run `./hydra/scripts/fund-parties.sh` to fund the participant addresses on testnet.
4. Start a local node via `./hydra/scripts/start-hydra.sh`. The script loads the default config.
5. Hit the backend health endpoint (`/api/health`) to confirm that the backend handshakes with the Hydra Head.
6. Use `./hydra/scripts/stop-hydra.sh` for a clean shutdown.
