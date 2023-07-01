const ethers = require('ethers');
const config = require('./jsonUtils');
const abis = require('./abis');
require('dotenv').config();

const provider = new ethers.providers.JsonRpcProvider('https://mainnet.era.zksync.io');
const privateKey = process.env.PRIVATE_KEY;
const wallet = new ethers.Wallet(privateKey, provider);

async function getAllPools(item) {
    let poolAbi;
    if (item.ammName == "Muteio" || item.ammName == "Velocore" || item.ammName == "Spacefi") {
        poolAbi = abis.getReservesBlock;
    } else {
        poolAbi = abis.getReserves;
    }

    const poolInterface = new ethers.Contract(item.poolAddress, poolAbi, wallet);
    const poolToken0 = await poolInterface.token0();
    const token0Interface = new ethers.Contract(poolToken0, abis.erc20, wallet);
    const token0Name = await token0Interface.name();
    const token0Symbol = await token0Interface.symbol();
    const token0Decimal = await token0Interface.decimals();

    const poolToken1 = await poolInterface.token1();
    const token1Interface = new ethers.Contract(poolToken1, abis.erc20, wallet);
    const token1Name = await token1Interface.name();
    const token1Symbol = await token1Interface.symbol();
    const token1Decimal = await token1Interface.decimals();
    const poolReserves = await poolInterface.getReserves();
    const poolReserves0 = (poolReserves[0] / (10**token0Decimal)).toString();
    const poolReserves1 = (poolReserves[1] / (10**token1Decimal)).toString();
    const realReserves0 = poolReserves[0];
    const realReserves1 = poolReserves[1];

    return {
        id: item.ammName+"-"+item.poolAddress,
        type: "pool",
        attributes: {
            address: item.poolAddress,
            name: token0Symbol + " / " + token1Symbol,
            baseTokenPriceQuoteToken: Number((poolReserves1 / poolReserves0).toFixed(token1Decimal)),
            quoteTokenPriceBaseToken: Number((poolReserves0 / poolReserves1).toFixed(token0Decimal)),
            swapFee: "0.3"
        },
        relationships: {
            dex: {
                data: {
                    id: item.ammName,
                    type: "dex"
                }
            },
            baseToken: {
                data: {
                    name: token0Name,
                    symbol: token0Symbol,
                    reserves: realReserves0,
                    contractAddress: poolToken0,
                    decimals: Number(token0Decimal.toString()),
                    type: "token"
                }
            },
            quoteToken: {
                data: {
                    name: token1Name,
                    symbol: token1Symbol,
                    reserves: realReserves1,
                    contractAddress: poolToken1,
                    decimals: Number(token1Decimal.toString()),
                    type: "token"
                }
            }
        }
    }
};

async function main() {
    const data = await config.getJsonFile("pools.json");
    let promises = [];
    for (let contractList of data) {
        let promise = getAllPools(contractList);
        promises.push(promise);
    }
    let results = await Promise.all(promises);
    config.writeJsonFile("results.json", results);
}

main();
