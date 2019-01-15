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

#### 1. Create User
* click the right most icon to login
</br>

  ![screen shot 2019-01-15 at 4 07 21 pm](https://user-images.githubusercontent.com/37173038/51166964-2f7d6a00-18e0-11e9-9dbf-168cae67a875.png)
</br>
* and click login
</br>
  
  ![screen shot 2019-01-15 at 4 13 24 pm](https://user-images.githubusercontent.com/37173038/51167094-83884e80-18e0-11e9-95f7-497d8d66bbb2.png)
</br>

![image](https://user-images.githubusercontent.com/37173038/51167499-b41cb800-18e1-11e9-82c9-41d40e8f8320.png)
#### 2. Check Account Information
* click fourth icon from the right
#### 3. Post an Item
* cleck second icon from the right
#### 4. Check Poster Reputation
#### 5. Buy an Item
#### 6. Deliver an Item
#### 7. Check Deliver Item
#### 8. Seller Confirm Deliver to Deliver an Item
#### 9. Buyer Confirm to receive an Item
#### 10. Set Reputations



## Extra Section

### Interacting with Dexon Testnet

### Multiple Users Interaction on ganache-cli



Go to https://testnet.dexscan.app and serach for your contract's address!!
