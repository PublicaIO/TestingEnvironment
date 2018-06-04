# Publica MVP - Container with Geth and Solc

This container will be used to setup RPC server and this RPC server will be used to run tests.

### Setup
#### Start up docker and launch containers
```
$ docker-compose up -d
```

#### Connect to created container with
```
$ docker exec -it <container id> bash
```
*All following commands will be run from the launched container*

### Start your node
There are two ways of doing that now:
- Init private node using provided genesis.json file
- Start Geth with `--dev` flag

#### Init a private node using provided genesis.json file
```
$ geth --datadir ./data/main init genesis.json
$ sh ./runrpc-custom.sh
```

#### Start Geth with `--dev` flag
```
$ sh ./runrpc-dev.sh
```

### Accounts creation
There will be one account created and pre-funded if you are using dev mode.
In order to create additional accounts from geth console you can use `helper.js` file
```
> loadScript('helper.js');
> addAccount();
```
