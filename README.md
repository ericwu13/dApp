# The Best Shopping Platform
<!-- ## Get Started -->
## [Demo Video](https://youtu.be/4wzgWZyOW4Q)
## Environment Setup

### Install Dexon Google Extension
1. go to google extension and search for DeKuSan
2. install it and create DeKuSan account just like MetaMask
3. remember your passphrases for later contracts deployment

### Install npm Packages
1. go to `root/smart-contracts` directory
2. type `yarn install` to install required dependencies (dexon-truffle)
3. go to `root/react-ui` directory
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
6. (optional) if you want to migrate to dexon testnet type, go to https://dexon.org/faucet and get DXN and
```
$ npm run migrate
```
6. remember your contract address

### React Contract Address
1. go to `root/react-ui/src` directory
2. open `App.js`
3. go to code `line 2` and change contract address to the address you remember in previous step
4. open `root/smart-contracts/build/contracts/CPlatform.json` and find abi section
5. go to `root/react-ui/src` and find `platform_abi.js`. Replace the line after `export default` with your abi code

now your react-ui can interact with your smart contracts

## Start Interacting with WebUI

### Single User Usage

1. run your web server
```
npm start
```
2. Disable MetaMask to avoid unpredicted problem!!
3. set DeKuSan to connect to `localhost:8545` (or Dexon testnet if you're using testnet)

#### 1. Create User
* click `SIGN IN` on Appbar
* click `LOGIN` and create your account

#### 2. Check Account Information
* click `ACCOUNT` on Appbar to check your information
#### 3. Sponsor Yourself (you have to have money to execute following functions)
* click `DEVELOPER` on Appbar
* type in your `account address` and `money` you want to give youself
* send it
#### 4. Post an Item
* cleck `POST` on Appbar to go to **post page**
* fill the information first and **you must upload an image!!!**
* wait for a minute until data uploaded to IPFS
* click `POST` button
* click `ABOUT` and click `b` icon to check your item posted
* or refresh your website to check your item (remember to sign in after you refresh the website)

#### 5. Check Seller Reputation
* click `header` of the item card to check seller reputation
#### 6. Buy an Item
* click `market cart icon` on the card to go to buy page
* fill the information and click `BUY` button
#### 7. Deliver an Item
* click `DELIVER` on Appbar
* click `image` on the card to check detail information, but your find **partial of buyer information encrypted**
* click `truck icon` on the card to deliver an item
#### 8. Check Your Deliver Item
* click `CART` on Appbar
* go to `Deliver List` tab and you'll see the item you want to deliver
* click the `image` on the card to check detail informatio, and the **buyer information is all decrypted**

#### 9. Seller Confirm Deliver to Deliver an Item
* go to `Seller List` tab and you'll see the item you post
* click `check icon` to confirm that the deliver has collected the item you post
* message on the card will turn to **Delivering**
#### 10. Buyer Confirm to receive an Item
* go to `Cart List` tab and you'll see the item you buy and the message is `XXX is Delivering`
* click `check icon` to confirm you has received the item
* message on the card will turn to `Arrived`
#### 11. Set Reputations
* click `star icon` to set your shopping experience


## Extra Section
### Multiple Users Interaction on ganache-cli
If you try to share out your ganache network, follow the steps here
1. install **ngrok**
* for mac
```
$ brew cask install ngrok
```
* for ubuntu ???
2. forward out your localhost:8545
```
$ ngrok http 8545
```
3. get the ip address provided by ngrok
4. paste the ip address provided by ngrok into DeKuSan wallet to custmoize RPC

### Using Dexon Testnet
1. go to https://testnet.dexscan.app and serach for your contract's address!!
2. paste the abi code in the read or write section in your contract transaction
3. now you can interact with your contracts
