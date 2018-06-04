#!/bin/sh

geth \
    --rpc \
    --rpcapi="db,eth,net,web3,personal,web3" \
    --rpccorsdomain "http://localhost" \
    --rpcaddr "0.0.0.0" \
    \
    --ws \
    --wsapi="db,eth,net,web3,personal,web3" \
    --wsorigins "*" \
    --wsaddr "0.0.0.0" \
    \
    --datadir ./data/main \
    --port 30301 \
    --nodiscover \
    --networkid 1 \
    --rpcvhosts "*" \
    --vmdebug \
    console