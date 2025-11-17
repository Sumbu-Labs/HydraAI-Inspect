FROM inputoutput/cardano-node:latest
COPY ../../hydra /hydra
CMD ["/hydra/scripts/start-hydra.sh"]
