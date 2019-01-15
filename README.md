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
1. initiate local host ganache
```
$ ganache-cli -m "your passphrases"
```

2. go to `root/smart-contracts` directory
3. cp `secret.js.example` to `secret.js` and change the `mnemonic` to your **DeKuSan wallet passphrases**
4. compile the contracts codes, and you'll get contract abi in `root/smart-contracts/build/contracts/CPlatform.json` file
```
$ npm run compile
```

5. migrate our contract on your **ganache localhost:8545**
```
$ npm run test
```
6. remember your contract address

### React Setup
1. go to `root/react-ui/src` directory
2. open `App.js`
3. go to code `line 2` and change contract address to the address you remember in previous step
4. open `root/smart-contracts/build/contracts/CPlatform.json` and find abi section
5. replace the line after `export default` with your abi code 

now your react-ui can interact with your smart contracts

## Start Interacting with WebUI

### Single User Usage

1. run your web server
```
npm start
```
2. Disable MetaMask to avoid unpredicted problem!!
#### Create User
click


## Extra Section

### Interacting with Dexon Testnet

### Multiple Users Interaction on ganache-cli



Go to https://testnet.dexscan.app and serach for your contract's address!!


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

