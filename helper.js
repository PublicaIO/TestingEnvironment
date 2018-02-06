//
// Helper functions
//

function defaultValue(value, fallback) {
    return value = typeof value === 'undefined' ? fallback : value;
}

function addAccount(password) {
    return personal.newAccount(defaultValue(password, ''));
}

function getBalance (address) {
    return web3.fromWei(
        eth.getBalance(defaultValue(address, eth.coinbase)),
        'ether'
    );
}

function mine(amount, threads) {
    miner.start(defaultValue(threads, 10));
    admin.sleepBlocks(defaultValue(amount, 1));
    miner.stop();

    return true;
}

function start(threads) {
    return miner.start(defaultValue(threads, 10));
}

function stop() {
    return miner.stop();
}

function sendEther(amount, receiver) {
    personal.unlockAccount(eth.coinbase);

    return eth.sendTransaction({
        from: eth.coinbase,
        to: receiver,
        value: web3.toWei(amount, 'ether')
    });
}

function getContract(abi, address) {
    var instance = eth.contract(abi).at(address);

    return instance;
}

function deployContract(abi, bin, params, deployer) {
    deployer = defaultValue(deployer, eth.coinbase);
    params = defaultValue(params, []);

    personal.unlockAccount(deployer);

    if (!abi || !bin || !deployer) {
        console.log('Required data is missing');
        return false;
    }

    params.push({ from: deployer, data: bin, gas: '0x3d0900' });
    params.push(function (error, contract) {
        if (error) {
            console.log(error);
        } else if (contract.address) {
            console.log('Contract deployed at: ' + contract.address);
        }
    })

    contract = eth.contract(abi);
    contract.new.apply(contract, params);

    mine();
}