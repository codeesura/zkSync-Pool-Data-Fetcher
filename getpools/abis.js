const config = require('./jsonUtils');

const getReserves = config.getJsonFile("./ABI/getReserves.json");
const getReservesBlock = config.getJsonFile("./ABI/getReservesBlock.json");

const erc20 = config.getJsonFile("./ABI/IERC20.json");

module.exports = {
    getReserves,
    getReservesBlock,
    erc20
};