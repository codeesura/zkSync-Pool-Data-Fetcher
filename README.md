# 🌐 zkSync Pool Data Fetcher

zkSync Pool Data Fetcher is a Node.js application that uses the ethers.js library to interact with zkSync blockchain. It fetches pool information for specific automated market makers (AMMs) from the zkSync mainnet.


## 📝 Table of Contents

- [💻 Installation](#installation)
- [🔧 Configuration](#configuration)
- [📚 Usage](#usage)
- [📜 License](#license)

## 💻 Installation

Before you start, ensure that you have [Node.js](https://nodejs.org/en/download/) installed. 

To install the zkSync Pool Data Fetcher, follow these steps:

```bash
git clone https://github.com/codeesura/zksync-pool-data-fetcher.git
cd zksync-pool-data-fetcher
npm install
```

## 🔧 Configuration

The application requires a few configurations before you can use it:

- `PRIVATE_KEY`: This is your zkSync wallet's private key. NEVER commit this to source control. Instead, use a `.env` file or set an environment variable in your operating system.
- `pools.json`: This file contains the list of pools you want to fetch data from. The file should contain an array of objects, where each object has `ammName` and `poolAddress` properties.
- `abis`: This module contains the ABIs required to interact with the zkSync smart contracts.
To configure these, follow these steps:

1. Create a `.env` file in the root directory and add your zkSync wallet's private key:

```bash
PRIVATE_KEY=your_private_key_here
```

2. Modify `pools.json` to include the pools you're interested in. Here's an example:

```json
[
    {
        "ammName": "Syncswap",
        "poolAddress": "0xd3d2E2692501A5c9Ca623199D38826e513033a17"
    },
    // More pools...
]
```

3. If necessary, update abis to match the ABI of the smart contracts you're interacting with.

## 📚 Usage

To run the zkSync Pool Data Fetcher, use this command:

```bash
node main.js
```

The application will fetch data for each pool in `pools.json` and output the results to a file named `results.json`.

## 📜 License

This project is released under the [MIT License](https://github.com/codeesura/zkSync-Pool-Data-Fetcher/blob/main/LICENSE).
