# The Best Shopping Platform
<!-- ## Get Started -->

## Environment Setup

### Install Dexon Google Extension
1. go to google extension and search for DeKuSan
2. install it and create DeKuSan account just like MetaMask
3. remember your passphrases for later contracts deployment

### Install npm Packages
1. go to `root/smart-contracts` directory
2. type `yarn install` to install required dependencies (dexon-truffle)
3. go to `root/reactui` directory
4. type `yarn install` to install required dependencies (web3, material UI, etc)

## Smart Contracts Setup

### Contracts Deployment
1. initiate `ganache-cli -m "your passphrases"`
1. go to `root/smart-contracts` directory
2. cp `secret.js.example` to `secret.js` and change the `mnemonic` in it to DeKuSan wallet passphrases
3. type `npm run test` to compile the contracts codes, and you'll get contract abi in `root/smart-contracts/build/contracts/CPlatform.json` file
5. finally type `npm run migrate` to migrate our contract on your ganache
6. remember your contract address

### React Contract Address
1. go to `root/react-ui/src` directory
2. open `App.js`
3. go to code `line 2` and change contract address to the address you remember in previous step
4. open `root/smart-contracts/build/contracts/CPlatform.json` and copy its abi
5. paste the abi into `root/react-ui/src/platform_abi.js`

now your react-ui can interact with your smart contracts

## Start Interacting with WebUI

### Single User Usage


## Extra Section

### Interacting with Dexon Testnet

### Multiple Users Interaction on ganache-cli



Go to https://testnet.dexscan.app and serach for your contract's address!!
### React User Interface


### How To Test It
* Create a user on our platform
1. connect to your wallet first
2. if this wallet hasn't connect to our platform, it'll help connect it
3. click confirm

* Sell an item
1. Go to `Post` on the web
2. fill the form and sell!

go to home page, and you'll find your item 

* Buy an item
1. click on the image on the item
2. and buy it

the bought item on home page will disappear now

* Deliver an item
1. go to deliver page
2. click `take mission` on the item you want to deliver

now you are a driver, collect the package from the seller now!

